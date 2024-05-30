from lib.user import *

def test_user_object_constructs():
    user = User(1,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    assert user.id == 1
    assert user.first_name == 'seyi'
    assert user.age == 34
    assert user.email_address == 'email_address1@gmail.com'
    assert user.password == 'password1'
    assert user.score == 0

def test_users_are_equal():
    user1 = User(1,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    user2 = User(1,'seyi', 34, 'email_address1@gmail.com', 'password1', 0)
    assert user1 == user2