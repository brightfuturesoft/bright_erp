import Lottie from 'lottie-react';
import hero_image from '../../../../assets/images/hero1.png';
import hero_animation from '../../../../assets/images/hero1_animation.json';

const HomeHero: React.FC = () => {
    return (
        <div>
            <div className="bg-gray-50 dark:bg-dark hero">
                <section className="z-10 py-10 sm:py-16 lg:py-24">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
                            <div>
                                <h1 className="font-bold text-4xl text-dark sm:text-6xl lg:text-7xl dark:text-light">
                                    Optimize your business with
                                    <div className="inline-flex relative">
                                        <span className="bottom-0 absolute inset-x-0 border-primary dark:border-primary border-b-[30px]"></span>
                                        <h1 className="relative font-bold text-4xl text-dark sm:text-6xl lg:text-7xl dark:text-light">
                                            Your ERP.
                                        </h1>
                                    </div>
                                </h1>

                                <p className="mt-8 text-base text-dark sm:text-xl md:text-gray-400 dark:text-gray-400">
                                    Streamline operations, enhance productivity,
                                    and drive growth with our comprehensive ERP
                                    solutions.
                                </p>

                                <div className="flex items-center gap-2 mt-4 md:mt-8">
                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-900 focus:bg-blue-600 dark:focus:bg-blue-900 dark:bg-blue-800 px-3 md:px-10 w-full md:w-auto h-[50px] font-semibold text-base text-white text-wrap whitespace-nowrap transition-all duration-200"
                                        role="button"
                                    >
                                        Start exploring
                                    </a>

                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex justify-center items-center hover:bg-blue-500 dark:hover:bg-blue-900 px-3 md:px-7 border border-blue-500 hover:border-blue-600 dark:hover:border-blue-900 focus:border-blue-600 dark:border-blue-800 w-full sm:w-auto h-[50px] font-semibold text-base text-blue-500 text-wrap group hover:text-white dark:hover:text-white whitespace-nowrap transition-all duration-200"
                                    >
                                        <svg
                                            className="mr-3 w-10 h-10 group-hover:text-white text-blue-500 dark:text-blue-800"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Watch video
                                    </a>
                                </div>
                            </div>

                            <div>
                                {/* <img
                                                      className="w-full"
                                                      src={hero_image}
                                                      alt="Erp Hero Image"
                                                /> */}
                                <Lottie animationData={hero_animation} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeHero;
