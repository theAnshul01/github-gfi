export interface Bookmark {
    id?: string;
    user_id: string;
    issue_id: number;
    repo_name: string;
    issue_title :string;
    issue_url : string;
    created_at?: string;
}