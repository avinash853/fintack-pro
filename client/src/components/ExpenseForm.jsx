import { useState } from "react";

function ExpenseForm({ addExpense }) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const now = new Date();

        const expense = {

            id: Date.now(),

            title,

            amount,

            date: now.toLocaleDateString(),

            time: now.toLocaleTimeString(),

            day: now.getDate(),

            month: now.toLocaleString("default", {
                month: "long",
            }),

            year: now.getFullYear(),

        };

        addExpense(expense);

        setTitle("");
        setAmount("");
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4"
        >

            <input
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                className="p-3 rounded-xl bg-zinc-800 text-white w-full"
                required
            />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value)
                }
                className="p-3 rounded-xl bg-zinc-800 text-white w-full"
                required
            />

            <button
                type="submit"
                className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition"
            >

                Add Expense

            </button>

        </form>
    );
}

export default ExpenseForm;