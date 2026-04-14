import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  notes: { type: String },
  date_read: { type: Date },
  cover_id: { type: String },
}, { 
  timestamps: true 
});

const Book = mongoose.model("Book", bookSchema);
export default Book;