import React, { useRef, useState } from "react";
import { login } from "../../Service/AuthService";
import { Link, useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_SERVER_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SERVER_CLIENT_SECRET;

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  if (localStorage.getItem("accessToken")) {
    return (window.location.href = "/home");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    const validated = handleValidation(name, value);
    setError({ ...error, [name]: validated });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let loginUser = {
      username: data.email,
      password: data.password,
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: "*",
    };
    const response = await login(loginUser);
    if (response.error) {
      alert(response?.error_description);
    }
    navigate("/home");
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card card-body mt-5">
            <h4 className="text-center">Sign In</h4>
            <form ref={formRef} onSubmit={handleFormSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                {error.email && (
                  <small className="text-danger">{error.email}</small>
                )}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {error.password && (
                  <small className="text-danger">{error.password}</small>
                )}
              </div>
              <div className="form-group mt-2 d-grid">
                <button type="submit" className="btn btn-sm btn-primary">
                  Login
                </button>
              </div>
            </form>
            <div className="register-section text-center mt-3">
              No Account?
              <Link to={`/register`}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const handleValidation = (name, value) => {
  if (name == "email") {
    if (value.trim() == "") return "User Email must not be empty";
  }
  if (name == "password") {
    if (value.trim() == "") return "Password field must not be empty";
    if (value.length < 5) {
      return "Password must be more then or equal 6 digit";
    } else {
      return null;
    }
  }
  return null;
};
