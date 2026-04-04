// type of any good first issue from Github - https://api.github.com/search/issues?q=label:"good first issue"+state:open

export type GithubIssue = {
    id:number;
    title:string;
    html_url: string;
    created_at: string;
    repository_url: string;
    user: {
        login: string;
        avatar_url: string;
    };
    
}

// type of entire API response
export type GithubSearchResponse = {
    total_count: number;
    items: GithubIssue[];
}