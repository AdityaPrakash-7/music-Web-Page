import React, { useEffect } from "react";

function Notification({ message, type = "success" }) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };

  return (
    <div className={`notification ${type}`}>
      <i className={`fas ${icons[type] || icons.success}`}></i>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
