import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("Token");

  const fetchBooks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/book`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Book Added!");
      reset();
      fetchBooks();
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Book Deleted");
        fetchBooks();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        {/* Add Book Form */}
        <div className="bg-gray-100 p-6 rounded-lg mb-10 dark:bg-slate-800">
          <h2 className="text-xl font-bold mb-4">Add New Book</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("name")} placeholder="Book Name" className="input input-bordered w-full" required />
            <input {...register("title")} placeholder="Book Title/Description" className="input input-bordered w-full" required />
            <input {...register("price")} type="number" placeholder="Price" className="input input-bordered w-full" required />
            <input {...register("category")} placeholder="Category" className="input input-bordered w-full" required />
            <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" required />
            <button type="submit" className="btn btn-primary mt-4 md:col-span-2">Add Book</button>
          </form>
        </div>

        {/* Book List */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>${book.price}</td>
                  <td>{book.category}</td>
                  <td>
                    <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;