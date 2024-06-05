import { Navigate } from "react-router-dom";
import ChatOfAccounting from "../Pages/Modules/Accounting/ChatOfAccounting";
import AddCustomer from "../Pages/Modules/Customer/AddCustomer";
import ManageCustomer from "../Pages/Modules/Customer/ManageCustomer";
import AddDirectSale from "../Pages/Modules/DirectSale/AddDirectSale";
import ManageDirectSale from "../Pages/Modules/DirectSale/ManageDirectSale";
import DashboardHome from "../Pages/Modules/Pages/DashboardHome";
import DashboardHomeAccounting from "../Pages/Modules/Pages/DashboardHomeAccounting";
import ScrollToTop from "../Hooks/ScrollTop";

export const Modules_path = [
    {
        path: '',
        element: <>
            <ScrollToTop />
            <Navigate to="business" />
        </>, // Redirect from default path to 'business'
    },
    {
        path: 'business',
        element: <>
            <ScrollToTop />
            <DashboardHome />
        </>,
    },
    {
        path: 'accounting',
        element: <>
            <ScrollToTop />
            <DashboardHomeAccounting />
        </>,
    },
    {
        path: 'customer',
        element: <>
            <ScrollToTop />
            <ManageCustomer />
        </>,
    },
    {
        path: 'customer/create-customer',
        element: <>
            <ScrollToTop />
            <AddCustomer />
        </>,
    },
    {
        path: 'direct-sale',
        element: <>
            <ScrollToTop />
            <ManageDirectSale />
        </>,
    },
    {
        path: 'direct-sale/new_sale',
        element: <>
            <ScrollToTop />
            <AddDirectSale />
        </>,
    },
    {
        path: 'accounting',
        element: <>accounting.....</>,
    },
    {
        path: 'accounting/chart_of_account',
        element: <>
            <ScrollToTop />
        </>,
    },
    {
        path: 'item',
        element: <>items......... </>,
    },
    {
        path: 'item/category',
        element: <> category.........</>,
    },
    {
        path: 'item/manufacturer',
        element: <> manufacturer......</>,
    },
    {
        path: 'item/brand',
        element: <> brands.......</>,
    },
    {
        path: 'item/color',
        element: <>colors.......</>,
    },
    {
        path: 'customer',
        element: <>customer....</>,
    },
    {
        path: 'customer/customer-type',
        element: <> customer type........</>,
    },
    {
        path: 'sale',
        element: <> sale.......</>,
    },
    {
        path: 'sale/direct-sale',
        element: <> sale........</>,
    },
    {
        path: 'sale/order',
        element: <> order.....</>,
    },
    {
        path: 'sale/delivery',
        element: <> delivery........</>,
    },
    {
        path: 'sale/invoice',
        element: <> invoice.......</>,
    },
    {
        path: 'sale/return',
        element: <> return.....</>,
    },
    {
        path: 'sale/batch-payment',
        element: <>batch-payment.....</>,
    },
    {
        path: 'sale/payment',
        element: <> payment.....</>,
    },
    {
        path: 'sale/refund',
        element: <> refund.....</>,
    },
    {
        path: 'pos',
        element: <>POS..........</>,
    },
    {
        path: 'pos/outlet',
        element: <>Outlet</>,
    },
    {
        path: 'pos/counter',
        element: <>Counter</>,
    },
    {
        path: 'pos/outlet-sessions',
        element: <>Session.....</>,
    },
    {
        path: 'pos/counter-sessions',
        element: <>counter-sessions......</>,
    },
    {
        path: 'pos/orders',
        element: <>POS Order......</>,
    },
    {
        path: 'pos/return',
        element: <>Return.........</>,
    },
    {
        path: 'pos/barcode',
        element: <>Barcode........</>,
    },
    {
        path: 'pos/outlet-access',
        element: <>Outlet Access</>,
    },
    {
        path: 'e-commerce',
        element: <>E-Commerce.........</>,
    },
    {
        path: 'e-commerce/orders',
        element: <>orders.........</>,
    },
    {
        path: 'e-commerce/settings',
        element: <>Settings.........</>,
    },
    {
        path: 'e-commerce/promotions',
        element: <>promotions.........</>,
    },
    {
        path: 'e-commerce/customers',
        element: <>customers.........</>,
    },
    {
        path: 'e-commerce/customers-wishlist',
        element: <>customers-wishlist.........</>,
    },
    {
        path: 'e-commerce/banners',
        element: <>banners.........</>,
    },
    {
        path: 'e-commerce/blogs',
        element: <>blogs.........</>,
    },
    {
        path: 'e-commerce/contact-us',
        element: <>contact-us.........</>,
    },
    {
        path: 'e-commerce/newsletter',
        element: <>newsletter.........</>,
    },
    {
        path: 'e-commerce/policy',
        element: <>policy.........</>,
    },
    {
        path: 'e-commerce/topics',
        element: <>topics.........</>,
    },
    {
        path: 'e-commerce/partnership-brands',
        element: <>partnership-brands.........</>,
    },
    {
        path: 'e-commerce/achievements',
        element: <>achievements.........</>,
    },
    {
        path: 'e-commerce/testimonials',
        element: <>testimonials.........</>,
    },
    {
        path: 'e-commerce/reviews',
        element: <>reviews.........</>,
    },
    {
        path: 'e-commerce/integrations',
        element: <>integrations.........</>,
    },
    {
        path: 'e-commerce/general-seo',
        element: <>general-seo.........</>,
    },
    {
        path: 'e-commerce/questions',
        element: <>questions.........</>,
    },
    {
        path: 'e-commerce/custom-sections',
        element: <>custom-sections.........</>,
    },
    {
        path: 'inventory',
        element: <>Inventory.........</>,
    },
    {
        path: 'inventory/stock-adjustment',
        element: <>adjustment.........</>,
    },
    {
        path: 'inventory/stock-movement',
        element: <>stock movement.........</>,
    },
    {
        path: 'inventory/receivable-stock',
        element: <>receivable-stock.........</>,
    },
    {
        path: 'inventory/warehouse-access',
        element: <>warehouse-access.........</>,
    },
];
