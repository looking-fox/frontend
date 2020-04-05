export function generateFormState(form) {
  const initialFormState = {};
  if (form.formFields) {
    form.formFields.map((field) => {
      initialFormState[`formFieldTitle-${field.formFieldId}`] =
        field.formFieldTitle;
      initialFormState[`formFieldDescription-${field.formFieldId}`] =
        field.formFieldDescription;
      initialFormState[`formFieldPlaceholder-${field.formFieldId}`] =
        field.formFieldPlaceholder;
      initialFormState["formTitle"] = form.formTitle || "New Form";
    });
  }
  // Handle empty form fields
  if (form.formFields && !form.formFields.length) {
    initialFormState["formTitle"] = "";
  }
  return initialFormState;
}
