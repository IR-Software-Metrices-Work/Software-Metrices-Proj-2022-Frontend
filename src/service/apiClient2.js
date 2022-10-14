import axios from "axios"

const apiClient2 = axios.create({
    baseURL: "https://api.codetabs.com/v1/loc",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export default apiClient2;
