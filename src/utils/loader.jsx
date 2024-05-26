

const Loader = () => {
    return (

        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-500"></div>
                <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-700"></div>
            </div>

        </div>
    )
}

export default Loader