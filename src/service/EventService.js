import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://api.github.com/repos/vmg/redcarpet/issues?state=closed",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

