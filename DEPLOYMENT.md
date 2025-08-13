# BookStore App - Deployment Guide

## Issues Fixed ✅

1. **Port Configuration**: Fixed backend port mismatch (now consistently uses 4001)
2. **Error Handling**: Fixed user controller error handling 
3. **Model Schema**: Fixed category field naming inconsistency
4. **Environment Files**: Moved frontend .env to correct location
5. **CORS Configuration**: Improved CORS with specific origins
6. **Git State**: Resolved merge conflicts
7. **Build Configuration**: Added root package.json and render.yaml
8. **🔥 SPA Routing Issue**: Fixed navigation using proper React Router Links instead of anchor tags
9. **Deployment Configuration**: Added _redirects file and updated render.yaml for SPA routing

## Pre-Deployment Checklist

### Backend
- [x] MongoDB connection string is secure and working
- [x] Environment variables are properly configured
- [x] CORS allows your frontend domain
- [x] Routes are properly defined and working
- [x] Error handling is implemented

### Frontend  
- [x] Environment variables point to correct backend URL
- [x] API calls use correct endpoints
- [x] Build process works (`npm run build`)
- [x] All components import correctly

### Database
- [ ] MongoDB Atlas cluster is running
- [ ] Database contains sample data for books
- [ ] User collection is properly configured

## Deployment Steps for Render

### Option 1: Using render.yaml (Recommended)
1. Commit and push all changes to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically detect the `render.yaml` configuration
4. Set the MongoDB URI in Render dashboard environment variables

### Option 2: Manual Setup
1. **Backend Service:**
   - Create new Web Service on Render
   - Connect to GitHub repo
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables:
     - `PORT=4001`
     - `MongoDBURI=your-mongodb-connection-string`
     - `NODE_ENV=production`
     - `FRONTEND_URL=https://your-frontend-url.onrender.com`

2. **Frontend Service:**
   - Create new Static Site on Render
   - Connect to same GitHub repo
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`
   - Add environment variable:
     - `VITE_BACKEND_URL=https://your-backend-url.onrender.com`

## Local Development

```bash
# Install dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend on http://localhost:4001
npm run dev:frontend # Frontend on http://localhost:5173
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure frontend URL is added to backend CORS configuration
2. **API Connection**: Check environment variables are correctly set
3. **Build Failures**: Ensure all dependencies are installed
4. **Database Issues**: Verify MongoDB connection string and database access

### MongoDB Setup:
If your database is empty, you need to add sample books data:
```javascript
// Sample books to add to MongoDB
[
  {
    name: "JavaScript Guide",
    price: 0,
    category: "Free", 
    image: "https://example.com/js-book.jpg",
    title: "Complete JavaScript Guide"
  },
  {
    name: "React Handbook",
    price: 29.99,
    category: "Paid",
    image: "https://example.com/react-book.jpg", 
    title: "Master React Development"
  }
]
```

## Environment Variables Summary

### Backend (.env):
```
PORT=4001
MongoDBURI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
FRONTEND_URL=https://bookstoreapp-yd4w.onrender.com
NODE_ENV=production
```

### Frontend (.env):
```
VITE_BACKEND_URL=https://bookstoreapp-q3mj.onrender.com
```
