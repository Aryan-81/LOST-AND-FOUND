-- Create users table
CREATE TABLE users (
    usr_id SERIAL PRIMARY KEY,         -- Auto-incrementing user ID
    email VARCHAR(255) NOT NULL,       -- User email
    name VARCHAR(100),                 -- User name
    hash_password VARCHAR(255) NOT NULL -- Hashed password for the user
);

-- Create sequence for lostitem
CREATE SEQUENCE lostitem_seq START WITH 1001;

-- Create lostitem table with itemid starting with 'L' followed by a number
CREATE TABLE lostitem (
    itemid VARCHAR(20) PRIMARY KEY DEFAULT 'L' || nextval('lostitem_seq'), -- Auto-incrementing item ID with 'L' prefix
    name VARCHAR(255),                          -- Item name
    date_of_upload DATE NOT NULL,               -- Date the item was uploaded
    last_seen_date DATE,                        -- Last seen date of the lost item
    last_seen_place VARCHAR(255),               -- Last seen place of the lost item
    contact_info VARCHAR(255) NOT NULL,         -- Contact information for the lost item
    item_description TEXT                       -- Description of the lost item
);

-- Create sequence for founditem
CREATE SEQUENCE founditem_seq START WITH 1001;

-- Create founditem table with itemid starting with 'F' followed by a number
CREATE TABLE founditem (
    itemid VARCHAR(20) PRIMARY KEY DEFAULT 'F' || nextval('founditem_seq'), -- Auto-incrementing item ID with 'F' prefix
    name VARCHAR(255),                          -- Item name
    date_of_upload DATE NOT NULL,               -- Date the item was uploaded
    found_date DATE,                            -- Date the item was found
    found_place VARCHAR(255),                   -- Place the item was found
    contact_info VARCHAR(255) NOT NULL,         -- Contact information for the found item
    item_description TEXT                       -- Description of the found item
);

-- Sample data for users table
INSERT INTO users (email, name, hash_password)
VALUES 
('john.doe@example.com', 'John Doe', 'hashed_password_123'),
('jane.smith@example.com', 'Jane Smith', 'hashed_password_456'),
('alice.wonder@example.com', 'Alice Wonder', 'hashed_password_789');

-- Sample data for lostitem table
INSERT INTO lostitem (name, date_of_upload, last_seen_date, last_seen_place, contact_info, item_description)
VALUES 
('Laptop', '2024-09-01', '2024-08-31', 'Library', 'john.doe@example.com', 'Silver MacBook Pro with a sticker on the back.'),
('Backpack', '2024-09-05', '2024-09-04', 'Cafeteria', 'jane.smith@example.com', 'Black North Face backpack with textbooks inside.'),
('Wallet', '2024-09-10', '2024-09-09', 'Gym', 'alice.wonder@example.com', 'Brown leather wallet containing ID and cards.');

-- Sample data for founditem table
INSERT INTO founditem (name, date_of_upload, found_date, found_place, contact_info, item_description)
VALUES 
('Water Bottle', '2024-09-02', '2024-09-01', 'Library', 'jane.smith@example.com', 'Blue stainless steel water bottle.'),
('Sunglasses', '2024-09-06', '2024-09-05', 'Park', 'alice.wonder@example.com', 'Ray-Ban sunglasses, black frame.'),
('Jacket', '2024-09-11', '2024-09-10', 'Gym', 'john.doe@example.com', 'Red jacket with a logo on the back.');
