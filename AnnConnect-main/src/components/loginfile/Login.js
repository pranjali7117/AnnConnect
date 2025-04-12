import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebaseFile/firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import "./Loginsignup.css";
import { doc, getDoc } from "firebase/firestore";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [key, setKey] = useState("Sign In");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.emailVerified);
      if (user.emailVerified) {
        setKey("Success");
        checkUserProfile(user);
      } else {
        alert("Please verify your email before logging in.");
        await user.auth.signOut();
        navigate("/Login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      if (user.emailVerified) {
        setKey("Success");
        checkUserProfile(user);
      } else {
        setError("Please verify your email before logging in.");
        sendEmailVerification(user);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const checkUserProfile = async (user) => {
    try {
      const donorDoc = await getDoc(doc(db, "userDonor", user.uid));
      if (donorDoc.exists()) {
        navigate("/Donor");
        return;
      }

      const feederDoc = await getDoc(doc(db, "userFeeder", user.uid));
      if (feederDoc.exists()) {
        navigate("/Ngo");
        return;
      }

      navigate("/Registration");
    } catch (error) {
      setError("Error checking user profile: " + error.message);
    }
  };

  return (
    <div className="container col-2">
      <h2>Login</h2>
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
        <button type="submit">{key}</button>
      </form>
      <button onClick={handleGoogleLogin}>OR Login with Google</button>
      {error && <p>{error}</p>}
      <p>
        Don't have an account?
        <button onClick={() => navigate("/Signup")}>Sign Up</button>
      </p>
      <p>
        <button onClick={() => navigate("/ForgotPassword")} className="pass">
          Forgot Password?
        </button>
      </p>
    </div>
  );
};

export default Login;
