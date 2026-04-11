import { NavLink } from "react-router-dom";

const TopNavbar = () => {

  return (
    <nav className="sticky top-0 border-b border-gray-500">
      <div className="h-16 bg-slate-900 px-2 font-mono">
        <div className="flex items-center justify-between">
          <h1 className="text-[#14e00d] font-semibold py-4 px-3 text-xl">
            [GOOD_FIRST_ISSUES]
          </h1>

          <div className="flex items-center justify-between gap-4 text-sm cursor-pointer">
            <NavLink to="/" className={({isActive}) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Home</NavLink>
            <NavLink to="/issues" className={({isActive}) => `hover:underline-offset-4 hover:underline ${isActive ? "text-green-500" : "text-gray-600"}`}>Issues</NavLink>

            {/* // TODO:  navlink destination to be updated  */}

            <NavLink to="bookmark" className={({ isActive }) => `hover:underline-offset-4 hover:underline pointer-events-none opacity-50 cursor-not-allowed ${isActive ? "text-green-500" : "text-gray-600"}`}>Bookmarks</NavLink>
          </div>

          <div className="flex items-end justify-between gap-3 text-[#14e00d]">
            {/* <div className="flex items-center justify-between">
              <label htmlFor="repo-search">
                <LuSearchCode className="border text-green-600 border-gray-700 text-2xl rounded-sm cursor-pointer"/>
              </label>
              <input
                id="repo-search"
                type="text"
                placeholder="$ grep issues --label='good-first-issues'"
                className="placeholder-green-800 border border-gray-700 bg-slate-900 rounded-sm px-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
            </div> */}
            <p className="hidden">[Session ID]</p>
            <p className="hidden">User Profile</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar