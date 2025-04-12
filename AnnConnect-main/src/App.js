import "./App.css";
import Content from "./components/contents/Content";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/loginfile/Login";
import Signup from "./components/loginfile/Signup";
import React from "react";
import ForgotPassword from "./components/loginfile/ForgotPassword";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthProvider } from "./components/firebaseFile/AuthProvider";
import Registration from "./components/Registrations/Registration";
import ProtectedRoute from "./components/firebaseFile/ProtectedRoute";
import Rerite from "./components/firebaseFile/Rerite";
import Donor from "./components/Donors/Donor";
import Ngo from "./components/Ngos/Ngo";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Navbar title="AnnaConnect" /> <Content /> <Footer />
                </>
              }
            />
            <Route
              path="/ForgotPassword"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <ForgotPassword />
                </Rerite>
              }
            />
            <Route
              path="/signup"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <Signup />
                </Rerite>
              }
            />
            <Route
              path="/login"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <Login />
                </Rerite>
              }
            />
            <Route
              path="/Registration"
              element={
                <ProtectedRoute>
                  <div>
                    <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Registration />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/Donor"
              element={
                <ProtectedRoute>
                  <div>
                    <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Donor />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/Ngo"
              element={
                <ProtectedRoute>
                  <div>
                    <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Ngo />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
