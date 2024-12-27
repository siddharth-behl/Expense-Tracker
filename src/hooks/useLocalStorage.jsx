import React, { useState, useEffect } from "react";

export default function useLocalStorage(key, initialState) {
  const [data, setData] = useState(initialState);

  let existingData;
  if (key == "sortCallback") {
    existingData = eval(localStorage.getItem(key));
  } else {
    existingData = JSON.parse(localStorage.getItem(key));
  }

  useEffect(() => {
    if (!existingData) {
      localStorage.setItem(key, JSON.stringify(initialState));
    } else {
      setData(existingData);
    }
  }, []);

  function updateLocalStorage(newData) {
    if (typeof newData == "function") {
      if (key == "sortCallback") {
        localStorage.setItem(key, newData.toString());
        setData(newData);
        return;
      }
      localStorage.setItem(key, JSON.stringify(newData(data)));

      setData(newData(data));
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(newData));

      setData(newData);
    }
  }

  return [data, updateLocalStorage];
}
