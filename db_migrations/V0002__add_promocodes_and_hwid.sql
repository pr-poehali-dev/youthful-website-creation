-- Add promocodes table
CREATE TABLE IF NOT EXISTS promocodes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL,
    max_uses INTEGER DEFAULT NULL,
    current_uses INTEGER DEFAULT 0,
    expires_at TIMESTAMP DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add HWID column to users if not exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS hwid VARCHAR(255);

-- Insert sample promocodes
INSERT INTO promocodes (code, discount_percent, max_uses, is_active) VALUES
('ROCKSTAR50', 50, 100, TRUE),
('PREMIUM25', 25, 500, TRUE),
('WEZXE100', 100, 10, TRUE);

-- Update admin user to have specific data
UPDATE users SET 
    username = 'wezxe',
    email = 'wezxe@rockstar.com',
    hwid = 'HWID-ADMIN001'
WHERE id = 1;
