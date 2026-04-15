import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Bookmarks = () => {
    const user = useAuth()

    if(!user){
        return (<>
            <p>user Not Logged In</p>
        </>)
    }

  return (
    <div>Bookmarks</div>
  )
}

export default Bookmarks