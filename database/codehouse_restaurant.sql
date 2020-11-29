DROP DATABASE codehouse_restaurant;
CREATE DATABASE codehouse_restaurant;
USE codehouse_restaurant;

CREATE TABLE chef(
	chef_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    employment_history TEXT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(150),
    phone_number VARCHAR(15) NOT NULL, -- max phone number length (ITU, E.164)
    avatar VARCHAR(100) NOT NULL
);

CREATE TABLE plate(
	plate_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    img VARCHAR(100) NOT NULL,
    chef_id INTEGER NOT NULL,
    CONSTRAINT chef_fk_1 FOREIGN KEY (chef_id) REFERENCES chef(chef_id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO
	chef (email, password, first_name, last_name, phone_number, avatar)
VALUES
	('franpax95@gmail.com', '123456', 'Francisco', 'Navarro', '697883405', '/uploads/chefs/mock1.png'),
    ('elenabravo@gmail.com', 'qwerty', 'Elena', 'Bravo', '696784310', '/uploads/chefs/mock2.png'),
    ('auronffx@gmail.com', 'masamune', 'Auron', 'Guardian', '711374058', '/uploads/chefs/mock3.png');
    
INSERT INTO
	plate (name, description, img, chef_id)
VALUES
	('Huevos con patatas', 'Plato típico del Mediterráneo', '/uploads/plates/mock1.jpg', 1),
    ('Albóndigas', 'Las de siempre. Las de casa.', '/uploads/plates/mock2.jpg', 2),
    ('Tiras de seitán con salsa de soja', 'Exquisitez culinaria vegana', '/uploads/plates/mock3.jpg', 3),
    ('Pizza de jamón y queso', 'Como las de casa tarradellas', '/uploads/plates/mock4.jpg', 1),
    ('Lasaña vegana', 'Lasaña con bolognesa vegana', '/uploads/plates/mock5.jpg', 2),
    ('Arroz blanco con bacon', 'Con mucho amor y mucho ketchup', '/uploads/plates/mock6.jpg', 3);

SELECT * FROM chef;
SELECT * FROM plate;

## GET ALL PLATES OF A CHEF BY ID 1
SELECT plate.* FROM chef, plate WHERE chef.chef_id = plate.chef_id AND chef.chef_id = 1;

## GET A SINGLE PLATE BY ID 5
SELECT * FROM plate WHERE plate_id = 5;

## GET A SINGLE CHEF BY ID 1
SELECT * FROM chef WHERE chef_id = 1;

## GET COUNT PLATES OF ALL CHEFS
SELECT chef.chef_id, chef.email, count(plate.plate_id) AS plates_number
FROM chef, plate
WHERE chef.chef_id = plate.chef_id
GROUP BY chef.email
ORDER BY plates_number DESC;

## GET ALL PLATES WITH USER EMAIL INSTEAD OF USER ID
SELECT plate.name, plate.description, plate.img, chef.email
FROM chef, plate
WHERE chef.chef_id = plate.chef_id;

## EDIT USER employment_history
UPDATE chef
SET employment_history = 'Sin experiencia laboral previa.'
WHERE chef_id = 1;

## DELETE plate
-- DELETE FROM plate WHERE id = 6;




