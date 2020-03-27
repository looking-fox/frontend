import React from "react";
import Textarea from "../Textarea";

const CustomTextarea = ({ field, form }) => {
  const onChange = event => {
    form.setFieldValue(field.name, event.target.value || "");
  };

  return <Textarea name={field.name} value={field.value} onChange={onChange} />;
};

export default CustomTextarea;
