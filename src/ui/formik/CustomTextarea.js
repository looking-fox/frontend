import React from "react";
import Textarea from "../Textarea";

const CustomTextarea = ({ field, form, placeholder = "" }) => {
  const onChange = event => {
    form.setFieldValue(field.name, event.target.value || "");
  };

  return (
    <Textarea
      name={field.name}
      value={field.value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default CustomTextarea;
