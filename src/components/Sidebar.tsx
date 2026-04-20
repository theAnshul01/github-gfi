import { MdTerminal, MdMenu, MdClose} from "react-icons/md";
import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiPython, SiGo } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const Sidebar = () => {

  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false)

  const language = searchParams.get("language")
  const label = searchParams.get("label")

  const active = "flex items-center gap-2 text-[#14e00d]"
  const inactive = "flex items-center gap-2 text-gray-700"

  const linkClass = (cond :boolean):string => (cond ? active : inactive)

  return (
    <>
        {/* mobile code */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-[#14e00d] fixed top-16 left-0 w-full z-20">
        <h1 className="flex items-center gap-2 text-sm">
          <MdTerminal /> GFI
        </h1>

        <button onClick={() => setOpen(true)}>
          <MdMenu size={24} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 text-[#14e00d] p-4 font-mono border-r border-gray-500
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-16 md:h-[calc(100vh-64px)]
        `}
      >
       {/* Close button (mobile) */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h1 className="flex items-center gap-2">
            <MdTerminal /> MENU
          </h1>
          <button onClick={() => setOpen(false)}>
            <MdClose size={22} />
          </button>
        </div>

        {/* Header */}
        <div className="hidden md:block">
          <h1 className="flex items-center gap-2">
            <MdTerminal /> [DIRECTORY_TREE]
          </h1>
          <p className="italic text-sm font-light text-green-700">
            root@user:~/github-gfi
          </p>
        </div>

        {/* Links */}
        <div className="mt-6 md:mt-20 flex flex-col gap-2">
          <NavLink
            to="/issues?page=1&per_page=20"
            className={linkClass(!language && !label)}
            onClick={() => setOpen(false)}
          >
            <FaFolder /> /BIN/ALL
          </NavLink>

          <NavLink
            to="/issues?language=rust&page=1&per_page=20"
            className={linkClass(language === "rust")}
            onClick={() => setOpen(false)}
          >
            <MdTerminal /> /LIB/RUST
          </NavLink>

          <NavLink
            to="/issues?language=python&page=1&per_page=20"
            className={linkClass(language === "python")}
            onClick={() => setOpen(false)}
          >
            <SiPython /> /SRC/PYTHON
          </NavLink>

          <NavLink
            to="/issues?language=javascript&page=1&per_page=20"
            className={linkClass(language === "javascript")}
            onClick={() => setOpen(false)}
          >
            <SiJavascript /> /SRC/JAVASCRIPT
          </NavLink>

          <NavLink
            to="/issues?language=typescript&page=1&per_page=20"
            className={linkClass(language === "typescript")}
            onClick={() => setOpen(false)}
          >
            <SiTypescript /> /SRC/TYPESCRIPT
          </NavLink>

          <NavLink
            to="/issues?language=java&page=1&per_page=20"
            className={linkClass(language === "java")}
            onClick={() => setOpen(false)}
          >
            <FaJava /> /SRC/JAVA
          </NavLink>

          <NavLink
            to="/issues?language=go&page=1&per_page=20"
            className={linkClass(language === "go")}
            onClick={() => setOpen(false)}
          >
            <SiGo /> /SRC/GO
          </NavLink>
        </div>
      </aside>
    </>
  )
}

export default Sidebar