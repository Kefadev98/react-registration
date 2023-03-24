import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { link } from "../style/link";
import axios from "../services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));

    const user = formValues.username;
    const pwd = formValues.password;
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          //include cookies in request
          withCredentials: true,
        }
      );
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      navigate("/success");
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed!");
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Login</h1>
          <p className="subtitle">Login and start managing your candidates</p>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>
        <small className="invalid">{formErrors?.username}</small>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <small className="invalid">{formErrors.password}</small>
        <div className="link">
          <Link to="/" style={link}>
            Create new account
          </Link>
        </div>
        <button type="submit">Submit</button>
        {errorMsg && <p className="bad_request">{errorMsg}</p>}
      </form>
    </section>
  );
};

export default LoginForm;
