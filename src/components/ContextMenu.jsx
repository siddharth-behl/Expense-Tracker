import React, { useContext } from "react";
import { editContext } from "../Contexts/EditingContext";
export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  rowID,
  setExpenses,
  expenses,
  setAll,
}) {
  const [edit, setEdit] = useContext(editContext);
  
  if (!menuPosition.left) return;
  function DataFilter() {
    setExpenses(
      expenses.filter((element) => {
        return element.id !== rowID.current;
      })
    );
  }

  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          setAll(
            expenses.find((element) => {
              return element.id == rowID.current;
            })
          );
          setEdit({ ElementID: rowID.current, isEditing: true });

          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          DataFilter();

          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
