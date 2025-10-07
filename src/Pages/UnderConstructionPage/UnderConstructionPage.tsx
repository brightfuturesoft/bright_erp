const UnderConstructionPage = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 transition-colors duration-500 relative">
                {/* Under Construction Image */}
                <img
                    src="https://png.pngtree.com/png-vector/20231223/ourmid/pngtree-website-under-construction-construction-png-image_11198256.png"
                    alt="Under Construction"
                    className="w-80 md:w-96 lg:w-[500px] mb-6"
                />

                {/* Text */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    🚧 Under Construction
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-center max-w-md">
                    We're working hard to bring you an amazing experience! Stay
                    tuned.
                </p>

                {/* Animated Dots Loader */}
                <div className="flex justify-center space-x-2 mt-6">
                    <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="w-4 h-4 bg-pink-500 rounded-full animate-bounce animation-delay-400"></span>
                </div>
            </div>
        </div>
    );
};

export default UnderConstructionPage;
