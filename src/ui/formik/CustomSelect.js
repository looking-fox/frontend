import React from "react";
import Select from "react-select";

const CustomSelect = ({ field, form, value, options = [], idName = "" }) => {
  const onChange = option => {
    form.setFieldValue(field.name, option[idName] || option.value);
  };

  const getValue = () => {
    if (options.length && !field.value) {
      //Update Form State with Default ID when Async Menu Items Load
      form.setFieldValue(field.name, options[0][idName]);
    }
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
