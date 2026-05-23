function ExpenseCard({ expense, deleteExpense }) {

    return (

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-lg flex items-center justify-between hover:scale-[1.02] transition duration-300">

            <div>

                <h2 className="text-2xl font-bold">

                    {expense.title}

                </h2>

                <p className="text-zinc-400 mt-1">

                    ₹{expense.amount}

                </p>

                <p className="text-sm text-zinc-500 mt-2">

                    📅 {expense.date}

                </p>

                <p className="text-sm text-zinc-500">

                    ⏰ {expense.time}

                </p>

            </div>

            <button
                onClick={() =>
                    deleteExpense(expense.id)
                }
                className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >

                Delete

            </button>

        </div>
    );
}

export default ExpenseCard;