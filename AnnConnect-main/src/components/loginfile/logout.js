import React from "react";
import { useAuth } from "../firebaseFile/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <button className="btn btn-outline-success mb-3" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
