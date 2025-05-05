CREATE DATABASE RFID_cards;

use RFID_cards;

CREATE TABLE cards(
	id NVARCHAR(255) PRIMARY KEY,
	name NVARCHAR(255) NOT NULL

);

CREATE TABLE history(
	id INT PRIMARY KEY IDENTITY(1,1),
	card_id NVARCHAR(255) FOREIGN KEY REFERENCES cards(id),
	description NVARCHAR(255) check(description IN ('entry', 'exit')),
	time DATETIME DEFAULT GETDATE(),
	is_card_saved bit not null
)
