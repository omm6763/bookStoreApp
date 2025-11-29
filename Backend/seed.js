import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const books = [
  // --- FREE BOOKS (For Slider) ---
  {
    name: "The Great Gatsby",
    title: "A story of wealth, love, and the American Dream in the 1920s.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    content: "Chapter 1: In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'"
  },
  {
    name: "Pride and Prejudice",
    title: "A romantic novel of manners written by Jane Austen.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    content: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters."
  },
  {
    name: "Moby Dick",
    title: "The narrative of Captain Ahab's obsessive quest for a white whale.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=800&auto=format&fit=crop",
    content: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world."
  },
  {
    name: "Frankenstein",
    title: "The story of a young scientist who creates a sapient creature.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=800&auto=format&fit=crop",
    content: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking."
  },
  {
    name: "Sherlock Holmes",
    title: "A Scandal in Bohemia and other stories.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop",
    content: "To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex."
  },
  {
    name: "Alice in Wonderland",
    title: "Alice falls through a rabbit hole into a fantasy world.",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    content: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it."
  },

  // --- PAID BOOKS ---
  {
    name: "Dune",
    title: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.",
    price: 20,
    category: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    content: "A beginning is the time for taking the most delicate care that the balances are correct..."
  },
  {
    name: "Atomic Habits",
    title: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    price: 25,
    category: "Non-Fiction",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    content: "The fate of your habits is the fate of your life. 1% better every day..."
  },
  {
    name: "1984",
    title: "Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
    price: 15,
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop",
    content: "It was a bright cold day in April, and the clocks were striking thirteen..."
  },
  {
    name: "Sapiens",
    title: "A Brief History of Humankind.",
    price: 30,
    category: "Non-Fiction",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    content: "100,000 years ago, at least six human species inhabited the earth. Today there is just one..."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to DB");
    await Book.deleteMany({});
    console.log("Cleared old books");
    await Book.insertMany(books);
    console.log("Added new books with Content!");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

seedDB();