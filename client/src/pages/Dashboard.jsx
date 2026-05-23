import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import Analytics from "../components/Analytics";
function Dashboard() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

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

    const deleteExpense = (id) => {

        const filtered = expenses.filter(
            (item) => item.id !== id
        );

        setExpenses(filtered);

    };

    const totalExpenses = expenses.reduce(
        (acc, item) => acc + Number(item.amount),
        0
    );

    const income = 50000;

    const balance = income - totalExpenses;

    return (

        <div className="bg-black min-h-screen text-white">

            <Navbar />

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-zinc-900 p-6 rounded-2xl">

                        <h2 className="text-xl mb-2">
                            Income
                        </h2>

                        <p className="text-3xl font-bold text-yellow-400">
                            ₹{income}
                        </p>

                    </div>

                    <div className="bg-zinc-900 p-6 rounded-2xl">

                        <h2 className="text-xl mb-2">
                            Total Balance
                        </h2>

                        <p className="text-3xl font-bold text-green-400">
                            ₹{balance}
                        </p>

                    </div>

                    <div className="bg-zinc-900 p-6 rounded-2xl">

                        <h2 className="text-xl mb-2">
                            Total Expenses
                        </h2>

                        <p className="text-3xl font-bold text-red-400">
                            ₹{totalExpenses}
                        </p>

                    </div>

                    <div className="bg-zinc-900 p-6 rounded-2xl">

                        <h2 className="text-xl mb-2">
                            Savings
                        </h2>

                        <p className="text-3xl font-bold text-blue-400">
                            ₹{balance}
                        </p>

                    </div>

                </div>

                <ExpenseForm addExpense={addExpense} />

                <div className="mt-8">

                    <h2 className="text-3xl font-bold mb-4">
                        Recent Expenses
                    </h2>

                    {
                        expenses.length === 0 ? (

                            <p className="text-zinc-400">
                                No expenses added yet.
                            </p>

                        ) : (

                            expenses.map((expense, index) => (

                                <ExpenseCard
                                    key={index}
                                    expense={expense}
                                    deleteExpense={deleteExpense}
                                />

                            ))

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Dashboard;