import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f4f4f4" }}>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
