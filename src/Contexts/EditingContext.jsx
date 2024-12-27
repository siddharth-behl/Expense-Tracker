import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const editContext = createContext();

export default function EditingContext({ children }) {
  const [edit, setEdit] = useLocalStorage('edit',{ ElementID: "", isEditing: false });

  return (
    <editContext.Provider value={[edit, setEdit]}>
      {children}
    </editContext.Provider>
  );
}
