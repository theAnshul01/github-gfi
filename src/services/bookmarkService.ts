import type { Bookmark } from "../types/bookmarks"
import { supabase } from "./SupabaseClient"

export const addBookmark = async (bookmark: Bookmark) => {
    const { data, error } = await supabase
                            .from("bookmarks")
                            .insert([bookmark])

    if(error) throw error
    return data
}

export const removeBookmark = async (issue_id: number, user_id: string) => {
    const { error } = await supabase
                        .from("bookmarks")
                        .delete()
                        .eq("issue_id", issue_id)
                        .eq("user_id", user_id)

    if(error) throw error

}

export const getBookmarks = async (user_id: string) => {
    const {data, error} = await supabase
                            .from("bookmarks")
                            .select("*")
                            .eq("user_id", user_id)

    if(error) throw error
    return data
}