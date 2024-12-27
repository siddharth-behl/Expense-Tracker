import { useState } from "react";
export default function FilteredData(alldata, callback) {
  const [typeFilter, setTypeFilter] = useState("");
  return [
    alldata.filter((data) =>
      callback(data).toLowerCase().includes(typeFilter.toLowerCase())
    ),
    setTypeFilter,
  ];
}
