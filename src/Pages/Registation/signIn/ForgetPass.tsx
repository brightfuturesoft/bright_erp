import Lottie from 'lottie-react';
import forget_pass from '../../../assets/lottie/forget_pass.json';
import { BaseSyntheticEvent } from 'react';
const ForgetPass = () => {
    const onSubmitHandler = async (
        e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
    };

    return (
        <div>
            <section className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24">
                <div className="absolute bottom-0 left-0 transform -translate-x-12 translate-y-80 lg:translate-x-0">
                    <svg
                        className="blur-3xl filter"
                        style={{ filter: 'blur(64px)' }}
                        width={835}
                        height={525}
                        viewBox="0 0 835 525"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M215.676 295.092C107.631 187.047 -91.9978 228.999 50.4835 86.5174C192.965 -55.9639 705.222 -1.77906 813.267 106.266C921.312 214.311 584.231 335.302 441.75 477.783C299.268 620.265 323.722 403.137 215.676 295.092Z"
                            fill="url(#paint0_linear_537_1369)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_537_1369"
                                x1="861.287"
                                y1="154.286"
                                x2="295.051"
                                y2="576.839"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop
                                    offset="0%"
                                    style={{
                                        stopColor: 'var(--color-cyan-500)',
                                    }}
                                />
                                <stop
                                    offset="100%"
                                    style={{
                                        stopColor: 'var(--color-purple-500)',
                                    }}
                                />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="absolute inset-0">
                    <img
                        className="object-cover w-full h-full opacity-50"
                        src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                        alt=""
                    />
                </div>
                <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center max-w-md grid-cols-1 mx-auto gap-y-8 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 lg:max-w-6xl">
                        <div className="overflow-hidden bg-base-900 rounded-xl">
                            <div className="p-6 sm:py-8 sm:px-9">
                                <h2 className="text-2xl font-normal text-white sm:text-3xl lg:text-4xl">
                                    Forget Password
                                </h2>
                                <p className="mt-4 text-lg font-normal text-gray-400">
                                    An email with instructions to reset your
                                    password has been sent. Please check your
                                    inbox.
                                </p>
                                <form
                                    onSubmit={onSubmitHandler}
                                    className="mt-8 space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="sr-only"
                                        >
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email address"
                                                className="block w-full px-5 py-4 text-base text-white placeholder-gray-500 bg-black rounded-md border-white ring-1 ring-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full px-5 py-4 text-base text-black transition-all duration-200 bg-white border border-transparent rounded-md hover:opacity-80"
                                        >
                                            Forget Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 xl:px-12 xl:gap-6">
                            <Lottie
                                className="w-full h-[500px] pt-20"
                                animationData={forget_pass}
                                loop={true}
                            />
                            {/* <div className="overflow-hidden bg-gray-900 rounded-full shadow-md">
                                <div className="p-4">
                                    <div className="flex itme-start md:items-center">
                                        <img
                                            className="object-cover w-12 h-12 rounded-full shrink-0"
                                            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/testimonial/3/avatar-1.png"
                                            alt=""
                                        />
                                        <blockquote className="ml-3">
                                            <p className="text-lg font-normal text-white">
                                                Lorem ipsum dolor sit amet, consect etur adipiscing elit -
                                                @jennifer.a
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden bg-gray-900 rounded-full shadow-md">
                                <div className="p-4">
                                    <div className="flex itme-start md:items-center">
                                        <img
                                            className="object-cover w-12 h-12 rounded-full shrink-0"
                                            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/testimonial/3/avatar-2.png"
                                            alt=""
                                        />
                                        <blockquote className="ml-3">
                                            <p className="text-lg font-normal text-white">
                                                I just love how these people build this system - @jamescron
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden bg-gray-900 rounded-full shadow-md">
                                <div className="p-4">
                                    <div className="flex itme-start md:items-center">
                                        <img
                                            className="object-cover w-12 h-12 rounded-full shrink-0"
                                            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/testimonial/3/avatar-3.png"
                                            alt=""
                                        />
                                        <blockquote className="ml-3">
                                            <p className="text-lg font-normal text-white">
                                                A must have UI kit for building my landing pages - @camerondi
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden bg-gray-900 rounded-full shadow-md">
                                <div className="p-4">
                                    <div className="flex itme-start md:items-center">
                                        <img
                                            className="object-cover w-12 h-12 rounded-full shrink-0"
                                            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/testimonial/3/avatar-5.png"
                                            alt=""
                                        />
                                        <blockquote className="ml-3">
                                            <p className="text-lg font-normal text-white">
                                                Lorem ipsum dolor sit amet, consect etur adipiscing elit -
                                                @martina
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgetPass;
