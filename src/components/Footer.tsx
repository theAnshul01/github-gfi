import { useEffect, useState } from "react";
import Clock from "./Clock"
import { FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {

    const [randomLn, setRandomLn] = useState<string>((Math.random()*100).toFixed(0));
    const [randomCol, setRandomCol] = useState<string>((Math.random() * 100).toFixed(0));
    
    const status = ["PULLING", "PUSHING", "CLONING", "FETCHING", "MERGING", "FORKING"]
    const [randomStatusVal, setRandomStatusVal] = useState<number>(Math.floor(Math.random()*status.length))

    useEffect(()=>{
        setRandomCol((Math.random() * 100).toFixed(0))
        setRandomLn((Math.random() * 100).toFixed(0))
        setRandomStatusVal(Math.floor(Math.random() * status.length))
    },[])


    return (
        <footer className='fixed bottom-0 w-full bg-[#2ce207] font-mono text-sm px-4 z-50'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-4'>
                    <p className='hidden lg:block'> [STATUS: {status[randomStatusVal]}] | </p>
                    <p className='hidden lg:block'>ENCODING: UTF-8 |</p>
                    <p className='hidden md:block'>POS: LN {randomLn}, COL {randomCol}</p>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className="flex items-center justify-between gap-1"><FaGithub /> <a href="https://github.com/theAnshul01/github-gfi" target="_blank" rel="noopener noreferrer">GITHUB</a></div>
                    <div className="flex items-center justify-between gap-1"><FaDiscord /> <a href="https://discord.gg/NeW2RnzS" target="_blank" rel="noopener noreferrer">DISCORD</a></div>
                    <p className="hidden">X.COMMUNICATION</p>
                    <p>[<Clock/>]</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer