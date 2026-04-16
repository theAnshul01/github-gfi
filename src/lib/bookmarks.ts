import { supabase } from "../services/SupabaseClient"
import type { GithubIssue } from "../types/github"

export async function addBookmark(issue: GithubIssue){
    const { data : userData } = await supabase.auth.getUser()

    if(!userData.user){
        throw new Error("user not logged in")
    }

    const { error } = await supabase
                        .from("bookmarks")
                        .insert({
                            user_id: userData.user.id,
                            issue_id: issue.id,
                            issue_url: issue.html_url,
                            title: issue.title,
                            repo: issue.repository_url,
                            completed: false
                        })

    if(error){
        console.error(error)
    }
}

export async function removeBookmark(issue_id: number){
    const {error} = await supabase
                        .from("bookmarks")
                        .delete()
                        .eq("issue_id", issue_id)

    if(error){
        console.error("Error occurred while removing bookmark", error)
    }
}

export async function getBookmark(){
    const { data: userData } = await supabase.auth.getUser()
    if(!userData.user){
        throw new Error("User not logged in")
    }
    const { data , error } = await supabase
                                .from("bookmarks")
                                .select("*")
                                .order("created_at", {ascending: false})

    if(error){
        console.error(error)
    }

    // console.log("bookmarks data: ", data)

    return data
}

export async function toggleCompleted(id: string, completed: boolean){
    const { error } = await supabase
                        .from("bookmarks")
                        .update({completed})
                        .eq("id", id)

    if(error){
        console.error(error)
    }
}