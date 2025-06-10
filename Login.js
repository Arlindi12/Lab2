import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Ju lutemi plotësoni email dhe fjalëkalimin.");
      return;
    }

    const data = { Email: email, Password: password };
    const url = "https://localhost:7254/api/Account/Login";

    try {
      setLoading(true);
      const result = await axios.post(url, data);
      const [message, userRoleId, userId] = result.data.split(";");

      if (userRoleId && userId) {
        localStorage.setItem("userRoleId", userRoleId);
        localStorage.setItem("userId", userId);

        if (parseInt(userRoleId) === 1 || parseInt(userRoleId) === 2) {
          navigate("/Home");
        } else {
          setError("Roli i panjohur. Ju lutemi kontaktoni mbështetjen.");
        }
      } else {
        setError("Llogaria juaj nuk është aktive. Ju lutemi regjistrohuni.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Fjalëkalimi është gabim. Provoni përsëri.");
      } else {
        setError("Ndodhi një gabim. Provoni më vonë.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card text-black shadow-sm"
        style={{ borderRadius: "15px", width: "100%", maxWidth: "450px" }}
      >
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-4">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Shkruani email-in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Fjalëkalimi
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Shkruani fjalëkalimin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mt-4"
              disabled={loading}
            >
              {loading ? "Duke u kyçur..." : "Kyçu"}
            </button>

            <div className="text-center mt-3">
              Nuk jeni regjistruar?{" "}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate("/register")}
              >
                Regjistrohu këtu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
