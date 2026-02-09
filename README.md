# Furniture Rental Management System

A full-stack furniture rental application built with React (Frontend) and Node.js/Express (Backend).

## Features

- User Authentication (Register/Login)
- Furniture Listing and Management
- Furniture Rental System
- User Dashboard with Analytics
- Image Upload for Furniture
- IKEA-inspired Modern UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory with the following:
```env
MONGO_URI=mongodb://localhost:27017/furniture-rental
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

If you don't create this file, it will default to `http://localhost:5000/api`

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Cloning to Another Device

When cloning this repository to another device:

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Furniture-Rental-System
```

2. **Backend Setup:**
   - Navigate to `backend` folder
   - Run `npm install`
   - Create `.env` file with your MongoDB connection string
   - Make sure MongoDB is running
   - Run `npm run dev`

3. **Frontend Setup:**
   - Navigate to `frontend` folder
   - Run `npm install`
   - (Optional) Create `.env` file if backend runs on different port
   - Run `npm run dev`

4. **Important Notes:**
   - Make sure MongoDB is installed and running
   - Update the `MONGO_URI` in backend `.env` if using a different MongoDB instance
   - If backend runs on a different port, update `VITE_API_URL` in frontend `.env`
   - The `uploads` folder will be created automatically in the backend directory

## Default Ports

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Project Structure

```
Furniture-Rental-System/
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth middleware, upload middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Server entry point
│   ├── uploads/           # Uploaded images (created automatically)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/       # API service
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## Troubleshooting

### Registration/Login Issues

1. **Check MongoDB Connection:**
   - Ensure MongoDB is running
   - Verify `MONGO_URI` in backend `.env` is correct

2. **Check Backend Server:**
   - Ensure backend is running on port 5000
   - Check console for any errors

3. **Check Frontend API URL:**
   - Verify `VITE_API_URL` in frontend `.env` matches backend URL
   - Default is `http://localhost:5000/api`

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check Console and Network tabs for errors

### Common Issues

- **CORS Errors:** Make sure backend CORS is configured correctly
- **Image Upload Fails:** Ensure `uploads` folder exists in backend directory
- **Token Expired:** Logout and login again
- **Port Already in Use:** Change PORT in backend `.env` or kill the process using the port

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens (use a strong random string)
- `PORT`: Server port (default: 5000)

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## License

ISC

