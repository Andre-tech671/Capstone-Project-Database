import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Book from "./Book.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", async (req, res) => {
  try {
    const { sort } = req.query;
    let sortCriteria = { title: 1 }; // Default: Title A-Z

    if (sort === "rating") {
      sortCriteria = { rating: -1 };
    } else if (sort === "date") {
      sortCriteria = { date_read: -1 };
    }

    const books = await Book.find().sort(sortCriteria);
    res.render("books/index", { books: books, sort: sort || "title" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/books/new", (req, res) => {
  res.render("books/new");
});

app.post("/books", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      notes: req.body.notes,
      date_read: req.body.date_read,
      cover_id: req.body.cover_id,
    });
    await newBook.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/show", { book: book });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/books/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/edit", { book: book });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      notes: req.body.notes,
      date_read: req.body.date_read,
      cover_id: req.body.cover_id,
    });
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/books/:id/delete", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API endpoint to fetch cover from Open Library
app.get("/api/covers/:cover_id", async (req, res) => {
  try {
    const { cover_id } = req.params;
    const response = await axios.get(`https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`, {
      responseType: "arraybuffer"
    });
    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cover image");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});