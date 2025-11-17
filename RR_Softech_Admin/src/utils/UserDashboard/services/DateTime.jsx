import React from "react";

const DateTime = ({ timestamp, format = "datetime" }) => {
  if (!timestamp) return "—";

  const date = new Date(timestamp);

  const options = {
    date: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
    datetime: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
  };

  return date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    ...options[format],
  });
};

export default DateTime;
