# Book Tracker

A full-stack web application for tracking your reading journey. Built with Express.js, PostgreSQL, and EJS templates.

## Features

- 📚 **Book Management**: Add, view, edit, and delete books from your reading list
- ⭐ **Rating System**: Rate books from 1 to 5 stars
- 📝 **Notes**: Add personal notes for each book
- 🖼️ **Book Covers**: Automatically fetches book covers from the Open Library API
- 🔍 **Sorting**: Sort books by title, rating, or date read
- 📅 **Date Tracking**: Track when you read each book

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with `pg` library
- **Frontend**: EJS templates, vanilla CSS/JavaScript
- **API Integration**: Open Library API for book covers

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. Clone the repository:
   
```
bash
   git clone <repository-url>
   cd book-tracker
   
```

2. Install dependencies:
   
```
bash
   npm install
   
```

3. Set up the database:
   - Create a PostgreSQL database named `book_tracker` (or your preferred name)
   - Run the SQL schema:
     
```
bash
     psql -U postgres -d book_tracker -f database.sql
     
```

4. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   
```
env
   PORT=3000
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=book_tracker
   DB_PASSWORD=your_password
   DB_PORT=5432
   
```

## Running the Application

### Development Mode (with auto-reload)
```
bash
npm run dev
```

### Production Mode
```
bash
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
book-tracker/
├── public/
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── script.js        # Client-side JavaScript
├── views/
│   ├── partials/
│   │   ├── header.ejs       # Header template
│   │   └── footer.ejs       # Footer template
│   └── books/
│       ├── index.ejs        # Book list (home page)
│       ├── new.ejs          # Add new book form
│       ├── edit.ejs         # Edit book form
│       └── show.ejs         # Book details page
├── database.sql             # Database schema and sample data
├── package.json             # Project dependencies
├── server.js                # Main server file
└── .env                     # Environment variables (create this)
```

## Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page - list all books |
| GET | `/books/new` | Show form to add a new book |
| POST | `/books` | Create a new book |
| GET | `/books/:id` | View book details |
| GET | `/:id/edit` | Show form to edit a book |
| POST | `/books/:id` | Update a book |
| POST | `/books/:id/delete` | Delete a book |
| GET | `/api/covers/:cover_id` | Proxy for Open Library covers |

## Database Schema

```sql
CREATE TABLE books (
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
```

## Usage

1. **Add a Book**: Click "Add Book" and fill in the details (title, author, rating, notes, date read, and Open Library cover ID)
2. **View Books**: Browse all books on the homepage, sorted by title by default
3. **Sort Books**: Use the sort options to view by title, rating, or date read
4. **Edit/Delete**: Click on any book to view details, edit, or delete

## Finding Book Cover IDs

To add book covers, use the Open Library ID from URLs like:
`https://openlibrary.org/works/OL12345W/`

The cover ID would be `OL12345W`.

## License

ISC

## Author

Your Name Here
