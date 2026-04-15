import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import type { GithubIssue } from "../types/github"
import { formatDistanceToNow } from "date-fns"
import IssuePagePagination from "../components/IssuePagePagination"
import { useSearchParams } from "react-router-dom"
import SpinnerElement from "../components/SpinnerElement"
import Footer from "../components/Footer"
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { addBookmark } from "../lib/bookmarks"


const IssuesPage = () => {

    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState<string>("")
    const [debouncedSearch, setDebouncedSearch] = useState<string>("")

    const page = Number(searchParams.get("page")) || 1
    const perPage = Number(searchParams.get("per_page")) || 20
    const language = searchParams.get("language")
    const label = searchParams.get("label")
    const [loading, setLoading] = useState<boolean>(false)

    

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000)

        return () => clearTimeout(timer)
    }, [search])

    let query = "state:open"

    if (label) {
        query += `+label:${label}`
    } else {
        query += `+good-first-issue`
    }

    if (language) {
        query += `+language:${language}`
    }
    if (debouncedSearch) {
        query += `+${debouncedSearch}`
    }

    const [totalPage, setTotalPage] = useState<number>(0)

    const url = `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&page=${page}&per_page=${perPage}`
    const [issues, setIssues] = useState<GithubIssue[]>([])

    useEffect(() => {
        async function fetchIssues() {
            try {
                setLoading(true)
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("An error occurred while fetching issues")
                }
                const data = await response.json()
                setIssues(data.items)
                setTotalPage(Math.min(Math.ceil(data.total_count / perPage), 50))

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIssues()
    }, [page, perPage, language, label, debouncedSearch])

    return (
        <div className="bg-slate-950 py-2">
            <Sidebar />
            <main className="ml-64 bg-slate-950 min-h-lvh px-6 py-8 font-mono">
                <section>
                    <p className=" text-[#26de0e] text-sm mb-2"><span>$</span> cd ~/projects/good-first-issues && ls --all --sort=created</p>
                    <div className="flex items-center bg-slate-800 text-green-500 gap-2">
                        <p className="px-2 border-r border-slate-500">&gt;</p>
                        <label htmlFor="search" className="flex-1">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder=" FILTER_BY_METADATA..." className="w-full py-2 px-2 my-2 placeholder-slate-500 bg-slate-800 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </label>
                    </div>
                </section>

                {/* table */}
                <table className="w-full text-sm text-slate-400 mt-4">
                    <thead className="bg-slate-800 border-b border-1 border-slate-400 sticky top-[64px]">
                        <tr>
                            <th className="px-4 py-3">Id</th>
                            <th className="px-4 py-3">Issue</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">created</th>
                            <th className="px-4 py-3">bookmark</th>
                            <th className="px-4 py-3">Visit</th>
                        </tr>
                    </thead>

                    {loading && <div className="h-96 ml-64 w-full flex items-center justify-center"><SpinnerElement /></div>}
                    {!loading && <tbody>
                        {issues.map((issue) => (
                            <tr key={issue.id} className="hover:bg-gray-900">
                                <td className="px-4 py-3 text-right text-[#15e030]">#{String(issue.id).slice(-5)}</td>
                                <td className="px-4 py-3 text-left">{issue.title}</td>
                                <td className="flex items-center justify-start px-4 py-3 text-center gap-2 whitespace-nowrap truncate overflow-hidden"><img src={issue.user.avatar_url} alt="user_avatar" className="h-6 w-6 rounded-full" /> {issue.user.login}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{formatDistanceToNow(issue.created_at, { addSuffix: true })}</td>
                                <td className="text-center text-xl hover:text-[#11d11b]"> <button onClick={()=>addBookmark(issue)}> <IoBookmarkOutline /> </button>  </td>
                                <td className="text-2xl text-center hover:text-[#11d11b]"><a href={issue.html_url} target="_blank"> &rarr;</a></td>
                            </tr>
                        ))}
                    </tbody>}
                </table>


            </main>
            <section className="ml-64 bg-slate-950 mb-4">
                <IssuePagePagination
                    page={page}
                    totalPage={totalPage}
                    perPage={perPage}
                />
            </section>
            <Footer />
        </div>
    )
}

export default IssuesPage