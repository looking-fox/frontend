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
    getWorkflows: () => client.get("/workflow/"),
    addWorkflow: workflow => client.post("/workflow/new", workflow),
    updateWorkflow: workflow => client.put("/workflow/update", workflow),
    archiveWorkflow: wfId => client.put(`/workflow/archive/${wfId}`)
  },
  client: {
    getClients: () => client.get("/client/"),
    updateClientProgress: clientInfo =>
      client.put("/client/progress", clientInfo),
    addClient: newClient => client.post("/client/new", newClient)
  }
};
