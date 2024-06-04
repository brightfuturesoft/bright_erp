import ChatOfAccounting from "../Pages/Modules/Accounting/ChatOfAccounting";
import AddCustomer from "../Pages/Modules/Customer/AddCustomer";
import ManageCustomer from "../Pages/Modules/Customer/ManageCustomer";
import AddDirectSale from "../Pages/Modules/DirectSale/AddDirectSale";
import ManageDirectSale from "../Pages/Modules/DirectSale/ManageDirectSale";
import DashboardHome from "../Pages/Modules/Pages/DashboardHome";

export const Modules_path = [

    {
        path: '',
        element: <DashboardHome />,
    },
    {
        path: 'business',
        element: <>business</>,
    },

    {
        path: 'customer',
        element: <ManageCustomer />,
    },

    {
        path: 'customer/create-customer',
        element: <AddCustomer />,
    },


    // sales
    {
        path: 'direct-sale',
        element: <ManageDirectSale />,
    },
    {
        path: 'direct-sale/new_sale',
        element: <AddDirectSale />,
    },


    // accounting
    {
        path: 'accounting',
        element: <>accounting.....</>,
    },
    {
        path: 'accounting/chart_of_account',
        element: <ChatOfAccounting />,
    },


    // item
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


    // customer
    {
        path: 'customer',
        element: <>customer....</>,
    },
    {
        path: 'customer/customer-type',
        element: <> customer type........</>,
    },


    // sale
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


    // POS
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


    // e-commerce
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

    // inventory
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

]