import React from "react";
import Select from "react-select";

const CustomSelect = ({ field, form, options = [], idName = "" }) => {
  const onChange = option => {
    form.setFieldValue(field.name, option[idName] || option.value);
  };

  const getValue = () => {
    return options.find(option => option.value === field.value) || options[0];
  };

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
    />
  );
};

export default CustomSelect;
