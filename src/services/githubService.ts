import type { Filters } from "../types/filters";
import type { GithubSearchResponse } from "../types/github";

const buildQuery = (filters: Filters): string => {
    const baseQuery = `label:"good first issue"+state:open`

    const languageQuery = filters.language
    ? `+language:${filters.language}`
    : ""

    const searchQuery = filters.search
    ? `+${filters.search}`
    : ""

    return `${baseQuery}${languageQuery}${searchQuery}`
}

const sortMap = {
    newest : { sort: "created", order: "desc"},
    oldest : { sort: "created", order: "asc"},
    "most-commented" : { sort: "comments", order: "desc"},
    "recently-updated" : { sort: "updated", order: "desc"}
}

export const fetchIssues = async (
    filters: Filters,
    signal?: AbortSignal
): Promise<GithubSearchResponse> => {

    const query = buildQuery(filters)

    const sortParams = filters.sort 
    ? sortMap[filters.sort]
    : { sort: "created", order: "desc"}

    const url = `https://api.github.com/search/issues?q=${query}&sort=${sortParams.sort}&order=${sortParams.order}&page=${filters.page}&per_page=${filters.perPage}`
    try{
        const response = await fetch(url, {signal})
        
        if(!response.ok){
            if(response.status === 403){
                throw new Error("RATE_LIMIT")
            }
            throw new Error("API_ERROR")
        }
        return response.json() as Promise<GithubSearchResponse>
    }catch(error){
        if(error instanceof Error){
            throw error
        }

        throw new Error("NETWORK_ERROR")
    }
 
}