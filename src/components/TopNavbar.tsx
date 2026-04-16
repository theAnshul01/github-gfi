import { NavLink, useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../services/SupabaseClient";

const TopNavbar = () => {
  const user = useAuth()
  // console.log("user: ", user)
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <nav className="sticky top-0 border-b border-gray-500">
      <div className="h-16 bg-slate-900 px-2 font-mono">
        <div className="flex items-center justify-between">
          <h1 className="text-[#14e00d] font-semibold py-4 px-3 text-xl">
            [GOOD_FIRST_ISSUES]
          </h1>

          <div className="flex items-center justify-between gap-4 text-sm cursor-pointer">
            <NavLink to="/" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Home</NavLink>
            <NavLink to="/issues" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Issues</NavLink>

            <NavLink to="/bookmark" className={({ isActive }) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Bookmarks</NavLink>
          </div>

          <div className="flex items-end justify-between gap-3 text-[#14e00d]">
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
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar