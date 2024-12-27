import React from "react";

export default function Input(props) {
  let { htmlfor, labelName, name, id, onChange, value } = props;
  return (
    <div className="input-container">
      <label htmlFor={htmlfor} style={{ color: "white" }}>{labelName}</label>
      <input
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        
      />
    </div>
  );
}
