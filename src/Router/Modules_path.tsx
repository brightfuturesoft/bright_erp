import { Navigate } from 'react-router-dom';
import ScrollToTop from '../Hooks/ScrollTop';
import Chart_of_account from '../Pages/Modules/accounting/pages/chartOfAccount/Chart_of_account';
import Buisness from '@/Pages/Modules/dashboard/business/Buisness';
import Accounting from '@/Pages/Modules/dashboard/accounting/Accounting';
import AddSingleItem from '@/Pages/Modules/item/items/components/AddSingleItem';
import Company_Info from '@/Pages/Modules/settings/company_settings/company_info/Company_info';

import {
    DirectSale,
    Quotation,
    Order,
    Delivery,
    Invoice,
    Return,
    BatchPayment,
    Payment,
    CustomerDebit,
    Refund,
} from '@/Pages/Modules/sale';

import Add_Customer from '@/Pages/Modules/Customer/component/AddCustomer/AddCustomer';
import Customer_Type from '@/Pages/Modules/Customer/Customer_Type';
import Customer_Details from '@/Pages/Modules/Customer/component/CustomerDetails/CustomerDetails';
import Manage_Customer from '@/Pages/Modules/Customer/Manage_Customer';
import ViewAllLedger from '@/Pages/Modules/Customer/component/CustomerDetails/RelatedInformationTabs/Ledger/ViewAllLedger';
import AddDirectSale from '@/Pages/Modules/DirectSale/AddDirectSale';
import ManageDirectSale from '@/Pages/Modules/DirectSale/ManageDirectSale';
import EditJournals from '@/Pages/Modules/Transition/Journals/EditJournals';
import Journals from '@/Pages/Modules/Transition/Journals/Journals';
import JournalInvoice from '@/Invoice/JournalInvoice';
import AddJournals from '@/Pages/Modules/Transition/Journals/AddJournals';
import EditCustomer from '@/Pages/Modules/Customer/component/EditCustomer/EditCustomer';
import {
    AttributeSet,
    Brand,
    Category,
    Color,
    Items,
    Manufacturers,
    SizeType,
} from '@/Pages/Modules/item';
import Expenses from '@/Pages/Modules/Transition/Expenses/Expenses';
import IncomeSection from '@/Pages/Modules/accounting/pages/chartOfAccount/components/income/IncomeSection';
import Domain_url from '@/Pages/Modules/settings/company_settings/domain_url/Domain_url';
import Branding from '@/Pages/Modules/settings/company_settings/branding/Branding';
import Business_location from '@/Pages/Modules/settings/company_settings/business_locations/Business_location';
import EditSingleItem from '@/Pages/Modules/item/items/components/EditSingleItem';
import Ecommerce_Order from '@/Pages/Modules/E_Commerce/Order/Order';
import ManageCustomer from '../Pages/Modules/E_Commerce/coustomers/Manage_Customer';
import CustomerDetails from '@/Pages/Modules/E_Commerce/coustomers/components/CustomerDetails/CustomerDetails';
import CustomerAllOrders from '@/Pages/Modules/E_Commerce/coustomers/components/ReletedInformation/order/StandOrder/CustomerAllOrders';
import CustomerCarts from '@/Pages/Modules/E_Commerce/customer_carts/CustomerCarts';

