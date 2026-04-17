interface ErrorMessageProps {
    message: string,
    setShowError: React.Dispatch<React.SetStateAction<boolean>>
}


const ErrorMessage = ({ message, setShowError }: ErrorMessageProps) => {

    return (
        <>
            <div className="font-mono border border-red-500/50 rounded mt-1 bg-red-950/90 flex items-center justify-between fixed top-16 z-50 w-full px-6 py-4">
                <p className="text-red-500">[ERROR] -  <span className="text-gray-300">{message}</span></p>
                <button onClick={()=>setShowError(false)} className="text-[#14e00d] hover:text-[#10b80a] transition-colors font-bold"> [X] </button>
            </div>
        </>
    )
}

export default ErrorMessage