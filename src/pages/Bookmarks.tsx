import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FaBookmark, FaTrash, FaExternalLinkAlt, FaCode, FaExclamationTriangle } from "react-icons/fa"
import { MdRadioButtonUnchecked, MdOutlineCheckCircleOutline } from "react-icons/md";
// import { formatDistanceToNow, setSeconds } from "date-fns"
import SpinnerElement from "../components/SpinnerElement"
import { getBookmark, removeBookmark, toggleCompleted } from "../lib/bookmarks"
import type { GithubIssue } from "../types/github";


const Bookmarks = () => {
  const user = useAuth()
  const navigate = useNavigate()
  const [issues, setIssues] = useState<GithubIssue[]>([]) // TODO: fix the type

  useEffect(() => {
    async function fetchBookmarks() {
      const data = await getBookmark()
      setIssues(data || [])
    }

    fetchBookmarks()
  }, [])

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigate("/")
      }, 5000)
      return () => clearTimeout(timer)
    }



  }, [user, navigate])

  async function deleteBookmark(issueId: number) {
    try {
      await removeBookmark(issueId)
      setIssues(prev => prev.filter((issue: GithubIssue) => issue.id != issueId))
    } catch (error) {
      console.error("Bookmark deletion failed")
    }
  }

  if (user === undefined) {
    return (
      <div className="bg-slate-950 min-h-[calc(100vh-4rem)] flex items-center justify-center font-mono">
        <SpinnerElement />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-slate-950 min-h-[calc(100vh-4rem)] flex items-center justify-center font-mono">
        <div className="text-center p-8 max-w-md">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-sm mb-2">$ error: ACCESS_DENIED</p>
          <h2 className="text-2xl text-[#efecec] mb-4">[ UNAUTHORIZED ]</h2>
          <p className="text-[#6d6b6b] mb-4">// You need to login to access bookmarks</p>
          <p className="text-[#6d6b6b] text-sm">// Redirecting to homepage in 5 seconds...</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-slate-800 hover:bg-slate-700 text-[#efecec] px-4 py-2 rounded-sm transition-colors border border-slate-600"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 font-mono min-h-[calc(100vh-4rem)]">
      <main className="ml-64 px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FaBookmark className="text-[#1be32b] text-xl" />
            <span className="text-[#1b8708] text-sm">$ ls ~/bookmarks/</span>
          </div>
          <h1 className="text-4xl text-[#efecec]">[ BOOKMARKS ]</h1>
          <p className="text-[#6d6b6b] text-sm mt-2">
                        // {issues.length} saved issues
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {issues.map((item: any, index: number) => (
            <div key={item.id} className="bg-slate-900 border border-slate-700 p-6 hover:border-[#1be32b] transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[#1be32b] text-xs bg-slate-800 px-2 py-1 rounded-sm">
                  #{String(index + 1).padStart(4, '0')}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[#6d6b6b] hover:text-red-500 transition-colors" onClick={() => deleteBookmark(item.id)}>
                    <FaTrash className="text-sm" />
                  </button>
                  <a href={item.path} target="_blank" className="text-[#6d6b6b] hover:text-[#1be32b] transition-colors">
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>

              <h3 className="text-[#efecec] text-lg mb-3 line-clamp-2 leading-snug">
                {item.title}
              </h3>

              {/* <div className="flex items-center gap-4 mb-4">
                                <span className="flex items-center gap-1 text-xs text-[#6d6b6b] bg-slate-800 px-2 py-1 rounded-sm">
                                    <FaCode className="text-[#1be32b]" />
                                    {item.language}
                                </span>
                            </div> */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                {/* <div className="flex items-center gap-2">
                                    <img src={item.avatar} alt={item.author} className="h-6 w-6 rounded-full" />
                                    <div>
                                        <p className="text-[#1be32b] text-xs">@{item.author}</p>
                                    </div>
                                </div> */}
                {/* <p className="text-[#6d6b6b] text-xs">
                                    {formatDistanceToNow(new Date(item.created), { addSuffix: true })}
                                </p> */}
                {/* <button onClick={() => toggleCompleted(item.id, !item.completed)}>
                  <p className="text-[#1b8708]">{item.completed ? (<span className="flex gap-2 items-center text-green-600">completed <MdOutlineCheckCircleOutline /></span>) : <span className="flex gap-2 items-center text-green-600">Not completed <MdRadioButtonUnchecked /></span>}</p>
                </button> */}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-900 border border-slate-700">
          <p className="text-[#6d6b6b] text-xs">
            <span className="text-[#1b8708]">$</span> echo "Browse issues and click bookmark icon to save them here"
          </p>
        </div>
      </main>
    </div>
  )
}

export default Bookmarks
