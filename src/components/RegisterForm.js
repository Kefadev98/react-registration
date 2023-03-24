import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { link } from "../style/link";

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialValues = { username: "", password: "", confirmPassword: "" };
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
    } else if (values.password.length <= 4 || values.password.length >= 10) {
      errors.password = "Password must have between 4 and 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
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
        "/register",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          //include cookies in request
          withCredentials: true,
        }
      );
      console.log(response.data);

      navigate("/login");
    } catch (err) {
      if (!err.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("Username is already taken");
      } else {
        setErrorMsg("Registration failed!");
      }
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Sign in</h1>
          <p className="subtitle">Sign in and start managing your candidates</p>
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
        <small className="invalid">{formErrors?.password}</small>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <small className="invalid">{formErrors?.confirmPassword}</small>
        <div className="link">
          <Link to="/login" style={link}>
            You already have an account?
          </Link>
        </div>
        <button type="submit">Submit</button>
        {errorMsg && <p className="bad_request">{errorMsg}</p>}
      </form>
    </section>
  );
};

export default RegisterForm;
