import apiClient from "./axiosClient";

export default {
    searchRepositories: (query,language) => {
        // return apiClient.get(`?q=${query}+language:${language}&sort=stars&order=desc`)
        return apiClient.get("/repositories",{params: {q: `${query}+language:${language}`, sort: "stars", order: "desc"}})
    }
}