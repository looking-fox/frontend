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
    login: uid => client.post("/authentication/login", { userId: uid }),
    logout: () => client.get("/authentication/logout")
  }
};