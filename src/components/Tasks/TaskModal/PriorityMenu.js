import React, { useState } from "react";
import Select from "react-select";
import theme from "../../../ui/theme/theme";

const options = [
  { value: null, label: "None" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
  }),

  option: (provided, state) => {
    const background = state.isFocused ? theme.lightGrey : "white";

    return { ...provided, color: "#777777", background };
  },

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const PriorityMenu = ({ taskPriority }) => {
  const label = taskPriority
    ? taskPriority.charAt(0) + taskPriority.slice(1).toLowerCase()
    : "None";

  const defaultOption = { value: taskPriority, label };
  const [option, setOption] = useState(defaultOption);
  const handleChange = (option) => setOption(option);

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
