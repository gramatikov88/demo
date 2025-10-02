CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, //уникално потребителско име
    email VARCHAR(100) NOT NULL UNIQUE, //уникален имейл
    password VARCHAR(255) NOT NULL, //хеширана парола
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

