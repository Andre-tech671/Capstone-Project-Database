-- Create the books table if it doesn't exist
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    date_read DATE,
    cover_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data for testing
INSERT INTO books (title, author, rating, notes, date_read, cover_id) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 5, 'A classic novel about the American Dream', '2024-01-15', '12345'),
('To Kill a Mockingbird', 'Harper Lee', 5, 'A powerful story about justice and prejudice', '2024-02-20', '67890'),
('1984', 'George Orwell', 4, 'A dystopian masterpiece', '2024-03-10', '11111')
ON CONFLICT DO NOTHING;
