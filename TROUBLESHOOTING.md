# Troubleshooting Guide - Register/Login Connection Issues

## Quick Fix Checklist

### 1. Verify Backend is Running
```bash
cd backend
npm run dev
```

**Expected Output:**
```
MongoDB Connected
Server running on port 5000
API available at http://localhost:5000/api
Frontend should connect from: http://localhost:5173
```

### 2. Verify Frontend is Running
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Test Backend Connection
Open browser and go to: `http://localhost:5000/api/health`

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Backend is running",
  "timestamp": "2024-..."
}
```

If you get "Cannot GET /api/health" or connection error:
- Backend is not running
- Backend is running on different port
- Check backend console for errors

### 4. Test API Endpoint Directly
Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**If you get CORS error:**
- Backend CORS is not configured correctly
- Check `backend/src/server.js` - CORS should allow `http://localhost:5173`

**If you get network error:**
- Backend is not running
- Check if port 5000 is available
- Check firewall settings

### 5. Common Issues & Solutions

#### Issue: "Network error: Cannot connect to server"
**Solution:**
1. Check if backend is running: `http://localhost:5000/api/health`
2. Check backend console for errors
3. Verify MongoDB is running
4. Check `.env` file exists in backend folder

#### Issue: "User already exists"
**Solution:**
- This is normal - try a different email
- Or check MongoDB to see existing users

#### Issue: "Invalid credentials"
**Solution:**
- Make sure you're using correct email/password
- Check if user exists in database
- Try registering a new account

#### Issue: CORS errors in browser console
**Solution:**
1. Check `backend/src/server.js`:
   ```javascript
   const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
   ```
2. Make sure frontend is running on port 5173
3. Restart backend after changing CORS settings

#### Issue: "MongoDB Connected" but registration fails
**Solution:**
1. Check MongoDB connection string in `.env`
2. Verify MongoDB is actually running
3. Check backend console for specific error messages

### 6. Step-by-Step Registration Test

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Wait for: "Server running on port 5000"

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Wait for: "Local: http://localhost:5173"

3. **Open Browser:**
   - Go to: `http://localhost:5173/register`

4. **Fill Form:**
   - Name: Test User
   - Email: test@example.com
   - Password: test123 (min 6 characters)

5. **Click Register:**
   - Should see "Registering..." button
   - Should redirect to `/furniture` on success
   - Should show error message if failed

6. **Check Browser Console (F12):**
   - Look for any errors
   - Check Network tab for API calls
   - Verify POST request to `/api/auth/register`

7. **Check Backend Console:**
   - Should see: "POST /api/auth/register"
   - Should see: "MongoDB Connected" (if not already shown)
   - Should see any error messages

### 7. Debugging Steps

#### Enable Detailed Logging

**Backend:** Already logs errors to console
**Frontend:** Check browser console (F12)

#### Test API Directly with curl/Postman

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

#### Check Network Tab in Browser

1. Open DevTools (F12)
2. Go to Network tab
3. Try to register
4. Look for `/api/auth/register` request
5. Check:
   - Status code (should be 201 for success)
   - Request payload
   - Response data
   - Any errors

### 8. Environment Variables Check

**Backend `.env` (required):**
```env
MONGO_URI=mongodb://localhost:27017/furniture-rental
JWT_SECRET=your_secret_key_here
PORT=5000
```

**Frontend `.env` (optional):**
```env
VITE_API_URL=http://localhost:5000/api
```

If frontend `.env` doesn't exist, it defaults to `http://localhost:5000/api`

### 9. Port Conflicts

**If port 5000 is in use:**
- Change PORT in backend `.env`
- Update frontend `.env` with new port
- Or kill the process using port 5000

**If port 5173 is in use:**
- Vite will automatically use next available port
- Check console for actual port number
- Update backend CORS if needed

### 10. Still Not Working?

1. **Clear browser cache and localStorage:**
   ```javascript
   // In browser console
   localStorage.clear()
   location.reload()
   ```

2. **Restart both servers:**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Start backend again
   - Start frontend again

3. **Check for typos:**
   - API URL in `frontend/src/services/api.js`
   - CORS origin in `backend/src/server.js`
   - Route paths in both frontend and backend

4. **Verify dependencies installed:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

5. **Check MongoDB:**
   - Is MongoDB running?
   - Is connection string correct?
   - Can you connect with MongoDB Compass?

---

## Success Indicators

✅ **Backend Connected:**
- `http://localhost:5000/api/health` returns JSON
- Backend console shows "Server running on port 5000"

✅ **Frontend Connected:**
- Can see furniture list on homepage
- No CORS errors in console
- API calls show in Network tab

✅ **Registration Working:**
- Form submits successfully
- Redirects to furniture page
- User data in localStorage
- Token present in localStorage

✅ **Login Working:**
- Can login with registered credentials
- Redirects to furniture page
- User data in localStorage
- Token present in localStorage

