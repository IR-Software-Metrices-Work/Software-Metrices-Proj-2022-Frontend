import apiClient from "./axiosClient";

export default {
    searchRepositories: (query,language) => {
        return apiClient.get(
            "search/repositories",
            {
                params: {
                    q: `${query}+language:${language}`,
                    sort: "stars",
                    order: "desc"
                }
            }
        )
    },
    getRepository: (owner,repo) => {
        return apiClient.get(`repos/${owner}/${repo}`)
    }
}