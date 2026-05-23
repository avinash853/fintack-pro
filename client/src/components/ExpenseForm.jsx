import { useState } from "react";

function ExpenseForm({ addExpense }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category
    };

    addExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-2xl mt-8"
    >

      <h2 className="text-2xl font-bold mb-4">
        Add Expense
      </h2>

      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-black mb-4 outline-none"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-lg bg-black mb-4 outline-none"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-lg bg-black mb-4 outline-none"
      />

      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-bold w-full"
      >
        Add Expense
      </button>

    </form>
  );
}

export default ExpenseForm;