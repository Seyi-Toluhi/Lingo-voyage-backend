from lib.user import *

class UserRepository():
    def __init__(self, db_connection):
        self.db_connection = db_connection
        
    def create(self, user):
        existing_user = self.db_connection.execute('SELECT * FROM users WHERE first_name = %s', [user.first_name])
        if existing_user:
            raise Exception("Username taken.")
        existing_email_address = self.db_connection.execute('SELECT * FROM users WHERE email_address = %s', [user.email_address])
        if existing_email_address:
            raise Exception("Account already exists, please log in.")
        elif "@" not in user.email_address:
            raise Exception("Invalid email address.")
        self.db_connection.execute('INSERT INTO users(first_name, age, email_address, password, score) VALUES(%s, %s, %s, %s, %s)', [user.first_name, user.age, user.email_address, user.password, user.score])
        return None
    
    def all(self):
        result = []
        rows = self.db_connection.execute('SELECT * from users')
        def convert_to_user_model(rows):
            for row in rows:
                item = User(row['id'], row['first_name'], row['age'], row['email_address'], row['password'], row['score'])
                result.append(item)
        convert_to_user_model(rows)
        print(result)
        return result
    
    def find(self, id):
        rows = self.db_connection.execute('SELECT id, first_name, age, email_address, password, score FROM users WHERE id = %s', [id])
        row = rows[0]
        return User(row['id'], row['first_name'], row['age'], row['email_address'], row['password'], row['score'])
    
    def update_score(self, score, id):
        self.db_connection.execute('UPDATE users SET score = score + %s WHERE id = %s', [score, id])
        
    def delete(self, id):
        self.db_connection.execute('DELETE FROM users WHERE id = %s', [id])

   
    def find_by_email(self, email_address):
        print(type(email_address))
        rows = self.db_connection.execute('SELECT id, first_name, age, email_address, password, score FROM users WHERE email_address = %s', [email_address])
        print(rows)
        row = rows[0]
        return User(row['id'], row['first_name'], row['age'], row['email_address'], row['password'], row['score'])   
    
