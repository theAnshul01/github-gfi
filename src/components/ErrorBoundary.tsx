import React from "react"
interface State {
    hasError: boolean,
}

export default class ErrorBoundary extends React.Component<
    React.PropsWithChildren,
    State
> {
    constructor(props: React.PropsWithChildren) {
        super(props)
        this.state = { hasError: false}
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error){
        console.error("Runtime error:", error)
    }

    render() {
        if(this.state.hasError){
            return(
                <div className="min-h-screen flex items-center justify-center text-center py-16 bg-gray-800">
                    <h2 className="text-red-400 text-xl">
                        Something went wrong.
                    </h2>
                </div>
            )
        }

        return this.props.children
    }
}