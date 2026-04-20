import { formatDistanceToNow } from "date-fns"

type IssueCardProps = {
    path: string;
    title: string;
    avatar: string;
    author: string;
    created: string
}

const IssueCard = ({ path, title, avatar, author, created }: IssueCardProps) => {
    return (
        <a href={path} target="_blank">
            <div className="w-full min-h-64 border hover:border-green-500 border-[#783434] p-4 sm:p-8 font-mono">
                <section className="mb-2">
                    <p className="italic text-green-700 text-xs mb-6 whitespace-nowrap truncate overflow-hidden">{`path: ${path}`}</p>
                    <h1 className="text-gray-200 font-space text-xl sm:text-3xl truncate overflow-hidden">{title}</h1>
                </section>
                <section className="text-xs flex flex-col gap-1">
                    <span className="w-fit text-yellow-600 bg-yellow-500/10 border border-yellow-600 p-1">[ label: "good first issues" ]</span>
                    <span className="w-fit text-green-600 bg-green-500/10 border border-green-600 p-1">[ priority: "medium" ]</span>
                </section>
                <hr className="mt-4 border-green-800/40" />
                <section className="text-xs flex items-center justify-between p-1">
                    <div className="flex items-center justify-between gap-3">
                        <img src={avatar} alt="" className="rounded-full h-6 w-6" />
                        <div><p className="text-[#0de226]">{`@${author}`}</p>
                            <p className="text-gray-500">AUTHOR</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500">CREATED</p>
                        <p className="text-[#0de226]">{formatDistanceToNow(new Date(created), {
                            addSuffix: true
                        })}</p>
                    </div>
                </section>
            </div>
        </a>
    )
}

export default IssueCard