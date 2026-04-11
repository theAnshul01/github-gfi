import { MdTerminal } from "react-icons/md";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiPython, SiGo } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const Sidebar = () => {

  const [searchParams] = useSearchParams()

  const language = searchParams.get("language")
  const label = searchParams.get("label")

  const active = "flex items-center gap-2 text-[#14e00d]"
  const inactive = "flex items-center gap-2 text-gray-700"

  return (
    <aside className="w-64 h-[calc(100vh-60px)] bg-slate-900 text-[#14e00d] fixed left-0 top-16 p-4 font-mono border-r border-t border-gray-500">
      <div>
        <h1 className="flex items-center gap-2"><MdTerminal />[DIRECTORY_TREE]</h1>
        <p className="italic text-sm font-light text-green-700">root@user:~/github-gfi</p>
      </div>

      <div className="mt-20 flex flex-col gap-1">
        <NavLink to="/issues?page=1&per_page=20"
          className={!language && !label ? active : inactive}
        ><FaFolder /> <p>/BIN/ALL </p></NavLink>
        <NavLink to="/issues?language=rust&page=1&per_page=20" className={language === "rust" ? active : inactive}> <MdTerminal /> <p> /LIB/RUST </p></NavLink>
        <NavLink to="/issues?language=python&page=1&per_page=20" className={language === "python" ? active : inactive }> <SiPython /> <p>  /SRC/PYTHON </p></NavLink>
        <NavLink to="/issues?language=javascript&page=1&per_page=20" className={language === "javascript" ? active : inactive }> <SiJavascript /> <p>  /SRC/JAVASCRIPT </p></NavLink>
        <NavLink to="/issues?language=typescript&page=1&per_page=20" className={language === "typescript" ? active : inactive }> <SiTypescript /> <p>  /SRC/TYPESCRIPT </p></NavLink>
        <NavLink to="/issues?language=java&page=1&per_page=20" className={language === "java" ? active : inactive }> <FaJava /> <p>  /SRC/JAVA </p></NavLink>
        <NavLink to="/issues?language=go&page=1&per_page=20" className={language === "go" ? active : inactive }> <SiGo /> <p>  /SRC/GO </p></NavLink>
      </div>
    </aside>
  )
}

export default Sidebar