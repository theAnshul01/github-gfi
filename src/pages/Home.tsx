import IssueCard from "../components/IssueCard"

const Home = () => {
    return (
        <main className="bg-slate-950 ml-64 font-mono min-h-lvh px-6 py-8">
            <section>
                <header className="flex flex-col items-start gap-2">
                    <span className="text-[#1b8708] text-sm font-light px-2">$ cd ~/projects/good-first-issues </span>
                    <h1 className="text-5xl text-[#efecec] mx-0">[OPEN_ISSUES]</h1>
                </header>
                <div className="text-sm py-4 flex items-center gap-4 p-1">
                    <p className="bg-slate-800 text-[#6d6b6b] rounded-sm shadow-md text-xs p-1">[ TOTAL_ISSUES: 1k+ ]</p>
                    <p className="bg-slate-800 text-[#1be32b] rounded-sm shadow-md text-xs p-1">[ LATEST_ISSUES: 23 ]</p>
                </div>
            </section>
            <section>
                <IssueCard />
            </section>
        </main>
    )
}

export default Home