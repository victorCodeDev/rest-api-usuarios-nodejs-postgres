CREATE DATABASE typescriptdatabase;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
);

INSERT INTO users (name, email) values 
('admin', 'admin@gmail.com'),
('user', 'user@gmail.com.py');