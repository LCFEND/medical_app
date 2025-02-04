import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await res.json();
      console.log("API Response:", json); // ✅ Debugging

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);

        if (json.name) { 
          sessionStorage.setItem("name", json.name);
        } else {
          console.warn("No name field in API response!");
        }

        navigate("/");
        window.location.reload();
      } else {
        if (json.errors) {
          setShowerr(json.errors.map((error) => error.msg).join(", "));
        } else {
          setShowerr(json.error);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowerr("An error occurred. Please try again.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setShowerr("Please enter a valid email.");
      return;
    }
    login();
  };

  return (
    <div className="login-container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text1">
          Are you a new member?{" "}
          <span>
            <Link to="/signup" style={{ color: "#2190ff" }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={submitHandler}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="login-form-control"
                placeholder="Enter your email"
                required
              />
              {showerr && <div className="err">{showerr}</div>}
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  minLength="8"
                  required
                  className="login-form-control"
                  placeholder="Enter your password"
                />
                <span className="password-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                </span>
              </div>
            </div>

            <div className="btn-subgroup">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <div className="btn-subgroup">
              <button type="reset" className="btn btn-danger">
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
