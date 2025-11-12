import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ExpenseTracker() {
    const [expenseList, setExpenseList] = useState([]);
    const [filter, setFilter] = useState('All');
    const [budget, setBudget] = useState(() => {
        const b = localStorage.getItem('budget');
        return b ? parseFloat(b) : 20000;
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Load expenses from localStorage
    const loadExpenses = () => {
        const savedList = localStorage.getItem('expenseList');
        if (savedList) setExpenseList(JSON.parse(savedList));
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    // reload when location changes (coming back from add/edit)
    useEffect(() => {
        loadExpenses();
    }, [location]);

    const handleAdd = () => navigate('/add');

    const handleDelete = (key) => {
        const updated = expenseList.filter((e) => e.key !== key);
        setExpenseList(updated);
        localStorage.setItem('expenseList', JSON.stringify(updated));
    };

    const handleEdit = (key) => navigate(`/edit/${key}`);

    const handleAddBudget = () => {
        const v = prompt('Enter total budget amount (₹):', String(budget));
        if (v !== null) {
            const n = parseFloat(v);
            if (!isNaN(n)) {
                setBudget(n);
                localStorage.setItem('budget', String(n));
            }
        }
    };

    const totalExpense = expenseList.reduce((s, e) => s + Number(e.amount || 0), 0);
    const remaining = budget - totalExpense;

    const categories = ['All', ...Array.from(new Set(expenseList.map((e) => e.category).filter(Boolean)))];
    const filtered = filter === 'All' ? expenseList : expenseList.filter((e) => e.category === filter);

    return (
        <div className="tracker-container">
            <div className="header-row">
                    <div className="greeting">Hello, Yogesh Gupta</div>
                <div className="controls">
                    <button className="btn-secondary">All Expenses</button>
                    <button className="btn-secondary" onClick={handleAddBudget}>Add Budget</button>
                    <button className="btn-primary" onClick={handleAdd}>+ Add Expense</button>
                </div>
            </div>

            <div className="summary-grid">
                <div className="card">
                    <div className="label">Total Budget</div>
                    <div className="value">₹{budget.toLocaleString()}</div>
                </div>
                <div className="card">
                    <div className="label">Total Expense</div>
                    <div className="value">₹{totalExpense.toLocaleString()}</div>
                </div>
                <div className="card">
                    <div className="label">Remaining Budget</div>
                    <div className="value">₹{remaining.toLocaleString()}</div>
                </div>
            </div>

            <div className="filters">
                {categories.map((c) => (
                    <button
                        key={c}
                        className={`chip ${filter === c ? 'active' : ''}`}
                        onClick={() => setFilter(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <div className="charts">
                <div className="donut">
                    <strong>Expense Chart</strong>
                    <div style={{height:80, display:'flex', alignItems:'center', justifyContent:'center', color:'#889'}}>
                        (donut placeholder)
                    </div>
                </div>
                <div className="bar">
                    <strong>Expenses Tracker</strong>
                    <div style={{height:80, display:'flex', alignItems:'center', justifyContent:'center', color:'#889'}}>
                        (bar chart placeholder)
                    </div>
                </div>
            </div>

            <div className="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Expense</th>
                            <th>Amount</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{textAlign:'center', padding:'18px'}}>No expenses yet.</td>
                            </tr>
                        ) : (
                            filtered.map((exp, idx) => (
                                <tr key={exp.key}>
                                    <td>{idx + 1}</td>
                                    <td>{exp.title}</td>
                                    <td>₹{Number(exp.amount).toLocaleString()}</td>
                                    <td>
                                        <button className="btn-secondary" onClick={() => handleEdit(exp.key)}>Edit</button>
                                        <button className="btn-secondary" onClick={() => handleDelete(exp.key)} style={{marginLeft:8, background:'#ffecec', borderColor:'#ffd7d7'}}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpenseTracker;
