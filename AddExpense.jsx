import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function AddExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // nothing special on mount here; ExpenseTracker is the source of truth in localStorage
    }, []);

    const addExpense = () => {
        if (!title || !amount || !category || !date) {
            alert("Please fill all fields!");
            return;
        }

        const newExpense = { key: Date.now(), title, amount: parseFloat(amount), date, category };
        const saved = localStorage.getItem('expenseList');
        const current = saved ? JSON.parse(saved) : [];
        const updated = [...current, newExpense];
        localStorage.setItem('expenseList', JSON.stringify(updated));

        // reset and go back
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
        navigate('/');
    };

    return (
        <div className="tracker-container" style={{maxWidth:480, margin:'40px auto'}}>
            <h2 style={{marginBottom:16}}>Add Expense</h2>

            <div className="input-group">
                <input type="text" value={title} placeholder="Expense Name" onChange={(e) =>
                     setTitle(e.target.value)} />

                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose a Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Others">Others</option>
                </select>
                <input type="number" value={amount} placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
                <button className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                <button className="btn-primary" onClick={addExpense}>+ Add Expense</button>
            </div>
        </div>
    );
}

export default AddExpense;
