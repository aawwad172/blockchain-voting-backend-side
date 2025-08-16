USE mydatabase;

-- Seed a super admin for login tests
INSERT INTO Users (EMAIL, PASSWORD, ROLE, MAJOR)
VALUES ('superadmin@example.com', 'system', 'superadmin', NULL)
ON DUPLICATE KEY UPDATE EMAIL=EMAIL;
