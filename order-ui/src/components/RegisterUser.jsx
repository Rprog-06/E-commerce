import { useState } from "react";
import api from "../api/api"
import { Link, useNavigate } from "react-router-dom";


function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const name = formData.name.trim();
    const email = formData.email.trim();
    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await api.post(
        "/users",
        { ...formData, name, email }
      );

      setMessage("User registered successfully ✅");
      setFormData({ name: "", email: "", password: "" });

      console.log(response.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-aside"><Link className="brand" to="/login"><span className="brand-mark">O</span><span>orbit<span className="brand-dot">.</span></span></Link><div><p className="eyebrow">Make room for good</p><h1>Start your<br /><em>own collection.</em></h1></div></div>
      <div className="auth-card">
        <p className="eyebrow">New here?</p><h2>Create your account.</h2><p className="subtle">A thoughtful marketplace, made personal.</p>
        {message && <p className="form-success">{message}</p>}
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
          <input
              id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

          <div className="form-field">
            <label htmlFor="register-email">Email address</label>
          <input
              id="register-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

          <div className="form-field">
            <label htmlFor="register-password">Password</label>
          <input
              id="register-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

          <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : <>Create account <span aria-hidden="true">→</span></>}</button>
        </form>
        <p className="auth-switch">Already have an account? <button onClick={() => navigate("/login")}>Sign in</button></p>
      </div>
    </div>
  );
}

export default RegisterUser;