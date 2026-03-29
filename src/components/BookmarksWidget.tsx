import { useState } from 'react'
import type { Bookmark } from '../types/bookmarks'

interface BookmarksWidgetProps {
    bookmarks: Bookmark[]
}

const BookmarksWidget = ({ bookmarks }: BookmarksWidgetProps) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            {/* Floating Windoiw */}
            <button
                onClick={() => setOpen(!open)}
                className='fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-2xl dark:shadow-white/20 hover:scale-105 transition flex items-center justify-center'
            >
                ⭐
            </button>

            {/* Bookmark Panel */}
            {open && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl dark:shadow-black/50 rounded-lg flex flex-col backdrop-blur-sm">

                    {/* Header */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold flex justify-between">
                        <span className="text-gray-900 dark:text-white">Bookmarked Issues</span>

                        <button
                            onClick={() => setOpen(!open)}
                            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {/* Placeholder bookmarks */}
                        {bookmarks.map(b =>
                            <div className="p-2 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <a href={b.issue_url} className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{b.issue_title}</a>
                            </div>
                        )}

                    </div>

                </div>
            )}
        </>
    )
}

export default BookmarksWidget