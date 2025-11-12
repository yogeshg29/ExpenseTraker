import React, { useState,useEffect} from 'react';
import Tracker from './components/Tracker.jsx';
import ExpenseTracker from './components/ExpenseTracker.jsx';
import AddExpense from './components/AddExpense.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditExpense from './components/EditExpense.jsx';
import './App.css';


// function App(){

//     return(
//         // <div>
//         //     <ExpenseTracker/>
//         //     <EditExpense/>
//         //     {/* <Tracker/> */}
//         // </div>
//     <Router>
//       <Routes>
//         <Route path="/" element={<ExpenseTracker />} />
//         <Route path="/edit/:key" element={<EditExpense />} />
//       </Routes>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseTracker />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/edit/:key" element={<EditExpense />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App_old(){
//     return(
//         <div>
//             <ExpenseTracker/>
//             {/* <Tracker/> */}
//         </div>
//     )
// }

// export default App;