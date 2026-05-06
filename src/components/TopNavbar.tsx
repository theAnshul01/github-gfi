import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdTerminal } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiPython, SiGo } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../services/SupabaseClient";
import { useState } from "react";

const TopNavbar = () => {
  const user = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const language = searchParams.get("language")

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/")
    setMenuOpen(false)
  }

  const sidebarLinks = [
    { to: "/issues?page=1&per_page=20", icon: <FaFolder />, label: "/BIN/ALL", activeKey: null },
    { to: "/issues?language=rust&page=1&per_page=20", icon: <MdTerminal />, label: "/LIB/RUST", activeKey: "rust" },
    { to: "/issues?language=python&page=1&per_page=20", icon: <SiPython />, label: "/SRC/PYTHON", activeKey: "python" },
    { to: "/issues?language=javascript&page=1&per_page=20", icon: <SiJavascript />, label: "/SRC/JAVASCRIPT", activeKey: "javascript" },
    { to: "/issues?language=typescript&page=1&per_page=20", icon: <SiTypescript />, label: "/SRC/TYPESCRIPT", activeKey: "typescript" },
    { to: "/issues?language=java&page=1&per_page=20", icon: <FaJava />, label: "/SRC/JAVA", activeKey: "java" },
    { to: "/issues?language=go&page=1&per_page=20", icon: <SiGo />, label: "/SRC/GO", activeKey: "go" },
  ]

  const activeClass = "flex items-center gap-2 text-sm text-[#14e00d]"
  const inactiveClass = "flex items-center gap-2 text-sm text-gray-700 hover:text-[#14e00d] transition-colors"

  return (
    <nav className="sticky top-0 border-b border-gray-500 z-50">
      <div className="h-16 bg-slate-900 px-2 font-mono">
        <div className="flex items-center justify-between">
          <h1 className="text-[#14e00d] font-semibold py-4 px-3 text-xl">
            [GOOD_FIRST_ISSUES]
          </h1>

          <div className="hidden lg:flex items-center justify-between gap-4 text-sm cursor-pointer">
            <NavLink to="/" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Home</NavLink>
            <NavLink to="/issues" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Issues</NavLink>
            <NavLink to="/bookmark" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Bookmarks</NavLink>
          </div>

          <div className="hidden lg:flex items-end justify-between gap-3 text-[#14e00d]">
            {user ? (
              <div className="flex items-center gap-2">
                <img src={user.user_metadata.avatar_url} className="h-8 w-8 rounded-full"></img>
                <button onClick={logout} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <FiLogOut className="text-lg" />
                  <span className="text-sm">[LOGOUT]</span>
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={({ isActive }) => `flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer ${isActive ? "text-green-500" : "text-[#14e00d]"}`}>
                <FiLogIn className="text-lg cursor-pointer" />
                <span className="text-sm">[LOGIN]</span>
              </NavLink>
            )}
          </div>

          <button className="lg:hidden text-[#14e00d] text-2xl p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-gray-500 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            <div className="flex flex-col gap-3">
              <NavLink to="/" className={({ isActive }) => `text-sm hover:underline ${isActive ? "text-green-500" : "text-gray-400"}`} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/issues" className={({ isActive }) => `text-sm hover:underline ${isActive ? "text-green-500" : "text-gray-400"}`} onClick={() => setMenuOpen(false)}>Issues</NavLink>
              <NavLink to="/bookmark" className={({ isActive }) => `text-sm hover:underline ${isActive ? "text-green-500" : "text-gray-400"}`} onClick={() => setMenuOpen(false)}>Bookmarks</NavLink>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-xs text-green-700 mb-2 flex items-center gap-2"><MdTerminal /> [DIRECTORY_TREE]</p>
              <div className="flex flex-col gap-2">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={link.activeKey === language || (link.activeKey === null && !language) ? activeClass : inactiveClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.icon} {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              {user ? (
                <div className="flex items-center gap-2 text-[#14e00d]">
                  <img src={user.user_metadata.avatar_url} className="h-6 w-6 rounded-full"></img>
                  <button onClick={logout} className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors">
                    <FiLogOut /> [LOGOUT]
                  </button>
                </div>
              ) : (
                <NavLink to="/login" className={({ isActive }) => `flex items-center gap-2 text-sm ${isActive ? "text-green-500" : "text-[#14e00d]"} hover:text-green-400 transition-colors`} onClick={() => setMenuOpen(false)}>
                  <FiLogIn /> [LOGIN]
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default TopNavbar