export function isValidEmail(emailString) {
  const emailConditions = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailConditions.test(emailString);
}

export function checkForEmptyObject(objectToTest) {
  return (
    Object.entries(objectToTest).length === 0 &&
    objectToTest.constructor === Object
  );
}
