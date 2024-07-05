import About from '../Pages/BrightERP/About/About';
import Home from '../Pages/BrightERP/Home/Home';
import Pricing from '../Pages/BrightERP/Pricing/Pricing';
import Profile from '../Pages/BrightERP/Profile/Profile';
import SignIn from '../Pages/Registation/signIn/SignIn';
import SignUp from '../Pages/Registation/singUp/SignUp';
import WorkSpace from '../Pages/Registation/singUp/WorkSpace';

export const Bright_ERP_path = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/pricing',
        element: <Pricing />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/workspace',
        element: <WorkSpace />,
    },
    {
        path: '/workspace/sign-up',
        element: <SignUp />,
    },

    {
        path: '/sign-in',
        element: <SignIn />,
    },
];
