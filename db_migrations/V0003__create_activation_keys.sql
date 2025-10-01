-- Create activation keys table
CREATE TABLE IF NOT EXISTS activation_keys (
    id SERIAL PRIMARY KEY,
    key_code VARCHAR(50) UNIQUE NOT NULL,
    duration_days INTEGER NOT NULL,
    plan_name VARCHAR(50) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_by INTEGER REFERENCES users(id) DEFAULT NULL,
    used_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id)
);

-- Insert sample activation keys
INSERT INTO activation_keys (key_code, duration_days, plan_name, is_used, created_by) VALUES
('RST-7D-A1B2C3D4E5', 7, '7 дней', FALSE, 1),
('RST-30D-F6G7H8I9J0', 30, '30 дней', FALSE, 1),
('RST-LIFE-K1L2M3N4O5', 999999, 'Навсегда', FALSE, 1),
('RST-7D-P6Q7R8S9T0', 7, '7 дней', TRUE, 1),
('RST-30D-U1V2W3X4Y5', 30, '30 дней', FALSE, 1);
