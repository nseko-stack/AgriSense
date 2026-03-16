import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/login", { email, password });
    console.log("LOGIN RESPONSE:", res.data);

    if (res.data.success) {
      localStorage.setItem("admin", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error.response?.data || error.message);
    alert("Server error");
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">AgriSense Admin</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;