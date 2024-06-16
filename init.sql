DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    age INT,
    email_address VARCHAR(255),
    password VARCHAR(255),
    score INT
);

INSERT INTO users (first_name, age, email_address, password, score) 
VALUES ('oluwaseyi', 32, 'seyi@gmail.com', 'seyi8', 0);
INSERT INTO users (first_name, age, email_address, password, score) 
VALUES ('Tolu', 38, 'tolu@gmail.com', 'seyitolu4', 0);


