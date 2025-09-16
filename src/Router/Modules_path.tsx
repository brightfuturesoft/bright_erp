import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { RequirePermission } from '@/Router/Private/Modules_private';
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
import PosOrder from '@/Pages/Modules/pos/order/PosOrder';
import OrderInvoice from '@/Pages/Modules/pos/order/components/OrderInvoice';
import Profile_Info from '@/Pages/Modules/settings/account_settings/profile_info/Profile_Info';
import Change_Password from '@/Pages/Modules/settings/account_settings/change_password/Change_Password';
import Security from '@/Pages/Modules/settings/account_settings/security/security';
import Language from '@/Pages/Modules/settings/general_settings/language/language';
import Time_Zone from '@/Pages/Modules/settings/general_settings/time_zone/Time_Zone';
import Currency from '@/Pages/Modules/settings/general_settings/currency/Currency';
import RoleManagement from '@/Pages/Modules/settings/user_role/rolemanagement/RoleManagement';
import UserPage from '@/Pages/Modules/settings/user_role/user/User';
import FaqPage from '@/Pages/Modules/settings/faq_setting/ faq/Faq';
import User_Support_Ticket from '@/Pages/Modules/settings/support/user_support_ticket/User_Support_Ticket';
import KnowledgeBaseSupportTicket from '@/Pages/Modules/settings/support/knowledge_base_support_ticket/knowledge_base_support_ticket';
import Banners from '@/Pages/Modules/E_Commerce/banners/Banners';
import ContactsPage from '@/Pages/Modules/E_Commerce/contact/contact';
import BlogCategoriesPage from '@/Pages/Modules/E_Commerce/blog_category/blog_category';
import BlogsPage from '@/Pages/Modules/E_Commerce/blogs/Blogs';
import CouponsPage from '@/Pages/Modules/E_Commerce/coupon/Coupon';

const AutoLanding = () => {
    const ctx = useContext(Erp_context);
    const [path, setPath] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const userId =
                    (ctx?.user as any)?._id || (ctx?.user as any)?.id;
                if (!userId) {
                    setPath('business');
                    return;
                }
                const res = await fetch(
                    `${getBaseUrl}/settings/user-role/users-with-roles?user_id=${encodeURIComponent(userId)}`,
                    { credentials: 'include' }
                );
                const data = await res.json();
                const me = (data?.data || [])[0];
                const rawPerms: string[] = (me?.role?.permissions ||
                    me?.role_permissions ||
                    []) as string[];
                // Normalize perms by stripping suffixes and standardizing names
                const norm = new Set<string>();
                rawPerms.forEach(p => {
                    const base = String(p).split(':')[0];
                    norm.add(base);
                    if (base === 'item') norm.add('items');
                    if (base === 'items') norm.add('item');
                    if (base === 'sale') norm.add('sales');
                    if (base === 'sales') norm.add('sale');
                    if (base === 'ecommerce') norm.add('e-commerce');
                    if (base === 'e-commerce') norm.add('ecommerce');
                });
                const has = (required: string) => {
                    const group = String(required).split(':')[0];
                    return norm.has(group);
                };
                // If no permissions assigned, land on dashboard by default
                if (norm.size === 0) {
                    setPath('business');
                    return;
                }
                if (has('dashboard:view')) {
                    setPath('business');
                    return;
                }
                if (has('items:view')) {
                    setPath('item');
                    return;
                }
                if (has('customer:view')) {
                    setPath('customer');
                    return;
                }
                if (has('sales:view')) {
                    setPath('sale');
                    return;
                }
                if (has('pos:view')) {
                    setPath('pos');
                    return;
                }
                if (has('inventory:view')) {
                    setPath('inventory');
                    return;
                }
                setPath('settings/account-settings/profile-info');
            } catch {
                setPath('business');
            }
        };
        load();
    }, [ctx?.user]);

    if (!path) return null;
    return (
        <Navigate
            to={path}
            replace
        />
    );
};

