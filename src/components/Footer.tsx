import { useState } from "react";
import Clock from "./Clock"
import { FaGithub, FaDiscord } from "react-icons/fa";

const STATUS_OPTIONS = ["PULLING", "PUSHING", "CLONING", "FETCHING", "MERGING", "FORKING"];

const Footer = () => {
    const [randomLn] = useState(() => (Math.random() * 100).toFixed(0));
    const [randomCol] = useState(() => (Math.random() * 100).toFixed(0));
    const [randomStatusVal] = useState(() => Math.floor(Math.random() * STATUS_OPTIONS.length));

    const currentStatus = STATUS_OPTIONS[randomStatusVal];


    return (
        <footer className='fixed bottom-0 left-0 right-0 bg-[#2ce207]/90 backdrop-blur-md font-mono text-xs sm:text-sm px-2 sm:px-4 z-40 border-t border-white/20 shadow-[0_-4px_10px_rgba(44,226,7,0.2)]'>
            <div className='flex items-center justify-between h-8 sm:h-10'>
                <div className='flex items-center gap-2 sm:gap-4 overflow-hidden'>
                    <p className="whitespace-nowrap flex-shrink-0"> [STATUS: {currentStatus}] </p>
                    <span className="hidden sm:inline text-black/50">|</span>
                    <p className='hidden md:block whitespace-nowrap'>ENCODING: UTF-8</p>
                    <span className="hidden md:inline text-black/50">|</span>
                    <p className='hidden sm:block whitespace-nowrap'>POS: LN {randomLn}, COL {randomCol}</p>
                </div>
                <div className='flex items-center gap-3 sm:gap-6'>
                    <div className="flex items-center gap-1.5 group">
                        <FaGithub className="group-hover:scale-110 transition-transform" /> 
                        <a href="https://github.com/theAnshul01/github-gfi" 
                           target="_blank" 
                           className="hover:underline underline-offset-2 font-bold decoration-black/30"
                           rel="noreferrer">
                            GITHUB
                        </a>
                      <FaDiscord className="group-hover:scale-110 transition-transform" /> 
                        <a href="https://discord.gg/NeW2RnzS" 
                           target="_blank" 
                           className="hover:underline underline-offset-2 font-bold decoration-black/30"
                           rel="noopener noreferrer">
                            DISCORD
                        </a>
                        <p className="hidden">X.COMMUNICATION</p>
                    <p>[<Clock/>]</p>
                    </div>
                    <p className="font-bold hidden xs:block">[<Clock/>]</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer