export interface Bookmark {
    id?: string;
    user_id: string;
    issue_id: number;
    issue_url: string;
    repo: string;
    title :string;
    completed: boolean;
    created_at?: string;
}