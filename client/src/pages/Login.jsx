import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] = useState("");

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

      localStorage.setItem(
        "name",
        res.data.user?.name || "User"
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
          name,
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

    <>

      {/* CSS */}

      <style>

        {`

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {

            font-family: Arial, sans-serif;

            background:
              linear-gradient(
                135deg,
                #0f172a,
                #1e293b,
                #111827
              );

          }

          .login-container {

            min-height: 100vh;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 20px;

          }

          .login-box {

            width: 100%;
            max-width: 430px;

            background:
              rgba(255,255,255,0.08);

            backdrop-filter: blur(15px);

            border:
              1px solid rgba(255,255,255,0.1);

            border-radius: 25px;

            padding: 40px;

            box-shadow:
              0 8px 32px rgba(0,0,0,0.4);

            animation: fadeIn 1s ease;

          }

          .login-title {

            text-align: center;

            color: white;

            font-size: 38px;

            margin-bottom: 10px;

            font-weight: bold;

          }

          .login-subtitle {

            text-align: center;

            color: #cbd5e1;

            margin-bottom: 35px;

          }

          .login-form {

            display: flex;
            flex-direction: column;
            gap: 18px;

          }

          .login-input {

            padding: 16px;

            border: none;

            border-radius: 14px;

            background:
              rgba(255,255,255,0.08);

            color: white;

            font-size: 16px;

            outline: none;

            transition: 0.3s;

          }

          .login-input:focus {

            border:
              1px solid #3b82f6;

            box-shadow:
              0 0 15px rgba(59,130,246,0.4);

          }

          .login-input::placeholder {

            color: #cbd5e1;

          }

          .login-btn {

            padding: 16px;

            border: none;

            border-radius: 14px;

            background:
              linear-gradient(
                135deg,
                #3b82f6,
                #06b6d4
              );

            color: white;

            font-size: 18px;

            font-weight: bold;

            cursor: pointer;

            transition: 0.3s;

          }

          .login-btn:hover {

            transform: translateY(-3px);

            box-shadow:
              0 10px 20px rgba(59,130,246,0.4);

          }

          .toggle-text {

            margin-top: 25px;

            text-align: center;

            color: #cbd5e1;

          }

          .toggle-btn {

            color: #38bdf8;

            cursor: pointer;

            font-weight: bold;

            margin-left: 5px;

          }

          .toggle-btn:hover {

            text-decoration: underline;

          }

          .logo {

            width: 90px;
            height: 90px;

            border-radius: 50%;

            background:
              linear-gradient(
                135deg,
                #3b82f6,
                #06b6d4
              );

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 40px;

            color: white;

            margin: auto;

            margin-bottom: 20px;

            box-shadow:
              0 0 30px rgba(59,130,246,0.5);

          }

          @keyframes fadeIn {

            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }

          }

        `}

      </style>

      {/* UI */}

      <div className="login-container">

        <div className="login-box">

          <div className="logo">

            ₹

          </div>

          <h1 className="login-title">

            FinTrack Pro

          </h1>

          <p className="login-subtitle">

            Smart Expense Management

          </p>

          <form
            className="login-form"
            onSubmit={
              isRegister
                ? handleRegister
                : handleLogin
            }
          >

            {

              isRegister && (

                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="login-input"
                  required
                />

              )

            }

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="login-input"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="login-input"
              required
            />

            <button
              type="submit"
              className="login-btn"
            >

              {

                isRegister
                  ? "Create Account"
                  : "Login"

              }

            </button>

          </form>

          <p className="toggle-text">

            {

              isRegister
                ? "Already have an account?"
                : "New here?"

            }

            <span
              className="toggle-btn"
              onClick={() =>
                setIsRegister(!isRegister)
              }
            >

              {

                isRegister
                  ? " Login"
                  : " Register"

              }

            </span>

          </p>

        </div>

      </div>

    </>

  );
};

export default Login;