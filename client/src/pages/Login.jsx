import React, { useState } from "react";
import axios from "axios";
import "../Login.css";

const Login = ({ setIsLoggedIn }) => {

  const [isRegister, setIsRegister] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      localStorage.setItem(
        "token",
        res.data.token
      );

      setIsLoggedIn(true);

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      setIsRegister(false);

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>
          {isRegister
            ? "Create Account"
            : "Login"}
        </h2>

        <form
          onSubmit={
            isRegister
              ? handleRegister
              : handleLogin
          }
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">

            {isRegister
              ? "Register"
              : "Login"}

          </button>

        </form>

        <p>

          {isRegister
            ? "Already have an account?"
            : "New User?"}

          <span
            onClick={() =>
              setIsRegister(!isRegister)
            }
          >

            {isRegister
              ? " Login"
              : " Register Here"}

          </span>

        </p>

      </div>

    </div>
  );
};

export default Login;