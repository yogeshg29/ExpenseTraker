import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditExpense() {
  const { key } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("expenseList")) || [];
    const expenseToEdit = savedList.find(
      (expense) => expense.key === Number(key)
    );

    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    } else {
      alert("Expense not found!");
      navigate("/");
    }
  }, [key, navigate]);

  const saveChanges = () => {
    const savedList = JSON.parse(localStorage.getItem("expenseList")) || [];
    const updatedList = savedList.map((expense) =>
      expense.key === Number(key)
        ? { ...expense, title, amount, category, date }
        : expense
    );

    localStorage.setItem("expenseList", JSON.stringify(updatedList));
    alert("✅ Expense updated successfully!");
    navigate("/");
  };

  return (
    <div className="tracker-container" style={{maxWidth:480, margin:'40px auto'}}>
      <h2 style={{marginBottom:16}}>Edit Expense</h2>

      <div className="input-group">
        <input
          type="text"
          value={title}
          placeholder="Expense Name"
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="number"
          value={amount}
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
        <button className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        <button className="btn-primary" onClick={saveChanges}>Save</button>
      </div>
    </div>
  );
}

export default EditExpense;
