import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const logoutUser = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };
  return (
    <div>
      <p>You are successfully logged in!</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Success;
