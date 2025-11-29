import Review from "../model/review.model.js";

// Get reviews for a specific book
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "fullname") // Get the user's name
      .sort({ createdAt: -1 }); // Newest first
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a review
export const addReview = async (req, res) => {
  try {
    const { rating, comment, bookId } = req.body;

    const review = new Review({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
    });

    await review.save();
    
    // Return the saved review with populated user data
    const savedReview = await Review.findById(review._id).populate("user", "fullname");
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: "Invalid review data" });
  }
};