import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../../asset/img/back.svg";
import "./register.css";
import { register } from "../../../components/config/actions/UsersActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(register(form, navigate, setLoading));
  };
  return (
    <>
      <div class="container d-flex h-regis justify-content-center align-items-center">
        <main class="p-lg-5 p-4">
          <Link to={`/login`}>
            <img src={Back} alt="" />
          </Link>
          <h4 class="text-center mb-4 text-primary">Register</h4>
          <strong class="d-block mb-4">Let's create your account!</strong>
          <form onSubmit={handleSubmit}>
            <div>
              <label for="nama" class="mb-1">
                Name
              </label>
              <input
                type="text"
                class="custom-border w-100"
                id="nama"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div class="mt-3">
              <label for="email" class="mb-1">
                Email
              </label>
              <input
                type="text"
                class="custom-border w-100"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div class="mt-3">
              <label for="psw" class="mb-1">
                Password
              </label>
              <input
                type="password"
                class="custom-border w-100"
                id="psw"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div class="d-flex justify-content-end mt-3"></div>
            {loading ? (
              <>
                <button
                  className="btn btn-primary rounded-pill w-100 py-2 mt-3"
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
                  className="btn btn-primary rounded-pill w-100 py-2 mt-3"
                  type="submit"
                >
                  Login
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </>
  );
};

export default Register;
