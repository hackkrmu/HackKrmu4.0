CREATE DATABASE IF NOT EXISTS farmfolio_db;

USE farmfolio_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (username, password) VALUES ('sonu', '$2b$12$EaEZ1U16tR9M.DxgWGThl.yX3rXN5b1Em.nILpdWBp3kg1Ae8N2.y'), ('bhumi', '$2b$12$EaEZ1U16tR9M.DxgWGThl.yX3rXN5b1Em.nILpdWBp3kg1Ae8N2.y');
