import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [isScrolling, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => !isScrolling && setScroll(true));
    return () => {
      window.removeEventListener("scroll");
    };
  }, [isScrolling]);

  return isScrolling;
};

export const useEffectExceptOnMount = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, [deps, func]);
};

export function isValidEmail(emailString) {
  const emailConditions = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailConditions.test(emailString);
}

export function checkForEmptyObject(objectToTest) {
  return !(
    Object.entries(objectToTest).length === 0 &&
    objectToTest.constructor === Object
  );
}

export function mergeFormChanges(form, formUpdates = {}, isDraft = false) {
  const formChangesById = {};
  if (!Object.entries(formUpdates).length) return form;
  Object.keys(formUpdates).map((item) => {
    const [field, formFieldId] = item.split("-");
    // must have ID
    if (!formFieldId) return null;
    // merge existing data related to formFieldId
    else if (formChangesById[formFieldId]) {
      formChangesById[formFieldId] = {
        ...formChangesById[formFieldId],
        ...{ [field]: formUpdates[item] },
      };
    } else {
      // create new formFieldId object to store values
      formChangesById[formFieldId] = { [field]: formUpdates[item] };
    }
    return null;
  });

  //--- merge changes to form ---//

  const prevFormFields = [...form.formFields];

  const newFormFields = prevFormFields.map((field) => {
    const currentId = field.formFieldId;
    const updates = formChangesById[currentId];
    const updatedField = { ...field, ...updates };
    return updatedField;
  });

  const newForm = { ...form };
  newForm.formFields = newFormFields;
  newForm.formTitle = formUpdates.formTitle;
  //--- merge changes to form ---//

  //--- handle draft specific data ---//
  if (isDraft && !newForm.formDraftOf) {
    delete newForm["formLink"];
    delete newForm["createdAt"];
    delete newForm["updatedAt"];
    newForm["formActive"] = false;
  }

  return newForm;
}
