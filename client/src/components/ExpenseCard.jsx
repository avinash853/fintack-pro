function ExpenseCard({ expense, deleteExpense }) {

  return (
    <div className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center mt-4">

      <div>
        <h2 className="text-xl font-bold">
          {expense.title}
        </h2>

        <p className="text-zinc-400">
          {expense.category}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <h2 className="text-green-400 text-2xl font-bold">
          ₹{expense.amount}
        </h2>

        <button
          onClick={() => deleteExpense(expense.id)}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseCard;