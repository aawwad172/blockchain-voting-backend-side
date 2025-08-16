-- charset & collation (optional but recommended)
CREATE DATABASE IF NOT EXISTS mydatabase
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE mydatabase;

-- Users table that matches your code’s fields
CREATE TABLE IF NOT EXISTS Users (
  ID           INT AUTO_INCREMENT PRIMARY KEY,
  EMAIL        VARCHAR(255) NOT NULL UNIQUE,
  PASSWORD     VARCHAR(255) NOT NULL,
  ROLE         ENUM('student','admin','superadmin') NOT NULL,
  MAJOR        VARCHAR(255) NULL,
  CREATED_AT   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example other tables if you need later...
-- CREATE TABLE ...
