import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function BookReviews({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [authUser] = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/${bookId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) return toast.error("Please login to review");

    try {
      const token = localStorage.getItem("Token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/review`,
        { bookId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review Added!");
      setComment("");
      setRating(5);
      fetchReviews(); // Refresh list
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  return (
    <div className="mt-12 border-t pt-8 border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>

      {/* Review Form */}
      {authUser ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="select select-bordered w-full max-w-xs dark:bg-slate-700"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full dark:bg-slate-700"
              placeholder="What did you think about this book?"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary text-white">Submit Review</button>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-8 text-center">
          <p className="mb-4">Please login to write a review.</p>
          <button onClick={()=>document.getElementById("my_modal_3").showModal()} className="btn btn-outline btn-sm">Login</button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">{review.user.fullname[0]}</span>
                    </div>
                  </div>
                  <span className="font-semibold">{review.user.fullname}</span>
                </div>
                <div className="badge badge-primary badge-outline">{review.rating} ★</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookReviews;