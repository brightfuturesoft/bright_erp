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
import PosOrder from '@/Pages/Modules/pos/order/PosOrder';
import OrderInvoice from '@/Pages/Modules/pos/order/components/OrderInvoice';

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
        element: (
            <>
                <ScrollToTop />
                <Customer_Type />
            </>
        ),
    },

    {
        path: 'customer/customer-edit/:id',
        element: (
            <>
                <ScrollToTop />
                <EditCustomer onSave={() => {}} />
            </>
        ),
    },

    {
        path: 'customer/customer-details/:id',
        element: (
            <>
                <ScrollToTop />
                <Customer_Details />
            </>
        ),
    },
    {
        path: 'customer/customer-details/ledger/:id',
        element: (
            <>
                <ScrollToTop />
                <ViewAllLedger />
            </>
        ),
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
        element: (
            <>
                <ScrollToTop />
                <Accounting />
            </>
        ),
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
        element: (
            <>
                <ScrollToTop />
                <Category />
            </>
        ),
    },
    {
        path: 'item/category',
        element: (
            <>
                <ScrollToTop />
                <Category />
            </>
        ),
    },
    {
        path: 'item/items',
        element: (
            <>
                <ScrollToTop />
                <Items />
            </>
        ),
    },
    {
        path: 'item/items/create_item',
        element: (
            <>
                <ScrollToTop />
                <AddSingleItem />
            </>
        ),
    },
    {
        path: 'item/items/edit_item/:id',
        element: (
            <>
                <ScrollToTop />
                <EditSingleItem />
            </>
        ),
    },
    {
        path: 'item/manufacturer',
        element: (
            <>
                <ScrollToTop />
                <Manufacturers />
            </>
        ),
    },
    {
        path: 'item/brand',
        element: (
            <>
                <ScrollToTop />
                <Brand />
            </>
        ),
    },
    {
        path: 'item/color',
        element: (
            <>
                <ScrollToTop />
                <Color />
            </>
        ),
    },
    {
        path: 'item/size_type',
        element: (
            <>
                <ScrollToTop />
                <SizeType />
            </>
        ),
    },
    {
        path: 'item/attribute_set',
        element: (
            <>
                <ScrollToTop />
                <AttributeSet />
            </>
        ),
    },

    {
        path: 'sale',
        element: (
            <>
                <ScrollToTop />
                <DirectSale />
            </>
        ),
    },
    {
        path: 'sale/direct-sale',
        element: (
            <>
                <ScrollToTop />
                <DirectSale />
            </>
        ),
    },
    {
        path: 'sale/quotation',
        element: (
            <>
                <ScrollToTop />
                <Quotation />
            </>
        ),
    },
    {
        path: 'sale/order',
        element: (
            <>
                <ScrollToTop />
                <Order />
            </>
        ),
    },
    {
        path: 'sale/delivery',
        element: (
            <>
                <ScrollToTop />
                <Delivery />
            </>
        ),
    },
    {
        path: 'sale/invoice',
        element: (
            <>
                <ScrollToTop />
                <Invoice />
            </>
        ),
    },
    {
        path: 'sale/return',
        element: (
            <>
                <ScrollToTop />
                <Return />
            </>
        ),
    },
    {
        path: 'sale/batch-payment',
        element: (
            <>
                <ScrollToTop />
                <BatchPayment />
            </>
        ),
    },
    {
        path: 'sale/payment',
        element: (
            <>
                <ScrollToTop />
                <Payment />
            </>
        ),
    },
    {
        path: 'sale/customer-debit',
        element: (
            <>
                <ScrollToTop />
                <CustomerDebit />
            </>
        ),
    },
    {
        path: 'sale/refund',
        element: (
            <>
                <ScrollToTop />
                <Refund />
            </>
        ),
    },
    {
        path: 'pos',
        element: (
            <>
                <ScrollToTop />
                <div>POS..........</div>,
            </>
        ),
    },
    {
        path: 'pos/outlet',
        element: (
            <>
                <ScrollToTop />
                <>Outlet............</>
            </>
        ),
    },
    {
        path: 'pos/counter',
        element: (
            <>
                <ScrollToTop />
                Counter............
            </>
        ),
    },
    {
        path: 'pos/outlet-sessions',
        element: (
            <>
                <ScrollToTop />
                Session.....
            </>
        ),
    },
    {
        path: 'pos/counter-sessions',
        element: (
            <>
                <ScrollToTop />
                counter-sessions......
            </>
        ),
    },
    {
        path: 'pos/orders',
        element: <PosOrder />,
    },
    {
        path: 'invoice/:id',
        element: <OrderInvoice />,
    },
    {
        path: 'pos/return',
        element: (
            <>
                <ScrollToTop />
                Return.........
            </>
        ),
    },
    {
        path: 'pos/barcode',
        element: (
            <>
                <ScrollToTop />
                Barcode........
            </>
        ),
    },
    {
        path: 'pos/outlet-access',
        element: (
            <>
                <ScrollToTop />
                Outlet Access
            </>
        ),
    },
    {
        path: 'e-commerce',
        element: (
            <>
                <ScrollToTop />
                E-Commerce.........
            </>
        ),
    },
    {
        path: 'e-commerce/orders',
        element: (
            <>
                <ScrollToTop />
                orders.........
            </>
        ),
    },
    {
        path: 'e-commerce/settings',
        element: (
            <>
                <ScrollToTop />
                Settings.........
            </>
        ),
    },
    {
        path: 'e-commerce/promotions',
        element: (
            <>
                <ScrollToTop />
                promotions.........
            </>
        ),
    },
    {
        path: 'e-commerce/customers',
        element: (
            <>
                <ScrollToTop />
                customers.........
            </>
        ),
    },
    {
        path: 'e-commerce/customers-wishlist',
        element: (
            <>
                <ScrollToTop />
                customers-wishlist.........
            </>
        ),
    },
    {
        path: 'e-commerce/banners',
        element: (
            <>
                <ScrollToTop />
                banners.........
            </>
        ),
    },
    {
        path: 'e-commerce/blogs',
        element: (
            <>
                <ScrollToTop />
                blogs.........
            </>
        ),
    },
    {
        path: 'e-commerce/contact-us',
        element: (
            <>
                <ScrollToTop />
                contact-us.........
            </>
        ),
    },
    {
        path: 'e-commerce/newsletter',
        element: (
            <>
                <ScrollToTop />
                newsletter.........
            </>
        ),
    },
    {
        path: 'e-commerce/policy',
        element: (
            <>
                <ScrollToTop />
                policy.........
            </>
        ),
    },
    {
        path: 'e-commerce/topics',
        element: (
            <>
                <ScrollToTop />
                topics.........
            </>
        ),
    },
    {
        path: 'e-commerce/partnership-brands',
        element: (
            <>
                <ScrollToTop />
                partnership-brands.........
            </>
        ),
    },
    {
        path: 'e-commerce/achievements',
        element: (
            <>
                {' '}
                <ScrollToTop />
                achievements.........
            </>
        ),
    },
    {
        path: 'e-commerce/testimonials',
        element: (
            <>
                {' '}
                <ScrollToTop />
                testimonials.........
            </>
        ),
    },
    {
        path: 'e-commerce/reviews',
        element: (
            <>
                {' '}
                <ScrollToTop />
                reviews.........
            </>
        ),
    },
    {
        path: 'e-commerce/integrations',
        element: (
            <>
                {' '}
                <ScrollToTop />
                integrations.........
            </>
        ),
    },
    {
        path: 'e-commerce/general-seo',
        element: (
            <>
                {' '}
                <ScrollToTop />
                general-seo.........
            </>
        ),
    },
    {
        path: 'e-commerce/questions',
        element: (
            <>
                {' '}
                <ScrollToTop />
                questions.........
            </>
        ),
    },
    {
        path: 'e-commerce/custom-sections',
        element: (
            <>
                {' '}
                <ScrollToTop />
                custom-sections.........
            </>
        ),
    },
    {
        path: 'inventory',
        element: (
            <>
                {' '}
                <ScrollToTop />
                Inventory.........
            </>
        ),
    },
    {
        path: 'inventory/stock-adjustment',
        element: (
            <>
                {' '}
                <ScrollToTop />
                adjustment.........
            </>
        ),
    },
    {
        path: 'inventory/stock-movement',
        element: (
            <>
                {' '}
                <ScrollToTop />
                stock movement.........
            </>
        ),
    },
    {
        path: 'inventory/receivable-stock',
        element: (
            <>
                {' '}
                <ScrollToTop />
                receivable-stock.........
            </>
        ),
    },
    {
        path: 'inventory/warehouse-access',
        element: (
            <>
                {' '}
                <ScrollToTop />
                warehouse-access.........
            </>
        ),
    },
    {
        path: 'settings/account-settings',
        element: (
            <>
                {' '}
                <ScrollToTop />
                account-settings.........
            </>
        ),
    },
    {
        path: 'settings/company-settings/company-info',
        element: (
            <>
                <ScrollToTop />
                <Company_Info />
            </>
        ),
    },
    {
        path: 'settings/company-settings/domain-url',
        element: (
            <>
                <ScrollToTop />
                <Domain_url />
            </>
        ),
    },
    {
        path: 'settings/company-settings/branding',
        element: (
            <>
                <ScrollToTop />
                <Branding />
            </>
        ),
    },
    {
        path: 'settings/company-settings/locations',
        element: (
            <>
                <ScrollToTop />
                <Business_location />
            </>
        ),
    },
    {
        path: 'settings/company-settings/domain',
        element: (
            <>
                <ScrollToTop />
                <Domain_url />
            </>
        ),
    },
];
