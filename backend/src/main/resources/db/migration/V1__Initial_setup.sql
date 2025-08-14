-- Initial database setup
-- This is your first Flyway migration file

-- Example table creation
CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_items_name ON items(name);

-- Insert some sample data
INSERT INTO items (name, description) VALUES 
    ('Sample Item 1', 'This is the first sample item'),
    ('Sample Item 2', 'This is the second sample item');