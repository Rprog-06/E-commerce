import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";


function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await api.post(
        "/users/login",
        { email: normalizedEmail, password },
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
      setError(err.response?.data?.message || "Invalid email or password.");
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-aside"><Link className="brand" to="/login"><span className="brand-mark">O</span><span>orbit<span className="brand-dot">.</span></span></Link><div><p className="eyebrow">A little more lovely</p><h1>Find your<br /><em>everyday favourite.</em></h1></div></div>
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p><h2>Sign in to orbit.</h2><p className="subtle">Your considered collection is waiting.</p>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
          <input
              id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
          <input
              id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

          <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : <>Sign in <span aria-hidden="true">→</span></>}</button>
        </form>
        <p className="auth-switch">New to orbit? <button onClick={() => navigate("/register")}>Create an account</button></p>
      </div>
    </div>
  );
}

export default Login;