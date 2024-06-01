import About from "../Pages/BrightERP/About/About";
import Home from "../Pages/BrightERP/Home/Home";
import Pricing from "../Pages/BrightERP/Pricing/Pricing";

export const Bright_ERP_path = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/pricing',
        element: <Pricing />
    },
    {
        path: '/about',
        element: <About />
    },
]