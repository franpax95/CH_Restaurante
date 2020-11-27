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

INSERT INTO
	chefs (email, password, first_name, last_name, phone_number, avatar)
VALUES
	('franpax95@gmail.com', '123456', 'Francisco', 'Navarro', '697883405', '/uploads/chefs/mock1.png'),
    ('elenabravo@gmail.com', 'qwerty', 'Elena', 'Bravo', '696784310', '/uploads/chefs/mock2.png'),
    ('auronffx@gmail.com', 'masamune', 'Auron', 'Guardian', '711374058', '/uploads/chefs/mock3.png');
    
INSERT INTO
	plates (name, description, img, chef_id)
VALUES
	('Huevos con patatas', 'Plato típico del Mediterráneo', '/uploads/plates/mock1.jpg', 1),
    ('Albóndigas', 'Las de siempre. Las de casa.', '/uploads/plates/mock2.jpg', 2),
    ('Tiras de seitán con salsa de soja', 'Exquisitez culinaria vegana', '/uploads/plates/mock3.jpg', 3),
    ('Pizza de jamón y queso', 'Como las de casa tarradellas', '/uploads/plates/mock4.jpg', 1),
    ('Lasaña vegana', 'Lasaña con bolognesa vegana', '/uploads/plates/mock5.jpg', 2),
    ('Arroz blanco con bacon', 'Con mucho amor y mucho ketchup', '/uploads/plates/mock6.jpg', 3);

SELECT * FROM chefs;
SELECT * FROM plates;

## GET ALL PLATES OF A CHEF BY ID 1
SELECT plates.* FROM chefs, plates WHERE chefs.id = plates.chef_id AND chefs.id = 1;

## GET A SINGLE PLATE BY ID 5
SELECT * FROM plates WHERE id = 5;

## GET A SINGLE CHEF BY ID 1
SELECT * FROM chefs WHERE id = 1;

## GET COUNT PLATES OF ALL CHEFS
SELECT chefs.id, chefs.email, count(plates.id) AS plates_number
FROM chefs, plates
WHERE chefs.id = plates.chef_id
GROUP BY chefs.email
ORDER BY plates_number DESC;

## GET ALL PLATES WITH USER EMAIL INSTEAD OF USER ID
SELECT plates.name, plates.description, plates.img, chefs.email
FROM chefs, plates
WHERE chefs.id = plates.chef_id;

## EDIT USER employment_history
UPDATE chefs
SET employment_history = 'Sin experiencia laboral previa.'
WHERE id = 1;

## DELETE plate
DELETE FROM plates
WHERE id = 6;