export const Modules_path = [
    {
        path: '',
        element: (
            <>
                <ScrollToTop />
                <Navigate to="business" />
            </>
        ), // Redirect from default path to 'business'
    },
    {
        path: 'business',
        element: (
            <>
                <ScrollToTop />
                <Buisness />
            </>
        ),
    },
    {
        path: 'accounting',
        element: (
            <>
                <ScrollToTop />
                <Accounting />
            </>
        ),
    },

    {
        path: 'accounting/chart_of_account',
        element: (
            <>
                <ScrollToTop />
                <Chart_of_account />
            </>
        ),
    },
    {
        path: 'customer',
        element: (
            <>
                <ScrollToTop />
                <Manage_Customer />
            </>
        ),
    },
    {
        path: 'customer/customer-type',
        element: <Customer_Type />,
    },

    {
        path: 'customer/customer-edit/:id',
        element: <EditCustomer onSave={() => {}} />,
    },
    {
        path: 'customer/customer-details/:id',
        element: <Customer_Details />,
    },

    {
        path: 'customer/customer-details/ledger/:id',
        element: <ViewAllLedger />,
    },
    {
        path: 'accounting/chart_of_account/add_journals',
        element: (
            <>
                <ScrollToTop />
                <AddJournals />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/journals_details/:id',
        element: (
            <>
                <ScrollToTop />
                <JournalInvoice />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/journals',
        element: (
            <>
                <ScrollToTop />
                <Journals />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/journals/:id',
        element: (
            <>
                <ScrollToTop />
                <EditJournals />
            </>
        ),
    },

    {
        path: 'direct-sale',
        element: (
            <>
                <ScrollToTop />
                <ManageDirectSale />
            </>
        ),
    },
    {
        path: 'direct-sale/new_sale',
        element: (
            <>
                <ScrollToTop />
                <AddDirectSale />
            </>
        ),
    },

    // accounting //
    {
        path: 'accounting',
        element: <>accounting.....</>,
    },

    {
        path: 'accounting/chart_of_account/expenses',
        element: (
            <>
                <ScrollToTop />
                <Expenses />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/income',
        element: (
            <>
                <ScrollToTop />
                <IncomeSection />
            </>
        ),
    },
    {
        path: 'item',
        element: <Category />,
    },
    {
        path: 'item/category',
        element: <Category />,
    },
    {
        path: 'item/items',
        element: <Items />,
    },
    {
        path: 'item/items/create_item',
        element: <AddSingleItem />,
    },
    {
        path: 'item/items/edit_item/:id',
        element: <EditSingleItem />,
    },
    {
        path: 'item/manufacturer',
        element: <Manufacturers />,
    },
    {
        path: 'item/brand',
        element: <Brand />,
    },
    {
        path: 'item/color',
        element: <Color />,
    },
    {
        path: 'item/size_type',
        element: <SizeType />,
    },
    {
        path: 'item/attribute_set',
        element: <AttributeSet />,
    },

    {
        path: 'sale',
        element: <DirectSale />,
    },
    {
        path: 'sale/direct-sale',
        element: <DirectSale />,
    },
    {
        path: 'sale/quotation',
        element: <Quotation />,
    },
    {
        path: 'sale/order',
        element: <Order />,
    },
    {
        path: 'sale/delivery',
        element: <Delivery />,
    },
    {
        path: 'sale/invoice',
        element: <Invoice />,
    },
    {
        path: 'sale/return',
        element: <Return />,
    },
    {
        path: 'sale/batch-payment',
        element: <BatchPayment />,
    },
    {
        path: 'sale/payment',
        element: <Payment />,
    },
    {
        path: 'sale/customer-debit',
        element: <CustomerDebit />,
    },
    {
        path: 'sale/refund',
        element: <Refund />,
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
    // Ecommerce Path
    {
        path: 'e-commerce',
        element: <>E-Commerce.........</>,
    },
    {
        path: 'e-commerce/orders',
        element: <Ecommerce_Order />,
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
        element: <ManageCustomer />,
    },
    {
        path: 'e-commerce/customers-carts',
        element: <CustomerCarts />,
    },
    {
        path: 'e-commerce/customer-details/:id',
        element: <CustomerDetails />,
    },
    {
        path: 'e-commerce/customer-details/:customerId/orders',
        element: <CustomerAllOrders />,
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
    {
        path: 'settings/account-settings',
        element: <>warehouse-access.........</>,
    },
    {
        path: 'settings/company-settings/company-info',
        element: <Company_Info />,
    },
    {
        path: 'settings/company-settings/domain-url',
        element: <Domain_url />,
    },
    {
        path: 'settings/company-settings/branding',
        element: <Branding />,
    },
    {
        path: 'settings/company-settings/locations',
        element: <Business_location />,
    },
];