export const Modules_path = [
    {
        path: '',
        element: (
            <>
                <ScrollToTop />
                <AutoLanding />
            </>
        ), // Redirect from default path to 'business'
    },
    {
        path: 'business',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="dashboard:view"
                    element={<Buisness />}
                />
            </>
        ),
    },
    {
        path: 'accounting',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="accounting:view"
                    element={<Accounting />}
                />
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
                <RequirePermission
                    permission="customer:view"
                    element={<Manage_Customer />}
                />
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
                <RequirePermission
                    permission="items:view"
                    element={<Category />}
                />
            </>
        ),
    },
    {
        path: 'item/category',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<Category />}
                />
            </>
        ),
    },
    {
        path: 'item/items',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<Items />}
                />
            </>
        ),
    },
    {
        path: 'item/items/create_item',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<AddSingleItem />}
                />
            </>
        ),
    },
    {
        path: 'item/items/edit_item/:id',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<EditSingleItem />}
                />
            </>
        ),
    },
    {
        path: 'item/manufacturer',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<Manufacturers />}
                />
            </>
        ),
    },
    {
        path: 'item/brand',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<Brand />}
                />
            </>
        ),
    },
    {
        path: 'item/color',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<Color />}
                />
            </>
        ),
    },
    {
        path: 'item/size_type',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<SizeType />}
                />
            </>
        ),
    },
    {
        path: 'item/attribute_set',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="items:view"
                    element={<AttributeSet />}
                />
            </>
        ),
    },

    {
        path: 'sale',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<DirectSale />}
                />
            </>
        ),
    },
    {
        path: 'sale/direct-sale',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<DirectSale />}
                />
            </>
        ),
    },
    {
        path: 'sale/quotation',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Quotation />}
                />
            </>
        ),
    },
    {
        path: 'sale/order',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Order />}
                />
            </>
        ),
    },
    {
        path: 'sale/delivery',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Delivery />}
                />
            </>
        ),
    },
    {
        path: 'sale/invoice',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Invoice />}
                />
            </>
        ),
    },
    {
        path: 'sale/return',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Return />}
                />
            </>
        ),
    },
    {
        path: 'sale/batch-payment',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<BatchPayment />}
                />
            </>
        ),
    },
    {
        path: 'sale/payment',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Payment />}
                />
            </>
        ),
    },
    {
        path: 'sale/customer-debit',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<CustomerDebit />}
                />
            </>
        ),
    },
    {
        path: 'sale/refund',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<Refund />}
                />
            </>
        ),
    },
    {
        path: 'pos',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<div>POS..........</div>}
                />
                ,
            </>
        ),
    },
    {
        path: 'pos/outlet',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>Outlet............</>}
                />
            </>
        ),
    },
    {
        path: 'pos/counter',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>Counter............</>}
                />
            </>
        ),
    },
    {
        path: 'pos/outlet-sessions',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>Session.....</>}
                />
            </>
        ),
    },
    {
        path: 'pos/counter-sessions',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>counter-sessions......</>}
                />
            </>
        ),
    },
    {
        path: 'pos/orders',
        element: (
            <RequirePermission
                permission="pos:view"
                element={<PosOrder />}
            />
        ),
    },
    {
        path: 'pos/order/invoice/:id',
        element: <OrderInvoice />,
    },
    {
        path: 'pos/return',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>Return.........</>}
                />
            </>
        ),
    },
    {
        path: 'pos/barcode',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<>Barcode........</>}
                />
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
    // Ecommerce Path
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
        element: <Ecommerce_Order />,
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
        element: <ManageCustomer />,
    },
    {
        path: 'e-commerce/customers-carts',
        element: <CustomerCarts />,
    },
    {
        path: 'e-commerce/banners',
        element: <Banners />,
    },
    {
        path: 'e-commerce/contact-us',
        element: <ContactsPage />,
    },
    {
        path: 'e-commerce/blog-category',
        element: <BlogCategoriesPage />,
    },
    {
        path: 'e-commerce/blogs',
        element: <BlogsPage />,
    },
    {
        path: 'e-commerce/coupon',
        element: <CouponsPage />,
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
        path: 'settings/account-settings/profile-info',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Profile_Info />
            </>
        ),
    },

    {
        path: 'settings/general/language',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Language />
            </>
        ),
    },
    {
        path: 'settings/general/timezones',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Time_Zone />
            </>
        ),
    },
    {
        path: 'settings/general/currency',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Currency />
            </>
        ),
    },
    {
        path: 'settings/account-settings/change-password',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Change_Password />
            </>
        ),
    },
    {
        path: 'settings/account-settings/security',
        element: (
            <>
                {' '}
                <ScrollToTop />
                <Security />
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
    {
        path: 'settings/user-roles/roles',
        element: (
            <>
                <ScrollToTop />
                <RoleManagement />
            </>
        ),
    },
    {
        path: 'settings/user-roles/users',
        element: (
            <>
                <ScrollToTop />
                <UserPage />
            </>
        ),
    },
    {
        path: 'support/faq',
        element: (
            <>
                <ScrollToTop />
                <FaqPage />
            </>
        ),
    },
    {
        path: 'support/ticket',
        element: (
            <>
                <ScrollToTop />
                <User_Support_Ticket />
            </>
        ),
    },
    {
        path: 'support/knowledge-base',
        element: (
            <>
                <ScrollToTop />
                <KnowledgeBaseSupportTicket />
            </>
        ),
    },
];
