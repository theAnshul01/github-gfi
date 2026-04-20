import { useEffect, useState } from "react"
import IssueCard from "../components/IssueCard"
import type { GithubIssue } from "../types/github"
import SpinnerElement from "../components/SpinnerElement"

const Home = () => {

    const [issues, setIssues] = useState<GithubIssue[]>([])
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const url = "https://api.github.com/search/issues?q=good+first+issue+state:open&sort=created"

    useEffect(() => {
        async function fetchIssues() {
            try {
                setLoading(true)
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("An error occurred")
                }
                const data = await response.json()
                // console.log(data)
                setIssues(data.items)
                setTotal(data.total_count)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIssues()
    }, [])

    return (
        <main className="bg-slate-950 ml-0 md:ml-64 font-mono min-h-lvh px-4 sm:px-6 pt-16 md:pt-6 py-6 sm:py-8 pb-10">
            <section>
                <header className="flex flex-col items-start gap-1 sm:gap-2">
                    <span className="text-[#1b8708] text-xs sm:text-sm font-light px-2">
                        $ cd ~/projects/good-first-issues
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl text-[#efecec] mx-0">
                        [OPEN_ISSUES]
                    </h1>
                </header>
                <div className="text-sm py-4 flex flex-wrap items-center gap-2 sm:gap-4 p-1">
                    <p className="bg-slate-800 text-[#6d6b6b] rounded-sm shadow-md text-xs p-1">
                        {`[ TOTAL_ISSUES: ${Math.floor(total / 1000)}k+ ]`}
                    </p>
                    <p className="bg-slate-800 text-[#1be32b] rounded-sm shadow-md text-xs p-1">
                        [ LATEST_ISSUES: 23 ]
                    </p>
                </div>
            </section>

            {loading && <div className="h-64 sm:h-96 w-full flex items-center justify-center">
                <SpinnerElement />
                </div>}
            {!loading && <section className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                {
                    issues.slice(0, 4)?.map((issue) =>(
                        <div className="w-full sm:w-[48%] lg:w-[30%]">
                            <IssueCard path={issue.html_url} 
                            title={issue.title} 
                            avatar={issue.user.avatar_url} 
                            author={issue.user.login}
                            created={issue.created_at} />
                        </div>
                    )
                )}
            </section>}
        </main>
    )
}

export default Home