import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.lookingfox.com"
      : "http://localhost:3025",
  withCredentials: true
});

export default {
  authentication: {
    checkAuthenticationStatus: () => client.get("/authentication/status"),
    login: uid => client.post("/authentication/login", { uid }),
    logout: () => client.get("/authentication/logout"),
    signUp: user => client.post("/authentication/signup", { user })
  },
  workflow: {
    getWorkflows: () => client.get("/workflows/"),
    addWorkflow: workflow => client.post("/workflows/new", workflow),
    updateWorkflow: workflow => client.put("/workflows/update", workflow),
    archiveWorkflow: wfId => client.put(`/workflows/archive/${wfId}`)
  },
  client: {
    getClients: () => client.get("/clients/"),
    updateClientProgress: clientInfo =>
      client.put("/clients/progress", clientInfo),
    addClient: newClient => client.post("/client/new", newClient)
  },
  form: {
    getForms: () => client.get("/forms/"),
    addNewForm: newForm => client.post("/forms/", newForm),
    updateForm: (formId, updatedForm) =>
      client.put(`/forms/${formId}`, updatedForm)
  }
};
