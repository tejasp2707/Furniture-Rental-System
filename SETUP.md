# Quick Setup Guide

## For New Device/Clone

### Step 1: Backend Setup

1. Open terminal in the project root
2. Navigate to backend:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create `.env` file in `backend` folder:
   ```env
   MONGO_URI=mongodb://localhost:27017/furniture-rental
   JWT_SECRET=your_super_secret_jwt_key_12345
   PORT=5000
   ```

5. Make sure MongoDB is running on your system

6. Start backend:
   ```bash
   npm run dev
   ```

### Step 2: Frontend Setup

1. Open a NEW terminal in the project root
2. Navigate to frontend:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. (Optional) Create `.env` file in `frontend` folder if backend is on different port:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start frontend:
   ```bash
   npm run dev
   ```

### Step 3: Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Troubleshooting Registration/Login

### Issue: "Cannot connect to server"
**Solution:** 
- Check if backend is running (should see "Server running on port 5000")
- Check if MongoDB is running
- Verify `.env` file exists in backend folder

### Issue: "User already exists"
**Solution:** 
- Try a different email address
- Or check MongoDB to see existing users

### Issue: "Invalid credentials"
**Solution:**
- Make sure you're using the correct email and password
- Check if user exists in database
- Try registering a new account

### Issue: CORS errors in browser console
**Solution:**
- Make sure backend is running
- Check if `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default frontend URL is `http://localhost:5173`

## MongoDB Setup

### Local MongoDB:
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/furniture-rental`

### MongoDB Atlas (Cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in backend `.env`

## Environment Variables Reference

### Backend `.env`:
```env
MONGO_URI=mongodb://localhost:27017/furniture-rental
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env` (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

## Testing Registration/Login

1. Go to http://localhost:5173
2. Click "Register" or go to http://localhost:5173/register
3. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: (at least 6 characters)
4. Click "Register"
5. You should be automatically logged in and redirected to furniture page

To test login:
1. Go to http://localhost:5173/login
2. Use the email and password you registered with
3. Click "Login"
4. You should be redirected to furniture page

