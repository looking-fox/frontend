import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: null, label: "None" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const PriorityMenu = ({ taskPriority }) => {
  const label = taskPriority
    ? taskPriority.charAt(0) + taskPriority.slice(1).toLowerCase()
    : "None";

  const defaultOption = { value: taskPriority, label };
  const [option, setOption] = useState(defaultOption);
  const handleChange = (option) => setOption(option);

  return <Select value={option} onChange={handleChange} options={options} />;
};

export default PriorityMenu;
