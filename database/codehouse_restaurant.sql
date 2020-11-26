DROP DATABASE codehouse_restaurant;
CREATE DATABASE codehouse_restaurant;
USE codehouse_restaurant;

CREATE TABLE chefs(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    employment_history TEXT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(150),
    phone_number VARCHAR(15) NOT NULL, -- max phone number length (ITU, E.164)
    avatar VARCHAR(100) NOT NULL
);

CREATE TABLE plates(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    img VARCHAR(100) NOT NULL,
    chef_id INTEGER NOT NULL,
    CONSTRAINT chef_fk_1 FOREIGN KEY (chef_id) REFERENCES chefs(id) ON UPDATE CASCADE ON DELETE CASCADE
);