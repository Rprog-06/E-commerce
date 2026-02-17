import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post(
        "/users/login",
        { email, password },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${localStorage.getItem("token")}`
        //   },
        //   body: JSON.stringify({ email, password })
        // }
      );

      // save login info
      localStorage.setItem("token", response.data.token) ;
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("role", response.data.role);
      console.log("Login successful:", response.data);

      navigate("/products");
    } catch (err) {
      setError("Invalid email or password ❌");
      console.error("Login error:", err.response.data);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit">Login</button>

      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}

export default Login;