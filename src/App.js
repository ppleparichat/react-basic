import Transaction from "./components/Transaction";
import "./App.css";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";




function App() {
  const design = { color: "green", textAlign: "center", fontSize: "1.5rem" };

 
  const [items, setItems] = useState([]);

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpenses, setReportExpenses] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0);
    const expenses =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0).toFixed(2) * -1 ;

    setReportIncome(income.toFixed(2));
    setReportExpenses(expenses.toFixed(2));
  }, [items, reportIncome, reportExpenses]);

  
  return (
    <DataContext.Provider
      value={{income: reportIncome,expenses: reportExpenses}}
    >
      <div className="container">
        <h1 style={design}>Income and Expenses Program</h1>
        <Router>
        <div>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">Info</Link>
            </li>
            <li>
            <Link to="/insert">Save</Link>
            </li>
          </ul>
           <Routes>
              <Route path="/" exact element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              />
            </Routes>
        </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
