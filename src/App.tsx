import { useEffect, useState } from "react"
import type { GithubIssue } from "./types/github"
import type { Filters } from "./types/filters.ts"
import { fetchIssues } from "./services/githubService"
import Pagination from "./components/Pagination.tsx"
import {useSearchParams } from "react-router-dom"
import {useTheme} from "./hooks/useTheme"


function App() {

  const [issues, setIssues] = useState<GithubIssue[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const [totalCount, setTotalCount] = useState<number>(0)
  const perPage = 20

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const language = searchParams.get("language") || ""
  const search = searchParams.get("search") || ""
  const {theme, toggleTheme} = useTheme()

  const filters: Filters = {
    page,
    perPage,
    language: language || undefined,
    search: search || undefined,
  }

  useEffect(() => {
    const loadIssues = async() => {
      try {
        setLoading(true)
        const data = await fetchIssues(filters)
        setIssues(data.items)
        setTotalCount(data.total_count)
      } catch (error:any) {
        setError("Something went wrong")
        console.error(error.message)
      } finally{
        setLoading(false)
      }
    }

    loadIssues()
  }, [page, language, search])

  const totalPages = Math.ceil(totalCount/perPage)

  if(loading) {
    return <div className="p-10 text-xl">Loading issues...</div>
  }

  if(error) {
    return <div className="p-10 text-red-500">{error}</div>
  }

  return (
    <>
    {/* Issues */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10 transition-colors">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Good First Issues Explorer 🚀
  </h1>

  <button
    onClick={toggleTheme}
    className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>

<div className="flex flex-col md:flex-row gap-4 mb-6">

{/* 🔎 Search Input */}
<input
  type="text"
  placeholder="Search issues..."
  value={search}
  onChange={(e) => {
    const params = new URLSearchParams(searchParams)
    params.set("search", e.target.value)
    params.set("page", "1") // reset page when filtering
    setSearchParams(params)
  }}
  className="px-4 py-2 border rounded w-full md:w-1/3
    bg-white dark:bg-gray-800"
/>

{/* 🏷 Language Dropdown */}
<select
  value={language}
  onChange={(e) => {
    const params = new URLSearchParams(searchParams)

    if (e.target.value) {
      params.set("language", e.target.value)
    } else {
      params.delete("language")
    }

    params.set("page", "1")
    setSearchParams(params)
  }}
  className="px-4 py-2 border rounded w-full md:w-1/4
    bg-white dark:bg-gray-800"
>
  <option value="">All Languages</option>
  <option value="typescript">TypeScript</option>
  <option value="javascript">JavaScript</option>
  <option value="python">Python</option>
  <option value="go">Go</option>
  <option value="java">Java</option>
</select>

{/* 🔄 Reset Button */}
<button
  onClick={() => setSearchParams({ page: "1" })}
  className="px-4 py-2 bg-red-500 text-white rounded"
>
  Reset
</button>

</div>

        <div className="space-y-4">
          {issues?.map(issue => (
            <div key={issue.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
              <p className="text-sm text-gray-500 mt-2">Opened by {issue.user.login}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setSearchParams({page: newPage.toString()})}
      />
    </>
  )
}

export default App
