import React from 'react';
import Title from '../../../Hooks/Title';

const About: React.FC = () => {
    return (
        <div className='pt-3 bg-light dark:bg-dark'>
            {/* <Title subtitle='About' title='About Us' /> */}

            <div className="relative bg-gradient-to-b dark:from-light-dark dark:to-dark from-green-50 to-green-100">
                <section className="overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
                        <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                            <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                                <div className="flex flex-col justify-between flex-1 h-full">
                                    <div>
                                        <h1 className="text-4xl font-bold dark:text-light text-black sm:text-6xl xl:text-6xl">
                                            Take Complete Control of
                                            <br />
                                            Your Daily Expenses
                                        </h1>
                                        <p className="mt-6 text-base dark:text-light text-black sm:text-xl">
                                            Our ERP system helps you predict your expenses based on previous activities and provides insights on effective money management.

                                        </p>
                                        <a
                                            href="#"
                                            title=""
                                            className="inline-flex items-center px-6 py-5 text-base font-semibold dark:bg-dark text-white transition-all duration-200 bg-blue-500 mt-9 hover:bg-primary focus:bg-primary"
                                            role="button"
                                        >
                                            {" "}
                                            Get started
                                        </a>
                                    </div>
                                    {/* <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                                        <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                                            <p className="text-base font-semibold text-black">
                                                App available on
                                            </p>
                                            <div className="flex items-center mt-5 space-x-5 sm:mt-0">
                                                <a
                                                    href="#"
                                                    title=""
                                                    className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                                                    role="button"
                                                >
                                                    <img
                                                        className="w-auto rounded h-14 sm:h-16"
                                                        src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png"
                                                        alt=""
                                                    />
                                                </a>
                                                <a
                                                    href="#"
                                                    title=""
                                                    className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                                                    role="button"
                                                >
                                                    <img
                                                        className="w-auto rounded h-14 sm:h-16"
                                                        src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
                            <div className="lg:absolute lg:bottom-0 lg:left-0">
                                <img
                                    className="w-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <section className="py-10 dark:bg-light-dark bg-white sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
                        <div className="relative lg:mb-12">
                            <img
                                className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg"
                                alt=""
                            />
                            <div className="pl-12 pr-6">
                                <img
                                    className="relative"
                                    src="https://media.licdn.com/dms/image/D4D12AQG8fOMckq-A2g/article-cover_image-shrink_720_1280/0/1683272400288?e=2147483647&v=beta&t=of_mdja4kliIhhv_0gre7nJHUqoFAO1tin9vFoGj9vA"
                                    alt=""
                                />
                            </div>
                            <div className="absolute left-0 pr-12 bottom-8 xl:bottom-20">
                                <div className="max-w-xs bg-blue-600 rounded-lg sm:max-w-md xl:max-w-md">
                                    <div className="px-3 py-4 sm:px-5 sm:py-8">
                                        <div className="flex items-start">
                                            <p className="text-3xl sm:text-4xl">👋</p>
                                            <blockquote className="ml-5">
                                                <p className="text-sm font-medium text-white sm:text-lg">
                                                    “You made it so simple. My new site is so much faster and
                                                    easier to work with than my old site.”
                                                </p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="2xl:pl-16">
                            <h2 className="text-3xl font-bold leading-tight dark:text-light text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                                Our Story
                            </h2>
                            <p className="text-xl leading-relaxed dark:text-gray-500 text-gray-900 mt-9">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                sint. Velit officia conse duis enim velit mollit. Exercitation veniam.
                            </p>
                            <p className="mt-6 text-xl leading-relaxed dark:text-gray-500 text-gray-900">
                                Velit officia conse duis enim velit mollit. Exercit ation veniam
                                consequat sunt nostrud amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ex perferendis, sapiente, modi dolorem iure ipsum, nemo qui temporibus eveniet aperiam excepturi. Obcaecati commodi temporibus reiciendis modi, earum ex debitis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default About;