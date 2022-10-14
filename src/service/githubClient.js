import apiClient from "./axiosClient";
import apiClient2 from "./apiClient2";

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
    },
    getLOCData: (owner,repo) => {
        return apiClient2.get(`?github=${owner}/${repo}`)
    }
}