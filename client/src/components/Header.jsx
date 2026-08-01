function Header({ onClear }) {
    return (
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-white">
            <h1 className="text-base font-semibold text-gray-800">
                AI Memory Chat
            </h1>

            {/* <button
                onClick={onClear}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
                Clear chat
            </button> */}
        </div>
    );
}

export default Header;
