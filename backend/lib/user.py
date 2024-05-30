class User:
    def __init__(self, id, first_name, age, email_address, password, score):
        self.id = id
        self.first_name = first_name
        self.age = age
        self.email_address = email_address
        self.password = password
        self.score = score

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'age': self.age,
            'email_address': self.email_address,
            'password': self.password,
            'score': self.score
        }