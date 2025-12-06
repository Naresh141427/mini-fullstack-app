import axios from "axios";

const api = axios.create({
    baseURL: "https://mini-fullstack-app.onrender.com/api",
});

export default api;
