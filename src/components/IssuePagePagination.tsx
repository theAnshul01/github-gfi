import { useSearchParams } from "react-router-dom";


type Props = {
  page: number;
  totalPage: number;
  perPage: number
}

const IssuePagePagination = ({page, totalPage, perPage} : Props) => {

  const [searchParams, setSearchParams] = useSearchParams()

  function goToPage(newPage: number){

      const params = new URLSearchParams(searchParams)

      params.set("page", String(newPage))
      params.set("per_page", String(perPage))

      setSearchParams(params)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="text-center w-64 text-white flex items-center justify-between bg-slate-800 px-4 py-1 rounded-lg gap-2 text-sm">
          <button 
          className="text-slate-500 hover:bg-gray-950 px-2 py-1 w-1/3 rounded-l-md" 
          disabled={page===1}
          onClick={()=>goToPage(page-1)}
          >&lt;</button>
          <p className="text-slate-500 w-1/3">| {page} |</p>
          <button 
          className="text-slate-500 hover:bg-gray-950 px-2 py-1 w-1/3 rounded-r-md"
          disabled={page===totalPage}
          onClick={()=>goToPage(page+1)}
          >&gt;</button>
        </div>
      </div>
    </>
  )
}

export default IssuePagePagination