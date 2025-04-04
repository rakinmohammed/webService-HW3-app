CREATE DATABASE IF NOT EXISTS crud_db;
USE crud_db;
CREATE TABLE IF NOT EXISTS food (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    calories INT NOT NULL
);

INSERT INTO food (name, description, calories) VALUES
('Pizza', 'Thin crust cheese', 250),
('Sandwich', 'Chicken, no mayo', 300),
('Fried Rice', 'Shrimp and Beef', 650);