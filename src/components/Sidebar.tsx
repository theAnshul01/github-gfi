import { MdTerminal } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { MdOutlineCode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const Sidebar = () => {
  return (
      <aside className="w-64 h-[calc(100vh-60px)] bg-slate-900 text-[#14e00d] fixed left-0 top-16 p-4 font-mono">
        <div>
            <h1 className="flex items-center gap-2"><MdTerminal/>[DIRECTORY_TREE]</h1>
            <p className="italic text-sm font-light text-green-700">root@user:~/github-gfi</p>
        </div>

        <div className="mt-20 flex flex-col gap-1">
              <NavLink to="" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-[#14e00d]" : "text-gray-700"}`}><FaFolder /> <p>/BIN/ALL </p></NavLink>
              <NavLink to="/rust" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-[#14e00d]" : "text-gray-700"}`}> <MdTerminal /> <p> /LIB/RUST </p></NavLink>
              <NavLink to="/python" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-[#14e00d]" : "text-gray-700"}`}> <MdOutlineCode /> <p>  /SRC/PYTHON </p></NavLink>
              <NavLink to="/wanted" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-[#14e00d]" : "text-gray-700"}`}> <FaDollarSign /> <p> /VAR/HELP-WANTED </p></NavLink>
              <NavLink to="/timers" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-[#14e00d]" : "text-gray-700"}`}> <FaUser /> <p> /USR/FIRST-TIMERS </p></NavLink>
        </div>
    </aside>
  )
}

export default Sidebar