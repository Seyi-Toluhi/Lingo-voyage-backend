import os
import jwt
import datetime
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from lib.database_connection import get_flask_database_connection
from lib.user_repository import UserRepository
from lib.user import User
from functools import wraps

# Providing the path to my SQL file
sql_filename = "seeds/lingovoyage.sql"  

# Creating a Flask app
app = Flask(__name__)
# Allowing CORS for my frontend
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key')
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        try:
            token = token.split(" ")[1]  
            payload = jwt.decode(token, app.secret_key, algorithms=['HS256'])
            user_id = payload['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 403
        
        return f(user_id, *args, **kwargs)
    
    return decorated

def generate_jwt(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, app.secret_key, algorithm='HS256')
    return token

@app.route('/protected', methods=['GET'])
@token_required
def protected(user_id):
    return jsonify({'message': f'Access granted for user_id: {user_id}'})


@app.route('/create_user', methods=['POST'])
def create_user():
    try:
        connection = get_flask_database_connection(app)
        user_repo = UserRepository(connection)
        # Getting the JSON data from the request
        data = request.get_json()
        user = User(
            None,
            data['first_name'],
            data['age'],
            data['email_address'],
            data['password'],
            0
        )
        user_repo.create(user)
        return jsonify({'MESSAGE': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'ERROR': str(e)}), 500
    
@app.route('/get_users', methods=['GET'])
@token_required
def get_users():
    try:
        connection = get_flask_database_connection(app)
        # connection.seed(sql_filename)
        user_repo = UserRepository(connection)
        users = user_repo.all()
        users_dict = [user.to_dict() for user in users]
        return jsonify(users_dict)
    except Exception as e:
        return jsonify({'ERROR': str(e)}), 500
    
@app.route('/login', methods=['POST'])
def get_user_by_email():
    try:
        connection = get_flask_database_connection(app)
        user_repo = UserRepository(connection)
        data = request.get_json()
        user_email = data['email_address']
        user_password = data['password']
        user_found = user_repo.find_by_email(user_email)
        if user_found:
            if user_found.password == user_password:
                user_dict = user_found.to_dict()
                session['user'] = user_dict
                user_id = user_found.id
                token = generate_jwt(user_id)
                return jsonify({'user': user_dict, 'token': token, 'message': 'User found'}), 200
            else:
                return jsonify({'error': "Incorrect password"})
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/check_session', methods=['GET'])
@token_required
def check_session(user_id):
    user = session.get('user')
    user_id = user['id']
    connection = get_flask_database_connection(app)
    user_repo = UserRepository(connection)
    current_user = user_repo.find(user_id)
    if user:
        return jsonify({'user': user, 'score': current_user.score}), 200
    else:
        return jsonify({'message': 'Not logged in'}), 401

@app.route('/update_user_score', methods=['POST'])
@token_required
def updateUserScore(user_id):
    try:
        connection = get_flask_database_connection(app)
        user_repo = UserRepository(connection)
        data = request.get_json()
        print(data)
        user_id = data['id']
        XP = data['XP']
        print(type(user_id), user_id)
        print(type(XP), XP)
        user = user_repo.find(user_id)
        print("USER", user)
        user_repo.update_score(XP, user.id)
        return jsonify({'MESSAGE': 'Score updated successfully'}), 201
    

    except Exception as e:
        return jsonify({'ERROR': str(e)}), 500
    
@app.route('/delete_user', methods=['POST'])
@token_required
def delete_user(user_id):
    print('deletion endpoint activated')
    try:
        connection = get_flask_database_connection(app)
        user_repo = UserRepository(connection)
        data = request.get_json()
        print(data)
        user_id = data['id']
        print(user_id)
        user = user_repo.delete(user_id)
        print("USER", user)
        return jsonify({'MESSAGE': 'User deleted successfully'}), 201
    
    except Exception as e:
        return jsonify({'ERROR': str(e)}), 500
    
@app.route('/logout', methods=['POST'])
@token_required
def logout():
    session.pop('user', None)
    response =  jsonify({'message': 'Logged out successfully'}), 200
    return response
    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
