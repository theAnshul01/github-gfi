type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page:number) => void
}

const Pagination = (
    {currentPage,
        totalPages,
        onPageChange
    }: PaginationProps
) => {

    const generatePages = () : (number | string)[] => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5
        if(totalPages <= maxVisiblePages){
            for(let i = 1; i <= totalPages; i++){
                pages.push(i)
            }
        } else{
            pages.push(1)
            if(currentPage > 3){
                pages.push("...")
            }

            const start = Math.max(2, currentPage-1)
            const end = Math.min(totalPages-1, currentPage+1)

            for(let i=start; i<=end; i++){
                pages.push(i)
            }

            if(currentPage < totalPages - 2){
                pages.push("...")
            }
            pages.push(totalPages)
        }
        return pages 
        }


    const pages = generatePages()

  return (
    <>
        <div className="flex items-center justify-center gap-2 mt-10 mb-6 flex-wrap">

            {/* Prev button */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opcaity-40"
            >
                Prev
            </button>

            {/* Page Numbers */}
            {pages.map((page, index) => {
                if( page === "..."){
                    return(
                        <span key={index} className="px-2">
                            ...
                        </span>
                    )
                }

                return(
                    <button
                        key={index}
                        onClick = {() => onPageChange(page as number)}
                        className={` px-3 py-1 border rounded
                                ${
                                    currentPage === page
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "hover:bg-gray-100"
                                }
                            `}
                    >
                        {page}
                    </button>
                )
            })}

            {/* Next Button */}
            <button
                onClick = {() => onPageChange(currentPage+1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opcaity-40"
            >
                Next
            </button>

        </div>
    </>
  )
}

export default Pagination