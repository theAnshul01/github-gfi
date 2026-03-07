interface ErrorMessageProps {
    type: "RATE_LIMIT" | "API_ERROR" | "NETWORK_ERROR"
}


const ErrorMessage = ({type} : ErrorMessageProps) => {
    let message = ""

    if(type === "RATE_LIMIT"){
        message = "Github API rate limit exceeded. Please wait for sometime. Alternatively you can use a Personal Access Token."
    }

    if(type === "NETWORK_ERROR"){
        message = "Network error. Please check your connection and try again."
    }

    if(type === "API_ERROR"){
        message = "Something went wrong while fetching issues."
    }

  return (
    <div className="min-h-screen flex justify-center items-center text-center py-10 dark:bg-gray-800">
        <div>
            <p className="text-red-500 dark:text-red-400 text-lg font-medium">{message}</p>
        </div>
    </div>
  )
}

export default ErrorMessage