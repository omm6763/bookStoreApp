# 📚 MERN BookStore App

A full-stack online bookstore application built with the **MERN stack** (MongoDB, Express, React, Node.js). This application features secure user authentication, a shopping cart, an order history/library system, book reviews, and a comprehensive admin dashboard for managing inventory.

![BookStore Banner](/Frontend/public/new-banner.png)

## 🚀 Live Demo

- **Frontend (Vercel):** [https://book-store-app-iota-seven.vercel.app/](https://book-store-app-iota-seven.vercel.app/)
- **Backend (Render):** [https://bookstoreapp-backend-tx2v.onrender.com](https://bookstoreapp-backend-tx2v.onrender.com)

> **Note:** The backend is hosted on Render's free tier. It may spin down after inactivity, so the first request might take 30-60 seconds to load.

---

## ✨ Key Features

### 🔒 Authentication & Security
- **JWT Authentication:** Secure Signup and Login using JSON Web Tokens.
- **Protected Routes:** Certain pages (Cart, Orders, Admin) are only accessible to logged-in users.
- **Admin Role:** Special permissions for admin users to manage the book catalog.

### 🛒 Shopping & Library
- **Shopping Cart:** Add books to cart with persistent state (Local Storage).
- **Direct Access Model:** "Checkout" simulates a purchase, instantly moving books to your **"My Library"**.
- **Reading Mode:** Read the content of purchased books directly within the app.
- **Order History:** View past orders and manage your digital collection.

### 🔍 Discovery & Interaction
- **Search & Filter:** Real-time search bar and category filters (Fiction, Non-Fiction, Sci-Fi, Free).
- **Book Details:** Dedicated pages for each book with synopsis and details.
- **Reviews & Ratings:** Users can leave star ratings and comments on books they have read.

### 👨‍💼 Admin Dashboard (CMS)
- **CRUD Operations:** Admins can **Add**, **Update**, and **Delete** books.
- **Inventory Management:** Easy-to-use interface for managing store content.

### 🎨 Modern UI/UX
- **Responsive Design:** Fully mobile-friendly layout.
- **Dark/Light Mode:** Toggle between themes.
- **Modern Styling:** Built with **Tailwind CSS** and **DaisyUI**, featuring glassmorphism and smooth animations.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)** - Fast frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Router Dom** - Client-side routing
- **React Hook Form** - Form validation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Slick** - Carousels

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB (Atlas)** - NoSQL Database
- **Mongoose** - ODM for MongoDB
- **Bcrypt.js** - Password hashing
- **JsonWebToken (JWT)** - Authentication
