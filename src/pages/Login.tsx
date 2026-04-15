import { supabase } from "../services/SupabaseClient"
import { FaGithub, FaCode, FaLaptopCode, FaUsers, FaRocket, FaBook } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const user = useAuth()
    const navigate = useNavigate()

    const signInWithGithub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
        })
    }

    const logout = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    return (
        <div className="bg-slate-950 font-mono flex h-[calc(100vh-4rem)]">
            <main className="hidden lg:flex lg:w-1/2 bg-slate-900 border-r border-slate-700 p-6 flex-col justify-center">
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <span className="text-[#1b8708] text-xs font-light">$ cat README.md</span>
                        <h1 className="text-2xl text-[#efecec] mt-2 leading-tight">
                            Start Your <span className="text-[#1be32b]">Open Source</span> Journey
                        </h1>
                    </div>

                    <p className="text-[#6d6b6b] text-sm mb-4 leading-relaxed">
                        Good first issues are your gateway to contributing to real projects. 
                        Learn, practice, and make your first pull request today.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-800 p-3 rounded-sm">
                            <FaCode className="text-[#1be32b] text-lg mb-1" />
                            <h3 className="text-[#efecec] text-xs font-medium">Find Issues</h3>
                            <p className="text-[#6d6b6b] text-[10px] mt-1">Curated beginner-friendly tasks</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-sm">
                            <FaLaptopCode className="text-[#1be32b] text-lg mb-1" />
                            <h3 className="text-[#efecec] text-xs font-medium">Learn by Doing</h3>
                            <p className="text-[#6d6b6b] text-[10px] mt-1">Real code, real projects</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-sm">
                            <FaUsers className="text-[#1be32b] text-lg mb-1" />
                            <h3 className="text-[#efecec] text-xs font-medium">Join Community</h3>
                            <p className="text-[#6d6b6b] text-[10px] mt-1">Connect with contributors</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-sm">
                            <FaRocket className="text-[#1be32b] text-lg mb-1" />
                            <h3 className="text-[#efecec] text-xs font-medium">Grow Skills</h3>
                            <p className="text-[#6d6b6b] text-[10px] mt-1">Build your portfolio</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <FaBook className="text-[#1be32b] text-sm" />
                            <span className="text-[#efecec] text-xs">Getting Started</span>
                        </div>
                        <div className="text-[#6d6b6b] text-[10px] font-mono space-y-0.5">
                            <p>$ git clone https://github.com/...</p>
                            <p>$ npm install && git push</p>
                            <p className="text-[#1be32b]">$ pr --create</p>
                        </div>
                    </div>
                </div>
            </main>

            <section className="w-full lg:w-1/2 flex items-center justify-center h-full">
                <div className="bg-slate-900 border border-slate-700 p-8 w-full h-full">
                    <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                        <header className="mb-6">
                            <span className="text-[#1b8708] text-sm font-light">$ cd ~/good-first-issues</span>
                            <h2 className="text-2xl text-[#efecec] mt-2">{user ? "[ PROFILE ]" : "[ AUTHENTICATE ]"}</h2>
                        </header>

                        {
                            user ? (
                                <div className="flex flex-col items-start gap-4">
                                    <div className="bg-slate-800 p-4 rounded-sm w-full">
                                        <p className="text-[#6d6b6b] text-xs mb-1">// logged_in_as</p>
                                        <p className="text-[#1be32b] text-sm">{user.email}</p>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="flex items-center gap-2 bg-slate-800 hover:bg-red-900/50 text-[#efecec] px-4 py-2 rounded-sm transition-colors w-full justify-center border border-red-500/30 hover:border-red-500"
                                    >
                                        <span className="text-red-500">$</span> logout --force
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="bg-slate-800 p-4 rounded-sm">
                                        <p className="text-[#6d6b6b] text-xs mb-2">// sign_in_options</p>
                                        <p className="text-[#efecec] text-sm">Connect with GitHub to bookmark issues and track your progress.</p>
                                    </div>

                                    <button 
                                        onClick={signInWithGithub}
                                        className="flex items-center gap-3 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-3 rounded-sm transition-colors w-full justify-center font-medium"
                                    >
                                        <FaGithub className="text-xl" />
                                        <span>auth --provider=github</span>
                                    </button>

                                    <div className="text-center pt-4 border-t border-slate-700">
                                        <span className="text-[#6d6b6b] text-xs">// bookmark features require authentication</span>
                                    </div>
                                </div>
                            )
                        }

                        <footer className="mt-6 pt-4 border-t border-slate-700">
                            <p className="text-[#6d6b6b] text-xs text-center">
                                <span className="text-[#1b8708]">$</span> echo "Welcome to good-first-issues"
                            </p>
                        </footer>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
