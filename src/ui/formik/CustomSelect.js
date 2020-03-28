import React from "react";
import Select from "react-select";
import styled from "styled-components";

const CustomSelect = ({ field, form, options = [], idName = "" }) => {
  // Sets field value to integer ID associated with idName prop
  // Example: "wfId" is 91, so field.value === 91

  const onChange = option => {
    form.setFieldValue(field.name, option[idName] || option.value);
  };

  const getValue = () => {
    if (options.length && !field.value) {
      //Update Form State with Default ID when Async Menu Items Load
      form.setFieldValue(field.name, options[0][idName]);
    }
    return options.find(option => option[idName] === field.value) || options[0];
  };

  return (
    <StySelect
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
    />
  );
};

const StySelect = styled(Select)`
  margin: 10px 0px;
`;

export default CustomSelect;
