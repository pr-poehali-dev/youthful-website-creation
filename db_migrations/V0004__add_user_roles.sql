-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'Пользователь';

-- Update existing users with roles
UPDATE users SET role = 'Администратор' WHERE id = 1;

-- Update activation keys table
ALTER TABLE activation_keys ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP DEFAULT NULL;
