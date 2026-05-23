function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <>

      {/* CSS INSIDE SAME PAGE */}

      <style>

        {`

          .navbar {

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 18px 40px;

            background: rgba(24, 24, 27, 0.9);

            backdrop-filter: blur(12px);

            border-bottom: 1px solid #27272a;

            position: sticky;
            top: 0;

            z-index: 1000;

            box-shadow: 0 4px 20px rgba(0,0,0,0.3);

          }

          /* LEFT */

          .navbar-left {

            display: flex;
            align-items: center;
            gap: 15px;

          }

          .logo-circle {

            width: 50px;
            height: 50px;

            border-radius: 50%;

            background: linear-gradient(
              135deg,
              #3b82f6,
              #06b6d4
            );

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 24px;
            font-weight: bold;

            color: white;

            box-shadow: 0 0 20px rgba(59,130,246,0.5);

          }

          .logo-text {

            font-size: 28px;
            font-weight: bold;

            margin: 0;

            color: white;

          }

          .logo-subtext {

            margin: 0;

            color: #9ca3af;

            font-size: 14px;

          }

          /* RIGHT */

          .navbar-right {

            display: flex;
            align-items: center;
            gap: 20px;

          }

          /* PROFILE */

          .profile-box {

            display: flex;
            align-items: center;
            gap: 10px;

            background: #27272a;

            padding: 8px 14px;

            border-radius: 50px;

          }

          .profile-avatar {

            width: 38px;
            height: 38px;

            border-radius: 50%;

            background: linear-gradient(
              135deg,
              #22c55e,
              #16a34a
            );

            display: flex;
            justify-content: center;
            align-items: center;

            color: white;
            font-weight: bold;

          }

          /* LOGOUT */

          .logout-btn {

            background: linear-gradient(
              135deg,
              #ef4444,
              #dc2626
            );

            color: white;

            border: none;

            padding: 12px 22px;

            border-radius: 12px;

            font-size: 15px;
            font-weight: bold;

            cursor: pointer;

            transition: 0.3s;

          }

          .logout-btn:hover {

            transform: scale(1.05);

            box-shadow: 0 0 15px rgba(239,68,68,0.5);

          }

          /* RESPONSIVE */

          @media (max-width: 768px) {

            .navbar {

              flex-direction: column;
              gap: 15px;

              padding: 20px;

            }

          }

        `}

      </style>

      {/* NAVBAR */}

      <nav className="navbar">

        {/* LEFT */}

        <div className="navbar-left">

          <div className="logo-circle">

            ₹

          </div>

          <div>

            <h1 className="logo-text">

              FinTrack Pro

            </h1>

            <p className="logo-subtext">

              Smart Expense Tracker

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="navbar-right">

          <div className="profile-box">

            <div className="profile-avatar">

              A

            </div>

            <span>

              Avinash

            </span>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </nav>

    </>

  );
}

export default Navbar;