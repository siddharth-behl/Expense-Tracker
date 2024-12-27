import React, { useEffect, useState } from "react";
import "./App.css";
import FieldAdd from "./components/FieldAdd";
import Table from "./components/Table";
import AlertBox from "./components/AlertBox";
import useLocalStorage from "./hooks/useLocalStorage";
// import testhook from "./hooks/testhook";
export default function App() {
  // let [test, settest] = useState([1, 6, 3, 4, 2, 5]); //TO understand how state works .
  // let [count, setcount] = useState(0);
  // let [test, settest] = testhook();
  // let [test1, settest1] = testhook();
  // console.log("test : ", test);
  // console.log("test1 : ", test1);

  // useEffect(() => {
  //   settest1((prev) => prev + 1);
  //   settest((prev) => {
  //     return prev + 1;
  //   });
  // }, []);
  // console.log("test Final : ", test);
  // console.log("test 1 Final : ", test1);

  document.body.style.backgroundColor = "#2b2b2b";
  const [all, setAll] = useLocalStorage("all", {
    title: "",
    category: "",
    Amount: "",
  });

  let [expenses, setExpenses] = useLocalStorage("expenses", []);

  const [alert, setAlert] = useState({
    role: false,
    message: null,
  });

  return (
    <>

      <AlertBox alert={alert} setAlert={setAlert} />
      <main>
        <h1 style={{ color: "white" }}>Track Your Expense</h1>
        <div className="expense-tracker">
          <FieldAdd
            all={all}
            setAll={setAll}
            setExpenses={setExpenses}
            expenses={expenses}
            setAlert={setAlert}
          />
          <Table
            expenses={expenses}
            setExpenses={setExpenses}
            all={all}
            setAll={setAll}
          />
        </div>
      </main>
    </>
  );
}
