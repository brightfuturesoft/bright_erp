export default function WorkSpace() {
    return (
        <div>
            <section>
                <div className="min-h-full lg:flex lg:justify-between">
                    <div className="flex flex-col justify-center flex-1 px-4 py-12 bg-white sm:px-6 lg:px-20 xl:px-24">
                        <div className="flex-1 max-w-sm mx-auto lg:max-w-md">
                            <img
                                className="w-auto h-8 mx-auto lg:mx-0"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/logo.svg"
                                alt=""
                            />

                            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 lg:mt-20 xl:mt-32 sm:text-4xl xl:text-5xl font-pj lg:text-left">
                                Get started your 14 days free trial now
                            </h1>

                            <form
                                action="#"
                                method="POST"
                                className="mt-10"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="sr-only">
                                            {' '}
                                            Email{' '}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>

                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder="Username"
                                                className="
                                        block
                                        w-full
                                        py-4
                                        pl-12
                                        pr-4
                                        overflow-hidden
                                        text-base
                                        font-normal
                                        text-gray-900
                                        placeholder-gray-600
                                        transition-all
                                        duration-200
                                        border border-gray-300
                                        caret-gray-900
                                        rounded-xl
                                        bg-gray-50
                                        focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900
                                        font-pj
                                    "
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="sr-only">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </div>

                                            <input
                                                type="password"
                                                name=""
                                                id=""
                                                placeholder="Password (min. 8 characters)"
                                                className="
                                        block
                                        w-full
                                        py-4
                                        pl-12
                                        pr-4
                                        overflow-hidden
                                        text-base
                                        font-normal
                                        text-gray-900
                                        placeholder-gray-600
                                        transition-all
                                        duration-200
                                        border border-gray-300
                                        caret-gray-900
                                        rounded-xl
                                        bg-gray-50
                                        focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900
                                        font-pj
                                    "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex items-center mt-5">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            id="terms"
                                            className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                        />
                                    </div>

                                    <div className="ml-3 text-base">
                                        <label className="font-normal text-gray-900 font-pj">
                                            {' '}
                                            I agree with{' '}
                                            <a
                                                href="#"
                                                title=""
                                                className="font-bold rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:underline"
                                            >
                                                Terms & Conditions
                                            </a>{' '}
                                        </label>
                                    </div>
                                </div>

                                <div className="relative mt-8">
                                    <div className="absolute -inset-2">
                                        <div
                                            className="w-full h-full mx-auto opacity-30 blur-lg filter"
                                            style={{
                                                background:
                                                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                                    >
                                        Join Rareblocks
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-base font-normal text-center text-gray-900 lg:mt-20 xl:mt-32 font-pj lg:text-left">
                                Already have an account?{' '}
                                <a
                                    href="#"
                                    title=""
                                    className="font-bold rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:underline"
                                >
                                    Login now
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="relative grid flex-1 w-full px-4 py-12 overflow-hidden bg-gray-900 lg:max-w-2xl lg:px-20 xl:px-24 sm:px-6 place-items-center">
                        <div className="absolute inset-0">
                            <img
                                className="object-cover object-top w-full h-full scale-150 -rotate-90 opacity-10"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/background-pattern.png"
                                alt=""
                            />
                        </div>

                        <div className="relative max-w-sm mx-auto">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-xl">
                                <svg
                                    className="w-auto h-5 text-white"
                                    viewBox="0 0 33 23"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M32.0011 4.7203L30.9745 0C23.5828 0.33861 18.459 3.41404 18.459 12.4583V22.8687H31.3725V9.78438H26.4818C26.4819 6.88236 28.3027 5.17551 32.0011 4.7203Z" />
                                    <path d="M13.5421 4.7203L12.5155 0C5.12386 0.33861 0 3.41413 0 12.4584V22.8687H12.914V9.78438H8.02029C8.02029 6.88236 9.84111 5.17551 13.5421 4.7203Z" />
                                </svg>
                            </div>

                            <blockquote className="mt-14">
                                <p className="text-2xl font-medium leading-relaxed text-white lg:text-3xl font-pj">
                                    “You made it so simple. My new site is so
                                    much faster and easier to work with than my
                                    old site. I just choose the page, make the
                                    change.”
                                </p>
                            </blockquote>

                            <div className="flex items-center mt-12">
                                <img
                                    className="flex-shrink-0 object-cover rounded-full w-14 h-14"
                                    src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/avatar-female.png"
                                    alt=""
                                />
                                <div className="ml-4">
                                    <p className="text-xl font-bold text-white font-pj">
                                        Leslie Alexander
                                    </p>
                                    <p className="mt-px text-lg font-normal text-gray-400 font-pj">
                                        React Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
