import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FurnitureList from "./pages/furniture/FurnitureList";
import FurnitureDetails from "./pages/furniture/FurnitureDetails";
import CreateFurniture from "./pages/furniture/CreateFurniture";
import UserDashboard from "./pages/dashboard/UserDashboard";
import SystemDashboard from "./pages/dashboard/SystemDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/furniture" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/furniture" element={<FurnitureList />} />
        <Route path="/furniture/:id" element={<FurnitureDetails />} />

        <Route
          path="/create-furniture"
          element={
            <ProtectedRoute>
              <CreateFurniture />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/system"
          element={
            <ProtectedRoute>
              <SystemDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
