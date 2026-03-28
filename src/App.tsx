import { useEffect, useState, useRef } from "react"
import type { GithubIssue } from "./types/github"
import type { Filters } from "./types/filters.ts"
import { fetchIssues } from "./services/githubService"
import Pagination from "./components/Pagination.tsx"
import { useSearchParams } from "react-router-dom"
import { useTheme } from "./hooks/useTheme"
import { useDebounce } from "./hooks/useDebounce.ts"
import LanguageSelect from "./components/LanguageSelect.tsx"
import { formatDistanceToNow } from "date-fns"
import { FaGithub } from "react-icons/fa"
import ErrorMessage from "./components/ErrorMessage.tsx"
import EmptyState from "./components/EmptyState.tsx"
import SortSelect from "./components/SortSelect.tsx"
import { useAuth } from "./hooks/useAuth.ts"


function App() {

  const [issues, setIssues] = useState<GithubIssue[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [emptyFlag, setEmptyFlag] = useState<boolean>(false)

  const [totalCount, setTotalCount] = useState<number>(0)
  const perPage = 20

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const language = searchParams.get("language") || ""
  const search = searchParams.get("search") || ""
  const sort = searchParams.get("sort") || "newest"
  const { theme, toggleTheme } = useTheme()
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 500)

  const { user, loading: authLoading, authError, isConfigured, signInWithGithub, signOut } = useAuth()
  console.log("user: ", user)
  
  const filters: Filters = {
    page,
    perPage,
    language: language || undefined,
    search: search || undefined,
    sort: sort as any
  }

  const isInitialMount = useRef(true)

  useEffect(()=>{
    // Skip on initial mount to avoid resetting page on first render
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Don't touch the URL if it contains auth callback tokens
    if (window.location.hash.includes("access_token")) {
      return
    }

    const params = new URLSearchParams(searchParams)

    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    } else {
      params.delete("search")
    }

    params.set("page", "1")

    setSearchParams(params)
  }, [debouncedSearch])

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    const controller = new AbortController()
    const loadIssues = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchIssues(filters, controller.signal)
        setIssues(data.items)
        if (data.items.length === 0) {
          setEmptyFlag(true)
        }
        setTotalCount(data.total_count)
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        if (error instanceof Error) {
          setError(error.message)
        }
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    loadIssues()

    return () => {
      controller.abort()
    }
  }, [page, language, search, sort])

  const totalPages = Math.min(Math.ceil(totalCount/perPage),50)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg animate-pulse 
        bg-gradient-to-br from-gray-50 to-gray-200 
        dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-50">
        Loading issues...
      </div>
    )
  }

  if (error) {
    return (
      <ErrorMessage type={error as any} />
    )
  }

  if (!loading && emptyFlag) {
    return <EmptyState />
  }

  const languageColors: Record<string, string> = {
    typescript: "bg-blue-500",
    javascript: "bg-yellow-500",
    python: "bg-green-500",
    go: "bg-cyan-500",
    java: "bg-orange-500",
  }

  const toggleBookmark = async (issue: GithubIssue, isBookmarked: boolean) => {
    if (!user) {
      alert("Please login first")
      return
    }

    try {
      if (isBookmarked) {
        await removeBookmark(issue.id, user.id)
      } else {
        await addBookmark({
          user_id: user.id,
          issue_id: issue.id,
          repo_name: issue.repository_url,
          issue_title: issue.title,
          issue_url: issue.html_url
        })
      }
      // Reload bookmarks to ensure UI is in sync with database
      await loadBookmarks()
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
    }
  }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br 
        from-gray-50 to-gray-200 
        dark:from-gray-900 dark:to-gray-800 
        text-gray-900 dark:text-gray-100 
        transition-colors">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <div>
            <div className="flex items-center gap-4">
              <FaGithub className="text-4xl text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform duration-200" />
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                bg-clip-text text-transparent">
                Good First Issues
              </h1>
            </div>
  
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl border 
                  bg-white dark:bg-gray-800
                  shadow-sm hover:scale-105 transition-transform"
              >
                {theme === "dark" ? "☀ Light" : "🌙 Dark"}
              </button>

              <div className="flex items-center gap-3">
                {authError && (
                  <span className="text-xs text-red-500 max-w-[200px] truncate" title={authError}>
                    ⚠️ {authError}
                  </span>
                )}
                
                {!isConfigured ? (
                  <span className="text-xs px-3 py-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700">
                    ⚠️ Auth not configured
                  </span>
                ) : authLoading ? (
                  <span className="text-sm text-gray-400 animate-pulse">Loading...</span>
                ) : user ? (
                  <div className="flex items-center gap-3">
                    {user.user_metadata?.avatar_url && (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-2 border-purple-500"
                      />
                    )}
                    <span className="text-sm font-medium hidden md:inline">
                      {user.user_metadata?.user_name || user.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 rounded-xl border bg-red-500/10 hover:bg-red-500/20 
                        text-red-600 dark:text-red-400 border-red-300 dark:border-red-700
                        transition-all hover:scale-105 font-medium text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGithub}
                    className="px-4 py-2 rounded-xl border 
                      bg-gray-900 dark:bg-white
                      text-white dark:text-gray-900
                      hover:scale-105 transition-all font-medium text-sm
                      flex items-center gap-2 shadow-sm"
                  >
                    <FaGithub /> Login with GitHub
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">

            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search issues..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl border 
                  bg-white dark:bg-gray-800
                  focus:ring-2 focus:ring-blue-500
                  outline-none transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Language */}
            <LanguageSelect
              value={language}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams)

                if (value) {
                  params.set("language", value)
                } else {
                  params.delete("language")
                }

                params.set("page", "1")
                setSearchParams(params)
              }}
            />

            <SortSelect
              value={sort}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams)

                params.set("sort", value)
                params.set("page", "1")

                setSearchParams(params)
              }}
            />
            {/* Reset */}
            <button
              onClick={() => setSearchParams({ page: "1", sort: "newest" })}
              className="px-5 py-3 rounded-xl bg-red-500 
                hover:bg-red-600 transition 
                text-white font-medium shadow-sm"
            >
              Reset
            </button>

          </div>

          {/* Issues */}
          <div className="space-y-6">
            {issues?.map(issue => (
              <div
                key={issue.id}
                className="bg-white dark:bg-gray-800 
                  p-6 rounded-2xl shadow-md
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:underline"
                  >
                    {issue.title}
                  </a>

                  {language && (
                    <span
                      className={`text-xs text-white px-3 py-1 rounded-full font-medium ${languageColors[language] || "bg-gray-500"}`}
                    >
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </span>
                  )}

                </div>

                <div className="flex items-center justify-between">


                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      Opened by <span className="font-medium">{issue.user.login}</span>
                    </span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(issue.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <button onClick={() => toggleBookmark(issue, bookmarkedIds.has(issue.id))}>
                    {bookmarkedIds.has(issue.id) ? <FaRegBookmark /> : <FaBookmark />}
                  </button>



                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Pagination */}
      <div className="bg-gray-200 dark:bg-gray-800 py-2">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setSearchParams({ page: newPage.toString() })
          }
        />
      </div>

      {user ? <BookmarksWidget bookmarks={bookmarks || []} /> : null}

    </>
  )
}

export default App
