import React, { useState } from "react";
import Select from "react-select";
import theme from "../../../ui/theme/theme";

const options = [
  { value: null, label: "None", color: theme.colors.neutral },
  { value: "LOW", label: "Low", color: theme.colors.blue },
  { value: "MEDIUM", label: "Medium", color: theme.colors.purple },
  { value: "HIGH", label: "High", color: theme.colors.red },
];

const customStyles = {
  container: (base) => ({
    ...base,
    // width: "150px",
  }),
  control: (base) => ({
    ...base,
    border: "1px solid #CCCCCC",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #CCCCCC",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? theme.colors.lightGrey : "white",
    color: "#777777",
  }),
  singleValue: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: "opacity 300ms",
    background: state.data.color,
    color: "white",
    borderRadius: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    padding: "5px",
  }),
};

const PriorityMenu = ({ taskPriority, handlePriorityChange }) => {
  const label = taskPriority
    ? taskPriority.charAt(0) + taskPriority.slice(1).toLowerCase()
    : "None";

  const idx = options.findIndex((item) => item.value === taskPriority);
  const defaultOption = options[idx];
  const [option, setOption] = useState(defaultOption);

  const handleChange = (option) => {
    setOption(option);
    handlePriorityChange(option.value);
  };

  return (
    <Select
      value={option}
      options={options}
      onChange={handleChange}
      styles={customStyles}
    />
  );
};

export default PriorityMenu;
