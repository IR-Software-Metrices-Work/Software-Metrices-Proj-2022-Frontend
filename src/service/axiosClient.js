import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://api.github.com/search",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export default apiClient;
