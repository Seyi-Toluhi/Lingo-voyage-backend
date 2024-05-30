from lib.user import *
from lib.user_repository import *
import pytest

# test that a new user can be created
def test_newuser_is_created(db_connection):
    db_connection.seed("seeds/lingovoyage.sql")
    user_repo = UserRepository(db_connection)
    user = User(3,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    user_repo.create(user)
    users = user_repo.all()
    print(users)
    assert users == [
        User(1, 'oluwaseyi', 32, 'seyi@gmail.com', 'seyi8', 0 ),
        User(2, 'Tolu', 38, 'tolu@gmail.com', 'seyitolu4', 0),
        User(3,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    ]

# test that a user can be found with id 
def test_user_id_finds_user(db_connection):
    db_connection.seed("seeds/lingovoyage.sql")
    user_repo = UserRepository(db_connection)
    user = user_repo.find(1)
    print(user)
    assert user == User(1, 'oluwaseyi', 32, 'seyi@gmail.com', 'seyi8', 0 )
    
# test that a user can be deleted
def test_user_is_deleted(db_connection):
    db_connection.seed("seeds/lingovoyage.sql")
    user_repo = UserRepository(db_connection)
    user = User(3,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    user_repo.create(user)
    user_repo.delete(3)
    users = user_repo.all()
    print(users)
    assert users == [
        User(1, 'oluwaseyi', 32, 'seyi@gmail.com', 'seyi8', 0 ),
        User(2, 'Tolu', 38, 'tolu@gmail.com', 'seyitolu4', 0)
    ]

# test invalid email
def test_invalid_email_address(db_connection):
    db_connection.seed("seeds/lingovoyage.sql")
    repo = UserRepository(db_connection) 
    user = User(3,'seyi', 34, 'email_address1gmail.com', 'password1', 0)
    with pytest.raises(Exception) as e: 
        repo.create(user)
    error_message = str(e.value)
    assert error_message == "Invalid email address."

"""
test invalid inputs (e.g email already used)
"""

def test_create_email_address_already_registered(db_connection):
    db_connection.seed("seeds/lingovoyage.sql")
    repo = UserRepository(db_connection)
    pre_existing_user =  User(1, 'oluwaseyi', 32, 'seyi@gmail.com', 'seyi8', 0 )
    with pytest.raises(Exception) as e: 
        repo.create(pre_existing_user)
    error_message = str(e.value)
    assert error_message == "Username taken."
