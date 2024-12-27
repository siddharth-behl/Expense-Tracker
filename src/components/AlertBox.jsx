import React, { useEffect } from "react";

export default function AlertBox({ alert, setAlert }) {
  useEffect(() => {
    let id = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [alert]);
  return (
    <div style={{ marginBottom: 100 }}>
      {alert.role && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100vw",
            transform: "translateX(-1.7%)",
          }}
          className={`alert alert-${alert.role}`}
          role="alert"
        >
          {alert.role == "danger" ? "Error" : alert.role} : {alert.message}
        </div>
      )}
    </div>
  );
}
