import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { login } from "../../../components/config/actions/UsersActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispacth(login(data, navigate, setLoading));
  };

  return (
    <>
      <div className="container d-flex h-login justify-content-center align-items-center">
        <main className="p-lg-5 p-4">
          <h4 className="text-center mb-5 text-primary">Login</h4>
          <strong className="d-block mb-4">Hi, Welcome Back!</strong>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="text"
                className="custom-border w-100"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="psw" className="mb-1">
                Password
              </label>
              <input
                type="password"
                className="custom-border w-100"
                id="psw"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <p>Forgot Password?</p>
            </div>
            {loading ? (
              <>
                <button
                  className="btn btn-primary rounded-pill w-100 p-2"
                  type="submit"
                >
                  <span
                    className="spinner-border text-light spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary rounded-pill w-100 p-2"
                  type="submit"
                >
                  Login
                </button>
              </>
            )}
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to={`/register`} style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login;
