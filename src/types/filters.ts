export type Filters = {
    page: number;
    perPage: number;
    language?: string;
    search?: string
    sort?: SortOption
}

export type SortOption = | "newest" | "oldest" | "most-commented" | "recently-updated"