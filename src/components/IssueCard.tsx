

const IssueCard = () => {
    return (
        <div className="w-96 h-80 border hover:border-green-500 border-[#783434] p-8 font-mono">
            <section className="mb-2">
                <p className="italic text-green-700 text-xs mb-6">path: "/facebook/react/github.git</p>
                <h1 className="text-gray-200 font-space text-3xl">Docs: improve accessibility of code examples</h1>
            </section>
            <section className="text-xs flex flex-col gap-1">
                <span className="w-fit text-yellow-600 bg-yellow-500/10 border border-yellow-600 p-1">[ label: "good first issues" ]</span>
                <span className="w-fit text-green-600 bg-green-500/10 border border-green-600 p-1">[ priority: "medium" ]</span>
            </section>
            <hr className="mt-4 border-green-800/40"/>
            <section className="text-xs flex items-center justify-between p-1">
                <div className="flex items-center justify-between gap-3">
                    <img src="https://avatars.githubusercontent.com/u/131111577?v=4" alt="" className="rounded-full h-6 w-6"/>
                    <div><p className="text-[#0de226]">@Joe_Dev</p>
                    <p className="text-gray-500">AUTHOR</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500">CREATED</p>
                    <p className="text-[#0de226]">2h ago</p>
                </div>
            </section>
        </div>
    )
}

export default IssueCard