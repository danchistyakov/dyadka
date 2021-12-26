import React from "react";

const formatTime = (data) => {
  if (isNaN(data)) {
    return "0:00";
  }
  const date = new Date(data * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds =
    date.getUTCSeconds() < 10
      ? "0" + date.getUTCSeconds()
      : date.getUTCSeconds();

  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export default formatTime;
