import { jsx as _jsx } from 'react/jsx-runtime';
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
import EcommerceProfileStep from '@/Pages/Registation/singUp/EcommerceProfileStep';
import Package_and_category from '@/Pages/Registation/singUp/Package_and_category';
import PrivacyPolicy from '@/Pages/BrightERP/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '@/Pages/BrightERP/Terms&Conditions/Terms&Conditions';
import Contact from '@/Pages/BrightERP/Contact/Contact';
import { Faq } from '@/Pages/BrightERP/Faq/Faq';
import { Features } from '@/Pages/BrightERP/Features/Features';
export const Bright_ERP_path = [
    {
        path: '/',
        element: _jsx(Home, {}),
    },
    {
        path: '/pricing',
        element: _jsx(Pricing, {}),
    },
    {
        path: '/about',
        element: _jsx(About, {}),
    },
    {
        path: '/privacy-policy',
        element: _jsx(PrivacyPolicy, {}),
    },
    {
        path: '/terms-conditions',
        element: _jsx(TermsAndConditions, {}),
    },
    {
        path: '/contact-support',
        element: _jsx(Contact, {}),
    },
    {
        path: '/features',
        element: _jsx(Features, {}),
    },
    {
        path: '/faq',
        element: _jsx(Faq, {}),
    },
    {
        path: '/profile',
        element: _jsx(Profile, {}),
    },
    {
        path: '/workspace',
        element: _jsx(WorkSpace, {}),
    },
    {
        path: '/workspace/address',
        element: _jsx(EcommerceProfileStep, {}),
    },
    {
        path: '/workspace/package',
        element: _jsx(Package_and_category, {}),
    },
    {
        path: '/workspace/sign-up',
        element: _jsx(SignUp, {}),
    },
    {
        path: '/sign-in',
        element: _jsx(SignIn, {}),
    },
    {
        path: '/forget-password',
        element: _jsx(ForgetPass, {}),
    },
    {
        path: '/verify-account/:id',
        element: _jsx(Verify_user, {}),
    },
    {
        path: '/verify-user',
        element: _jsx(VerifyUserPage, {}),
    },
];
