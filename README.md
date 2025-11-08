📚 bookStoreApp
This is a full-stack MERN (MongoDB, Express, React, Node.js) application for an online bookstore. Users can browse books, sign up for an account, and view a protected list of courses.

### Live Demo

* **Frontend (Vercel):** [https://book-store-app-lilac-tau.vercel.app/](https://book-store-app-lilac-tau.vercel.app/)
* **Backend (Render):** [https://bookstoreapp-3-pot4.onrender.com/](https://bookstoreapp-3-pot4.onrender.com/)

**Note:** The backend is hosted on Render's free tier, so it may "spin down" after a period of inactivity. The first request to the site might take 30-60 seconds to "wake up" the server.

✨ Features
User Authentication: Secure signup and login for users.

Protected Routes: The /course page is only accessible to logged-in users.

Book Catalog: Fetches and displays a list of all available books.

Free Book Carousel: A special section on the homepage for free books, displayed in a "react-slick" carousel.

Dark Mode: A theme-switcher in the navbar to toggle between light and dark modes.

Responsive Design: Built with Tailwind CSS for a mobile-friendly experience.

🛠️ Tech Stack
This project is a monorepo containing two separate applications:

Frontend (React + Vite)
Framework: React

Routing: React Router

Styling: Tailwind CSS

API Client: Axios

Form Management: React Hook Form

State Management: React Context API

Notifications: React Hot Toast

Carousel: React Slick

Backend (Node.js + Express)
Framework: Express.js

Database: MongoDB (with Mongoose)

Authentication: bcryptjs for password hashing.

Environment: dotenv for managing secrets.

CORS: cors for cross-origin requests.


Bash

npm run dev
