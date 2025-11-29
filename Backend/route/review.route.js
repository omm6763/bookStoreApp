import express from "express";
import { getReviews, addReview } from "../controller/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:bookId", getReviews);
router.post("/", protect, addReview);

export default router;