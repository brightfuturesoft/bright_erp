import { Link } from "react-router-dom";

const SIgnIn: React.FC = () => {
  const theme = localStorage.getItem("theme");
  return (
    <section className="bg-white dark:bg-dark">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`flex items-center justify-center px-4 py-10  ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-black"
          } sm:px-6 lg:px-8 sm:py-16 lg:py-24`}
        >
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight">
              Sign in
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Create account?{" "}
              <Link
                to="/signup"
                title=""
                className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 hover:underline transition-all duration-200"
              >
                Sign up
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="font-medium text-base text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Enter email to get started"
                      className={`${
                        theme === "dark"
                          ? "bg-dark text-white"
                          : "bg-light text-black"
                      } block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md   focus:outline-none focus:border-blue-600   caret-blue-600`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="font-medium text-base text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Enter your password"
                      className={`${
                        theme === "dark"
                          ? "bg-dark text-white"
                          : "bg-light text-black"
                      } block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md   focus:outline-none focus:border-blue-600   caret-blue-600`}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    className="border-gray-200 bg-white rounded w-5 h-5 text-blue-600"
                  />
                  <label
                    htmlFor="agree"
                    className="ml-3 font-medium text-gray-500 text-sm"
                  >
                    I agree to Postcraft’s{" "}
                    <a
                      href="#"
                      title=""
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      title=""
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 px-4 py-4 border border-transparent rounded-md w-full font-semibold text-base text-white transition-all duration-200 focus:outline-none"
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
            </form>
            <div className="space-y-3 mt-3">
              <button
                type="button"
                className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200  ${
                  theme === "dark"
                    ? "bg-light-dark text-white border-gray-900"
                    : "bg-light border-gray-200  text-black"
                } border-2 rounded-md  focus:outline-none`}
              >
                <div className="left-0 absolute inset-y-0 p-4">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                  </svg>
                </div>
                Sign up with Google
              </button>
              <button
                type="button"
                className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200  ${
                  theme === "dark"
                    ? "bg-light-dark text-white border-gray-900"
                    : "bg-light border-gray-200  text-black"
                } border-2 rounded-md  focus:outline-none`}
              >
                <div className="left-0 absolute inset-y-0 p-4">
                  <svg
                    className="w-6 h-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                </div>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center px-4 py-10  ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-black"
          } sm:px-6 lg:px-8 sm:py-16 lg:py-24`}
        >
          <div>
            <img
              className="mx-auto w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
              alt=""
            />
            <div className="mx-auto w-full max-w-md xl:max-w-xl">
              <h3 className="font-bold text-2xl text-center">
                Design your own card
              </h3>
              <p className="mt-2.5 text-center text-gray-500 leading-relaxed">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SIgnIn;
