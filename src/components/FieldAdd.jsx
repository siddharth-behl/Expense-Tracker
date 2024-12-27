import React, { useContext, useEffect } from "react";
import AlertBox from "./AlertBox";
import Input from "./Input";
import { editContext } from "../Contexts/EditingContext";
import useLocalStorage from "../hooks/useLocalStorage";
export default function FieldAdd({
  setExpenses,
  expenses,
  setAlert,
  all,
  setAll,
}) {
  let data;
  useEffect(() => {
    data = {
      title: all.title,
      category: all.category,
      Amount: all.Amount,
      id: crypto.randomUUID(),
    };
  }, [all]);

  function DataFilterAndEdit(myID) {
    setExpenses((prev) => {
      let indexOfOldElement;
      let newState = prev.filter((element) => {
        if (element.id === myID) {
          indexOfOldElement = prev.indexOf(element);
        }
        return element.id !== myID;
      });

      newState.splice(indexOfOldElement, 0, data);
      return newState;
    });
  }
  const [edit, setEdit] = useContext(editContext);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name != "Amount") {
      setAll({ ...all, [name]: value });
    } else {
      if (/^[0-9]*\.?[0-9]*$/g.test(value)) {
        setAll((prev) => {
          return { ...prev, [name]: value };
        });
      } else {
        setAlert({
          role: "danger",
          message:
            "Please enter only numbers and only one decimal in the Amount field!",
        });
        return;
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!all.title || all.title.length < 3) {
      if (!all.title) {
        setAlert({
          role: "danger",
          message: "Please enter correct title !",
        });
        return;
      }
      setAlert({
        role: "danger",
        message: `Title must be at least 3 characters long`,
      });
      return;
    }

    if (!all.Amount) {
      setAlert({
        role: "danger",
        message: "Please enter Some Amount !",
      });
      return;
    }
    if (!all.category) {
      setAlert({
        role: "danger",
        message: "Please Choose the category !",
      });
      return;
    }

    if (edit.isEditing) {
      DataFilterAndEdit(edit.ElementID);

      setEdit({ ElementID: "", isEditing: false });
    } else {
      setExpenses((prev) => {
        return [...prev, data];
      });
    }
    setAll({ title: "", category: "", Amount: "" });
  }
  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <Input
          htmlfor="title"
          labelName="Title"
          name="title"
          id="title"
          onChange={handleChange}
          value={all.title}
        />
        <Input
          htmlfor="amount"
          labelName="Amount"
          name="Amount"
          id="amount"
          onChange={handleChange}
          value={all.Amount}
        />
        <div className="input-container">
          <label htmlFor="category" style={{ color: "white" }}>
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={all.category}
          >
            <option hidden value="">
              Choose the Category
            </option>
            <option value="No Category">No Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Medicine">Medicine</option>
          </select>
        </div>

        <button className="add-btn">{edit.isEditing ? "Save" : "Add"}</button>
      </form>
    </>
  );
}
