import axios from "axios";
import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    fetchExpenses();

  }, []);

  // FETCH

  const fetchExpenses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/expenses"
      );

      setExpenses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD

  const addExpense = async (expense) => {

    try {

      await axios.post(
        "http://localhost:5000/expenses",
        expense
      );

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE

  const deleteExpense = (id) => {

    const filtered = expenses.filter(
      (item) => item.id !== id
    );

    setExpenses(filtered);

  };

  // TOTAL

  const totalExpenses = expenses.reduce(
    (acc, item) =>
      acc + Number(item.amount),
    0
  );

  // DAILY

  const today =
    new Date().toLocaleDateString();

  const dailyExpense = expenses
    .filter((item) =>
      item.date === today
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  // MONTHLY

  const currentMonth =
    new Date().toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const monthlyExpense = expenses
    .filter(
      (item) =>
        item.month === currentMonth
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  // YEARLY

  const currentYear =
    new Date().getFullYear();

  const yearlyExpense = expenses
    .filter(
      (item) =>
        item.year === currentYear
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  // GRAPH DATA

  const graphData = [

    {
      name: "Daily",
      value: dailyExpense,
    },

    {
      name: "Monthly",
      value: monthlyExpense,
    },

    {
      name: "Yearly",
      value: yearlyExpense,
    },

  ];

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
  ];

  return (

    <>

      <style>

        {`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          background:#f5f7fb;
        }

        .dashboard{
          display:flex;
          min-height:100vh;
        }

        /* SIDEBAR */

        .sidebar{

          width:270px;

          background:white;

          padding:30px;

          border-right:1px solid #ddd;

          display:flex;
          flex-direction:column;
          align-items:center;

        }

        .logo{

          display:flex;
          align-items:center;
          gap:10px;

          margin-bottom:40px;

        }

        .logo-circle{

          width:50px;
          height:50px;

          border-radius:50%;

          background:#3b82f6;

          display:flex;
          justify-content:center;
          align-items:center;

          color:white;

          font-size:24px;
          font-weight:bold;

        }

        .profile{

          text-align:center;
          margin-bottom:40px;

        }

        .avatar{

          width:110px;
          height:110px;

          border-radius:50%;

          background:linear-gradient(
            135deg,
            #3b82f6,
            #06b6d4
          );

          display:flex;
          justify-content:center;
          align-items:center;

          color:white;

          font-size:45px;
          font-weight:bold;

          margin:auto;
          margin-bottom:20px;

        }

        .profile h2{
          margin-bottom:8px;
        }

        .profile p{
          color:#6b7280;
        }

        .menu{
          width:100%;
        }

        .menu button{

          width:100%;

          padding:15px;

          border:none;

          border-radius:12px;

          background:#f3f4f6;

          margin-bottom:15px;

          cursor:pointer;

          transition:0.3s;

          font-size:16px;

        }

        .menu button:hover{

          background:#3b82f6;
          color:white;

          transform:translateX(5px);

        }

        /* MAIN */

        .main{

          flex:1;
          padding:30px;

        }

        .topbar{

          display:flex;
          justify-content:space-between;
          align-items:center;

          margin-bottom:30px;

        }

        .topbar h1{
          font-size:38px;
        }

        /* CARDS */

        .cards{

          display:grid;

          grid-template-columns:
          repeat(auto-fit,minmax(220px,1fr));

          gap:20px;

          margin-bottom:30px;

        }

        .card{

          background:white;

          padding:25px;

          border-radius:20px;

          box-shadow:
          0 5px 15px rgba(0,0,0,0.08);

          transition:0.3s;

        }

        .card:hover{

          transform:translateY(-5px);

        }

        .card h2{

          color:#6b7280;
          margin-bottom:10px;

        }

        .card p{

          font-size:34px;
          font-weight:bold;

        }

        .daily p{
          color:#3b82f6;
        }

        .monthly p{
          color:#ef4444;
        }

        .yearly p{
          color:#22c55e;
        }

        .total p{
          color:#8b5cf6;
        }

        /* GRAPH */

        .graph-section{

          background:white;

          padding:30px;

          border-radius:20px;

          margin-bottom:30px;

          box-shadow:
          0 5px 15px rgba(0,0,0,0.08);

        }

        .graph-section h2{
          margin-bottom:20px;
        }

        /* FORM */

        .form-section{

          background:white;

          padding:30px;

          border-radius:20px;

          margin-bottom:30px;

          box-shadow:
          0 5px 15px rgba(0,0,0,0.08);

        }

        /* EXPENSE */

        .expense-section{

          background:white;

          padding:30px;

          border-radius:20px;

          box-shadow:
          0 5px 15px rgba(0,0,0,0.08);

        }

        .expense-list{

          display:flex;
          flex-direction:column;
          gap:15px;

        }

        @media(max-width:900px){

          .dashboard{
            flex-direction:column;
          }

          .sidebar{
            width:100%;
          }

        }

        `}

      </style>

      <div className="dashboard">

        {/* SIDEBAR */}

        <div className="sidebar">

          <div className="logo">

            <div className="logo-circle">

              ₹

            </div>

            <h1>

              FinTrack

            </h1>

          </div>

          <div className="profile">

            <div className="avatar">

              A

            </div>

            <h2>

              Avinash Verma

            </h2>

            <p>

              Expense Analytics

            </p>

          </div>

          <div className="menu">

            <button>
              Dashboard
            </button>

            <button>
              Reports
            </button>

            <button>
              Analytics
            </button>

            <button
              onClick={() => {

                localStorage.removeItem(
                  "token"
                );

                window.location.reload();

              }}
            >

              Logout

            </button>

          </div>

        </div>

        {/* MAIN */}

        <div className="main">

          <div className="topbar">

            <h1>

              Expense Dashboard

            </h1>

            <p>

              {new Date()
                .toLocaleDateString()}

            </p>

          </div>

          {/* CARDS */}

          <div className="cards">

            <div className="card daily">

              <h2>
                Daily Expense
              </h2>

              <p>
                ₹{dailyExpense}
              </p>

            </div>

            <div className="card monthly">

              <h2>
                Monthly Expense
              </h2>

              <p>
                ₹{monthlyExpense}
              </p>

            </div>

            <div className="card yearly">

              <h2>
                Yearly Expense
              </h2>

              <p>
                ₹{yearlyExpense}
              </p>

            </div>

            <div className="card total">

              <h2>
                Total Expense
              </h2>

              <p>
                ₹{totalExpenses}
              </p>

            </div>

          </div>

          {/* GRAPH */}

          <div className="graph-section">

            <h2>

              Expense Reports

            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={graphData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={graphData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {

                    graphData.map(
                      (entry,index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* FORM */}

          <div className="form-section">

            <h2>

              Add Expense

            </h2>

            <ExpenseForm
              addExpense={addExpense}
            />

          </div>

          {/* EXPENSES */}

          <div className="expense-section">

            <h2>

              Recent Expenses

            </h2>

            <div className="expense-list">

              {

                expenses.length === 0 ? (

                  <p>

                    No expenses added yet.

                  </p>

                ) : (

                  expenses.map(
                    (expense,index) => (

                      <ExpenseCard
                        key={index}
                        expense={expense}
                        deleteExpense={
                          deleteExpense
                        }
                      />

                    )
                  )

                )

              }

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Dashboard;