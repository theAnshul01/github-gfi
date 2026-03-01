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

export const fetchIssues = async (
    filters: Filters,
    signal?: AbortSignal
): Promise<GithubSearchResponse> => {

    const query = buildQuery(filters)

    const url = `https://api.github.com/search/issues?q=${query}&page=${filters.page}&per_page=${filters.perPage}`

    const response = await fetch(url, {signal})

    if(!response.ok){
        throw new Error("Failed to fetch issues")
    }

    return response.json() as Promise<GithubSearchResponse>
}