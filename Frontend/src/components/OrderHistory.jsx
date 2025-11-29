import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [groupedBooks, setGroupedBooks] = useState({});

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      groupBooksByCategory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Helper function to reorganize data by category
  const groupBooksByCategory = (ordersData) => {
    const groups = {};
    
    ordersData.forEach(order => {
        order.orderItems.forEach(item => {
            
            const category = item.category || "My Collection"; 

            if (!groups[category]) {
                groups[category] = [];
            }
            // We need to attach the Order ID to the item so we know which order to delete from
            groups[category].push({ ...item, orderId: order._id, itemUniqueId: item._id });
        });
    });
    setGroupedBooks(groups);
  };

  const deleteBook = async (orderId, itemId) => {
    if(!window.confirm("Remove this book from your library?")) return;

    try {
        const token = localStorage.getItem("Token");
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/order/item/${orderId}/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Book removed");
        fetchOrders(); // Refresh UI
    } catch (error) {
        toast.error("Failed to remove book");
    }
  };

  const clearHistory = async () => {
    if(!window.confirm("Are you sure you want to clear your ENTIRE reading history?")) return;
    try {
        const token = localStorage.getItem("Token");
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/order/myorders`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("History Cleared");
        setOrders([]);
        setGroupedBooks({});
    } catch (error) {
        toast.error("Failed to clear history");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-10">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Library</h1>
            {orders.length > 0 && (
                <button onClick={clearHistory} className="btn btn-sm btn-error btn-outline">
                    Delete All
                </button>
            )}
        </div>
        
        {Object.keys(groupedBooks).length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-500 mb-4">Your library is empty.</p>
            <Link to="/course" className="btn btn-primary text-white px-8">Browse Store</Link>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.keys(groupedBooks).map((category) => (
                <div key={category}>
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4 pl-2 border-l-4 border-pink-500">
                        {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedBooks[category].map((book) => (
                            <div key={book.itemUniqueId} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                                <img src={book.image} alt={book.name} className="w-24 h-32 object-cover rounded-md shadow-sm" />
                                <div className="flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">{book.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Purchased</p>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Link to={`/read/${book.product}`} className="flex-1">
                                            <button className="btn btn-sm btn-primary w-full text-white">Read</button>
                                        </Link>
                                        <button 
                                            onClick={() => deleteBook(book.orderId, book.itemUniqueId)}
                                            className="btn btn-sm btn-square btn-outline btn-error"
                                            title="Remove from library"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistory;