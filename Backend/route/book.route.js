import express from "express";
import { getBook, getBookById, createBook, updateBook, deleteBook } from "../controller/book.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBook);
router.get("/:id", getBookById);

// Admin Routes
router.post("/", protect, admin, createBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

export default router;