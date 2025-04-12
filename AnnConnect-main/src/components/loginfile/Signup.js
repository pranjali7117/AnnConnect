import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebaseFile/AuthProvider";
import './Loginsignup.css';

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(email, password);
      alert("Signup successful! A verification email has been sent. Please verify your email before logging in.");
      await user.auth.signOut();
      navigate("/Login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account?
        <button onClick={() => navigate("/Login")}>Log In</button>
      </p>
    </div>
  );
};

export default Signup;
