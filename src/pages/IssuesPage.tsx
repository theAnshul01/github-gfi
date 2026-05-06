import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import type { GithubIssue } from "../types/github"
import { formatDistanceToNow } from "date-fns"
import IssuePagePagination from "../components/IssuePagePagination"
import { useSearchParams } from "react-router-dom"
import SpinnerElement from "../components/SpinnerElement"
import Footer from "../components/Footer"
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { addBookmark, getBookmark, removeBookmark } from "../lib/bookmarks"
import { useAuth } from "../hooks/useAuth"
import ErrorMessage from "../components/ErrorMessage"


const IssuesPage = () => {

    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState<string>("")
    const [debouncedSearch, setDebouncedSearch] = useState<string>("")

    const page = Number(searchParams.get("page")) || 1
    const perPage = Number(searchParams.get("per_page")) || 20
    const language = searchParams.get("language")
    const label = searchParams.get("label")
    const [loading, setLoading] = useState<boolean>(false)
    const [bookmarkedIssues, setBookmarkedIssues] = useState<Set<number>>(new Set())
    const [showError, setShowError] = useState<boolean>(false)
    const [emptySearch, setEmptySearch] = useState<boolean>(false)
    const user = useAuth()

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
    const [apiError, setApiError] = useState<boolean>(false)

    const url = `/api/issues?q=${query}&page=${page}&per_page=${perPage}`
    const [issues, setIssues] = useState<GithubIssue[]>([])

    useEffect(() => {
        async function fetchIssues() {
            setEmptySearch(false)
            setApiError(false)
            try {
                setLoading(true)
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("An error occurred while fetching issues")
                }
                const data = await response.json()
                if(data.items.length === 0){
                    setEmptySearch(true)
                }
                setIssues(data.items)
                setTotalPage(Math.min(Math.ceil(data.total_count / perPage), 50))

            } catch (error) {
                console.error(error)
                setApiError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchIssues()
    }, [page, perPage, language, label, debouncedSearch])

    useEffect(() => {
        async function loadBookmarks() {
            const data = await getBookmark()
            
            if (data) {
                const ids = new Set<number>(
                    data.map(b => Number(b.issue_id))
                )

                setBookmarkedIssues(ids)
            }
        }

        loadBookmarks()
    }, [])

    async function handleBookmark(issue: GithubIssue) {
        if(!user){
            setShowError(true)
            return;
        }

        const issueId = issue.id
        const isBookmarked = bookmarkedIssues.has(issueId)

        setBookmarkedIssues(prev => {
            const newSet = new Set(prev)
            if (isBookmarked) {
                newSet.delete(issueId)
            } else {
                newSet.add(issueId)
            }

            return newSet
        })

        try {
            if (!isBookmarked) {
                await addBookmark(issue)
            } else {
                await removeBookmark(issue.id)
            }
        } catch (error) {
            console.error("Bookmark failed: ", error)

            // UI Rollback
            setBookmarkedIssues(prev => {
                const newSet = new Set(prev)

                if (isBookmarked) {
                    newSet.add(issueId)
                } else {
                    newSet.delete(issueId)
                }
                return newSet
            })
        }
    }

    return (
        <div className="bg-slate-950 py-2">
            {showError && <ErrorMessage message="Login needed for bookmarking the issue!" setShowError={setShowError}/>}
            <Sidebar />
            <main className="lg:ml-64 bg-slate-950 min-h-lvh px-6 py-8 font-mono pb-20">
                <section>
                    <p className=" text-[#26de0e] text-sm mb-2"><span>$</span> cd ~/projects/good-first-issues && ls --all --sort=created</p>
                    <div className="flex items-center bg-slate-800 text-green-500 gap-2">
                        <p className="px-2 border-r border-slate-500">&gt;</p>
                        <label htmlFor="search" className="flex-1">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder=" FILTER_BY_METADATA..." className="w-full py-2 px-2 my-2 placeholder-slate-500 bg-slate-800 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </label>
                    </div>
                </section>

                {emptySearch && (
                    <div className="flex flex-col items-center justify-center py-20 font-mono">
                        <div className="border border-green-500/30 bg-green-500/5 p-8 rounded-lg max-w-md">
                            <div className="text-green-500 text-6xl mb-4 text-center">∅</div>
                            <p className="text-gray-300 text-lg mb-2">
                                <span className="text-green-500">[</span> No issues found <span className="text-green-500">]</span>
                            </p>
                            <p className="text-gray-500 text-sm">
                                {search ? (
                                    <>No results for query: <span className="text-yellow-500">"{search}"</span></>
                                ) : (
                                    <>Try selecting a different programming language or adjust your filters.</>
                                )}
                            </p>
                        </div>
                    </div>
                )}

                {apiError && (
                    <div className="flex flex-col items-center justify-center py-20 font-mono">
                        <div className="border border-red-500/30 bg-red-500/5 p-8 rounded-lg max-w-md">
                            <div className="text-red-500 text-6xl mb-4 text-center">!</div>
                            <p className="text-gray-300 text-lg mb-2">
                                <span className="text-red-500">[</span> Failed to load issues <span className="text-red-500">]</span>
                            </p>
                            <p className="text-gray-500 text-sm">Unable to connect to the API. Try again later or check your connection.</p>
                        </div>
                    </div>
                )}
                {!emptySearch && !apiError && (
                    <>
                        <div className="lg:hidden space-y-3 mt-4">
                            {loading && <div className="h-96 w-full flex items-center justify-center"><SpinnerElement /></div>}
                            {!loading && issues.map((issue) => (
                                <div key={issue.id} className="bg-slate-800 border border-slate-700 rounded-sm p-4 flex items-center gap-4">
                                    <span className="text-[#15e030] text-sm whitespace-nowrap">#{String(issue.id).slice(-5)}</span>
                                    <a href={issue.html_url} target="_blank" className="flex-1 text-left text-sm text-slate-300 hover:text-[#14e00d] transition-colors line-clamp-2">
                                        {issue.title}
                                    </a>
                                    <button
                                        onClick={(e) => { e.preventDefault(); handleBookmark(issue); }}
                                        className="text-xl text-slate-400 hover:text-[#11d11b] transition-colors flex-shrink-0"
                                    >
                                        {bookmarkedIssues.has(issue.id) ? <IoBookmark /> : <IoBookmarkOutline />}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:block overflow-x-auto max-h-[calc(100vh-64px-80px)] overflow-y-auto"><table className="w-full text-sm text-slate-400 mt-4">
                            <thead className="bg-slate-800 border-b border-1 border-slate-400 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3">Id</th>
                                    <th className="px-4 py-3">Issue</th>
                                    <th className="px-4 py-3">Author</th>
                                    <th className="px-4 py-3">created</th>
                                    <th className="px-4 py-3">bookmark</th>
                                    <th className="px-4 py-3">Visit</th>
                                </tr>
                            </thead>

                            {loading && <tbody><tr><td colSpan={6} className="py-20"><div className="flex items-center justify-center"><SpinnerElement /></div></td></tr></tbody>}
                            {!loading &&  <tbody>
                                {issues.map((issue) => (
                                    <tr key={issue.id} className="hover:bg-gray-900">
                                        <td className="px-4 py-3 text-right text-[#15e030]">#{String(issue.id).slice(-5)}</td>
                                        <td className="px-4 py-3 text-left">{issue.title}</td>
                                        <td className="flex items-center justify-start px-4 py-3 text-center gap-2 whitespace-nowrap truncate overflow-hidden"><img src={issue.user.avatar_url} alt="user_avatar" className="h-6 w-6 rounded-full" /> {issue.user.login}</td>
                                        <td className="px-4 py-3 text-center whitespace-nowrap">{formatDistanceToNow(issue.created_at, { addSuffix: true })}</td>
                                        <td className="text-center text-xl hover:text-[#11d11b]"> <button onClick={() => handleBookmark(issue)}> {
                                            bookmarkedIssues.has(issue.id)
                                                ? <IoBookmark />
                                                : <IoBookmarkOutline />
                                        }</button>  </td>
                                        <td className="text-2xl text-center hover:text-[#11d11b]"><a href={issue.html_url} target="_blank"> &rarr;</a></td>
                                    </tr>
                                ))}
                            </tbody>}
                        </table></div>
                    </>
                )}


            </main>
            <section className="lg:ml-64 bg-slate-950 mb-4">
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