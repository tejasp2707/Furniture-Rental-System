# Backend-Frontend Connection Verification

## ✅ Connection Status: VERIFIED

### API Configuration
- **Frontend API Base URL**: `http://localhost:5000/api` (default)
- **Backend Server**: `http://localhost:5000`
- **CORS Origin**: `http://localhost:5173`
- **Connection**: ✅ Properly configured

### Register Endpoint Flow
```
Frontend (Register.jsx)
  ↓
POST /api/auth/register
  ↓
Backend (authController.js → registerUser)
  ↓
Validates → Creates User → Returns Token
  ↓
Frontend stores token → Redirects to /furniture
```

**Status**: ✅ **CONNECTED**

### Login Endpoint Flow
```
Frontend (Login.jsx)
  ↓
POST /api/auth/login
  ↓
Backend (authController.js → loginUser)
  ↓
Validates credentials → Returns Token
  ↓
Frontend stores token → Redirects to /furniture
```

**Status**: ✅ **CONNECTED**

## 🔍 How to Verify Connection

### Method 1: Browser Test
1. Open `http://localhost:5173/register`
2. Fill form and submit
3. Open Browser DevTools (F12) → Network tab
4. Look for request to `http://localhost:5000/api/auth/register`
5. Check:
   - Status: 201 (Created) = ✅ Connected
   - Status: (failed) = ❌ Backend not running
   - CORS error = ❌ CORS misconfigured

### Method 2: Health Check
1. Open `http://localhost:5000/api/health` in browser
2. Should see: `{"status":"OK","message":"Backend is running"}`
3. If error = Backend not running

### Method 3: Console Test
Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Connected:', data))
  .catch(err => console.error('❌ Not connected:', err))
```

## 🚨 If Still Getting Network Errors

### Step 1: Verify Backend is Running
```bash
cd backend
npm run dev
```
**Look for:** "Server running on port 5000"

### Step 2: Verify MongoDB is Running
- Check MongoDB service status
- Verify connection string in `.env`
- Backend should show: "MongoDB Connected"

### Step 3: Check Ports
- Backend: Port 5000 (check if in use)
- Frontend: Port 5173 (Vite will auto-adjust if in use)

### Step 4: Test Direct API Call
```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET
```

### Step 5: Check CORS
- Backend allows: `http://localhost:5173`
- Frontend calls: `http://localhost:5000/api`
- Should match exactly

## ✅ Expected Behavior

### Successful Registration:
1. Fill form → Click Register
2. Button shows "Registering..."
3. Success → Redirects to `/furniture`
4. localStorage has `token` and `user`
5. Navbar shows "Account", "List Item", "Logout"

### Successful Login:
1. Fill form → Click Login
2. Button shows "Logging in..."
3. Success → Redirects to `/furniture`
4. localStorage has `token` and `user`
5. Navbar shows "Account", "List Item", "Logout"

### Network Error:
1. Error message appears: "Network error: Cannot connect to server..."
2. Check backend is running
3. Check MongoDB is running
4. Check ports are correct

## 📝 Quick Fix Commands

```bash
# 1. Start Backend
cd backend
npm run dev

# 2. Start Frontend (new terminal)
cd frontend
npm run dev

# 3. Test Health (browser)
http://localhost:5000/api/health

# 4. Test Registration (browser)
http://localhost:5173/register
```

## 🎯 Final Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB running and connected
- [ ] `.env` file exists in backend
- [ ] Health endpoint responds: `http://localhost:5000/api/health`
- [ ] No CORS errors in browser console
- [ ] Network tab shows API requests
- [ ] Registration form submits successfully
- [ ] Login form submits successfully

**If all checked ✅ → System is fully connected and working!**

