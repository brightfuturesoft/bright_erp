import ForgetPass from '../Pages/Registation/signIn/ForgetPass';
import About from '../Pages/BrightERP/About/About';
import Home from '../Pages/BrightERP/Home/Home';
import Pricing from '../Pages/BrightERP/Pricing/Pricing';
import Profile from '../Pages/BrightERP/Profile/Profile';
import SignIn from '../Pages/Registation/signIn/SignIn';
import SignUp from '../Pages/Registation/singUp/SignUp';
import WorkSpace from '../Pages/Registation/singUp/WorkSpace';
import Verify_user from '@/Pages/Registation/verify_user/Verify_user';
import VerifyUserPage from '@/Pages/Registation/verify_user/Verify';
import PrivacyPolicy from '@/Pages/BrightERP/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '@/Pages/BrightERP/Terms&Conditions/Terms&Conditions';
import Contact from '@/Pages/BrightERP/Contact/Contact';
import { Faq } from '@/Pages/BrightERP/Faq/Faq';
import { Features } from '@/Pages/BrightERP/Features/Features';

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
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
    },
    {
        path: '/terms-conditions',
        element: <TermsAndConditions />,
    },
    {
        path: '/contact-support',
        element: <Contact />,
    },
    {
        path: '/features',
        element: <Features />,
    },
    {
        path: '/faq',
        element: <Faq />,
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
    {
        path: '/forget-password',
        element: <ForgetPass />,
    },
    {
        path: '/verify-account/:id',
        element: <Verify_user />,
    },
    {
        path: '/verify-user',
        element: <VerifyUserPage />,
    },
];
