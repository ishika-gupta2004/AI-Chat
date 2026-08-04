function Header({ onClear, clearing, loading }) {
    return (
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-white">
            <h1 className="text-base font-semibold text-gray-800">
                AI Memory Chat
            </h1>

            <button
                onClick={onClear}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 backdrop-blur-md border border-gray-200 text-white hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
            >
                <span>Clear Chat</span>
            </button>
        </div>
    );
}

export default Header;
