import React, { useState, useEffect } from "react";

function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Load saved data from localStorage on page load
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) setExpenses(savedExpenses);
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense
  const addExpense = () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  // Delete expense
  const deleteExpense = (id) => {
    const updated = expenses.filter((item) => item.id !== id);
    setExpenses(updated);
  };

  // Total spent
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💰 Expense Tracker</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <button onClick={addExpense} style={styles.button}>Add Expense</button>
      </div>

      <h2 style={styles.total}>Total Spent: ₹{total}</h2>

      <ul style={styles.list}>
        {expenses.map((exp) => (
          <li key={exp.id} style={styles.item}>
            <span>
              <strong>{exp.title}</strong> — ₹{exp.amount} ({exp.category})
              <br />
              <small>{exp.date}</small>
            </span>
            <button onClick={() => deleteExpense(exp.id)} style={styles.delete}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { width: "90%", maxWidth: 500, margin: "30px auto", textAlign: "center", fontFamily: "sans-serif" },
  heading: { color: "#2c3e50" },
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "#27ae60", color: "#fff", border: "none", cursor: "pointer" },
  total: { marginTop: "10px", color: "#2980b9" },
  list: { listStyle: "none", padding: 0 },
  item: { background: "#ecf0f1", margin: "8px 0", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  delete: { background: "red", color: "white", border: "none", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }
};

export default Tracker;
