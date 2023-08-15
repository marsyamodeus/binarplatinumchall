import React from "react";

const MonthSelector = ({ chosenMonth, onChange }) => {
  const currentYear = new Date().getFullYear();
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(currentYear, index).toLocaleString("default", {
      month: "long",
    });
    const year = currentYear;
    return {
      value: index + 1,
      label: `${month} ${year}`,
    };
  });

  return (
    <select value={chosenMonth} onChange={onChange}>
      {monthOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
