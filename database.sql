CREATE DATABASE room_rental;

USE room_rental;

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO rooms (title, location, price, image) VALUES
('Cozy Apartment - New York', 'newyork', 120, 'room1.jpg'),
('Modern Studio - Los Angeles', 'losangeles', 90, 'room2.jpg'),
('Spacious Loft - Chicago', 'chicago', 110, 'room3.jpg'),
('Luxury Suite - New York', 'newyork', 150, 'room4.jpg');
