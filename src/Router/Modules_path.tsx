import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { RequirePermission } from '@/Router/Private/Modules_private';
import ScrollToTop from '../Hooks/ScrollTop';

// Import Pages
import Buisness from '@/Pages/Modules/dashboard/business/Buisness';
import Chart_of_account from '../Pages/Modules/accounting/pages/chartOfAccount/Chart_of_account';
import IncomeSection from '@/Pages/Modules/accounting/pages/chartOfAccount/components/income/IncomeSection';

import ManageDirectSale from '@/Pages/Modules/DirectSale/ManageDirectSale';
import Journals from '@/Pages/Modules/Transition/Journals/Journals';
import AddJournals from '@/Pages/Modules/Transition/Journals/AddJournals';
import EditJournals from '@/Pages/Modules/Transition/Journals/EditJournals';
import JournalInvoice from '@/Invoice/JournalInvoice';
import Expenses from '@/Pages/Modules/Transition/Expenses/Expenses';

import {
    Items,
    Category,
    Brand,
    Manufacturers,
    Color,
    SizeType,
    AttributeSet,
} from '@/Pages/Modules/item';
import AddSingleItem from '@/Pages/Modules/item/items/components/AddSingleItem';
import EditSingleItem from '@/Pages/Modules/item/items/components/EditSingleItem';

// --- Page Imports ---

// Accounting & Transitions

import AddExpense from '@/Pages/Modules/Transition/Expenses/AddExpense';
import EditExpense from '@/Pages/Modules/Transition/Expenses/EditExpense';
import IncomeTransition from '@/Pages/Modules/Transition/IncomeTransition/IncomeTransition';

// Sales
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

import Employees from '@/Pages/Modules/HRM/Employees/Employees';
import AddEmployees from '@/Pages/Modules/HRM/Employees/AddEmployees';
import EditEmployee from '@/Pages/Modules/HRM/Employees/EditEmployee';
import ViewDetails from '@/Pages/Modules/HRM/Employees/ViewDetails';
import Attendance from '@/Pages/Modules/HRM/Attendance/Attendance';

import OutletsPage from '@/Pages/Modules/Direct_POS/outlet/Outlet';
import Direct_Pos_Order from '@/Pages/Modules/Direct_POS/orders/Orders';
import OrderDetailsPage from '@/Pages/Modules/Direct_POS/orders/components/OrderDetailsPage';
import Return_Order from '@/Pages/Modules/Direct_POS/return/Return';
import BarcodePage from '@/Pages/Modules/Direct_POS/barcode/Barcode';
import OrderInvoice from '@/Pages/Modules/pos/order/components/OrderInvoice';

// E-Commerce
import Ecommerce_Order from '@/Pages/Modules/E_Commerce/Order/Order';
import EcommerceOrderDetailsPage from '@/Pages/Modules/E_Commerce/Order/components/OrderDetails';
import ManageCustomer from '../Pages/Modules/E_Commerce/coustomers/Manage_Customer';
import CustomerDetails from '@/Pages/Modules/E_Commerce/coustomers/components/CustomerDetails/CustomerDetails';
import CustomerAllOrders from '@/Pages/Modules/E_Commerce/coustomers/components/ReletedInformation/order/StandOrder/CustomerAllOrders';
import CustomerCarts from '@/Pages/Modules/E_Commerce/customer_carts/CustomerCarts';
import CustomerWishlist from '@/Pages/Modules/E_Commerce/customer_wishlist/Customer_wishlist';
import Banners from '@/Pages/Modules/E_Commerce/banners/Banners';
import ContactsPage from '@/Pages/Modules/E_Commerce/contact/contact';
import BlogCategoriesPage from '@/Pages/Modules/E_Commerce/blog_category/Blog_Category';
import BlogsPage from '@/Pages/Modules/E_Commerce/blogs/Blogs';
import CouponsPage from '@/Pages/Modules/E_Commerce/coupon/Coupon';
import PoliciesPage from '@/Pages/Modules/E_Commerce/policy/Policy';
import PartnershipBrandsPage from '@/Pages/Modules/E_Commerce/partnership_brands/Partnership_Brands';
import SocialLinksPage from '@/Pages/Modules/E_Commerce/intigration/Intagration';
import PromotionsPage from '@/Pages/Modules/E_Commerce/promotions/Promotions';
import CustomSectionsPage from '@/Pages/Modules/E_Commerce/custom_section/Custom_Section';
import FaqsPage from '@/Pages/Modules/E_Commerce/questions/Questions';
import ReviewsPage from '@/Pages/Modules/E_Commerce/reviews/Reviews';
import AchievementsPage from '@/Pages/Modules/E_Commerce/achivements/Achivements';
import TestimonialsPage from '@/Pages/Modules/E_Commerce/testimonails/Testimonials';
import NewslettersPage from '@/Pages/Modules/E_Commerce/newsletter/NewsLetter';
import SEOPage from '@/Pages/Modules/E_Commerce/general_seo/General_Seo';
import ThemeCustomizer from '@/Pages/Modules/E_Commerce/setting/Setting';

import Company_Info from '@/Pages/Modules/settings/company_settings/company_info/Company_info';
import Domain_url from '@/Pages/Modules/settings/company_settings/domain_url/Domain_url';
import Branding from '@/Pages/Modules/settings/company_settings/branding/Branding';
import Business_location from '@/Pages/Modules/settings/company_settings/business_locations/Business_location';
import Profile_Info from '@/Pages/Modules/settings/account_settings/profile_info/Profile_Info';
import Change_Password from '@/Pages/Modules/settings/account_settings/change_password/Change_Password';
import Security from '@/Pages/Modules/settings/account_settings/security/Security';
import Language from '@/Pages/Modules/settings/general_settings/language/Language';
import Time_Zone from '@/Pages/Modules/settings/general_settings/time_zone/Time_Zone';
import Currency from '@/Pages/Modules/settings/general_settings/currency/Currency';
import RoleManagement from '@/Pages/Modules/settings/user_role/rolemanagement/RoleManagement';
import UserPage from '@/Pages/Modules/settings/user_role/user/User';
import FaqPage from '@/Pages/Modules/settings/faq_setting/ faq/Faq';
import User_Support_Ticket from '@/Pages/Modules/settings/support/user_support_ticket/User_Support_Ticket';
import KnowledgeBaseSupportTicket from '@/Pages/Modules/settings/support/knowledge_base_support_ticket/knowledge_base_support_ticket';
import Add_customer_modal from '@/Pages/Modules/Direct_POS/components/Add_customer_modal';
import AddDirectSale from '@/Pages/Modules/sale/directSale/components/Direct_Sale_Add_Page';
import Refund_Order from '@/Pages/Modules/Direct_POS/refund/Refund';
import AddIncome from '@/Pages/Modules/Transition/IncomeTransition/AddIncome';
import EditIncome from '@/Pages/Modules/Transition/IncomeTransition/EditIncome';
import TermsPage from '@/Pages/Modules/E_Commerce/terms/Terms';
import DirectSaleDetails from '@/Pages/Modules/sale/directSale/components/DirectSaleDetails';
import Manage_Customer from '@/Pages/Modules/customers/Mange_Customers';
import Ware_House from '@/Pages/Modules/DirectSale/Inventory/ware_house/Ware_House';
import Stock_Check from '@/Pages/Modules/DirectSale/Inventory/stock_check/Stock_Check';
import Stock_Request from '@/Pages/Modules/DirectSale/Inventory/stock_request/Stock_Request';
import Shiping_Setting from '@/Pages/Modules/settings/shiping_settings/Shiping_Settings';
import CustomersDetails from '@/Pages/Modules/customers/components/customerdetails/CustomerDetails';
import PosCustomerDetials from '@/Pages/Modules/customers/components/poscustomerdetails/PosCustomerDetials';
import UnderConstructionPage from '@/Pages/UnderConstructionPage/UnderConstructionPage';
import FlashSalePage from '@/Pages/Modules/E_Commerce/promotions/components/FlashSalePage';

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

                if (norm.size === 0 || has('dashboard:view')) {
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
    // --- Auto Landing Route ---
    {
        path: '',
        element: (
            <>
                <ScrollToTop />
                <AutoLanding />
            </>
        ),
    },
    // --- Dashboard ---
    {
        path: 'business',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="business:view"
                    element={<Buisness />}
                />
            </>
        ),
    },
    // --- Accounting ---
    {
        path: 'accounting',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="accounting:view"
                    element={<UnderConstructionPage />}
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
        path: 'accounting/chart_of_account/expenses',
        element: (
            <>
                <ScrollToTop />
                <Expenses />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/expenses/add_expenses',
        element: (
            <>
                <ScrollToTop />
                <AddExpense />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/expenses/edit_expense/:id',
        element: (
            <>
                <ScrollToTop />
                <EditExpense />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/income',
        element: (
            <>
                <ScrollToTop />
                <IncomeTransition />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/income/add_income',
        element: (
            <>
                <ScrollToTop />
                <AddIncome />
            </>
        ),
    },
    {
        path: 'accounting/chart_of_account/income/edit_income/:id',
        element: (
            <>
                <ScrollToTop />
                <EditIncome />
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
    // --- Customers ---
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
        path: 'customer/e-commerce/customer-details/:id',
        element: <CustomersDetails />,
    },
    {
        path: 'customer/pos/customer-details/:id',
        element: <PosCustomerDetials />,
    },
    {
        path: 'customer/add-customer',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="customer:add"
                    element={<Add_customer_modal />}
                />
            </>
        ),
    },

    // --- Direct Sale ---
    {
        path: 'direct-sale',
        element: (
            <>
                <ScrollToTop />
                <ManageDirectSale />
            </>
        ),
    },
    // --- Items ---
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
    // --- Sales ---
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
        path: 'sale/direct-sale/direct-sale-create',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<AddDirectSale />}
                />
            </>
        ),
    },

    {
        path: 'sale/direct-sale/:id',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="sales:view"
                    element={<DirectSaleDetails />}
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
    // --- Direct POS ---
    {
        path: 'pos',
        element: (
            <>
                <ScrollToTop />

                <RequirePermission
                    permission="pos:view"
                    element={<Direct_Pos_Order />}
                />

                <RequirePermission
                    permission="pos:view"
                    element={<Direct_Pos_Order />}
                />
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
                    element={<OutletsPage />}
                />
            </>
        ),
    },
    {
        path: 'pos/orders',
        element: (
            <RequirePermission
                permission="pos:view"
                element={<Direct_Pos_Order />}
            />
        ),
    },
    {
        path: 'pos/orders/:id',
        element: <OrderDetailsPage />,
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
                    element={<Return_Order />}
                />
            </>
        ),
    },
    {
        path: 'pos/refund',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="pos:view"
                    element={<Refund_Order />}
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
                    element={<BarcodePage />}
                />
            </>
        ),
    },
    // --- E-Commerce ---
    {
        path: 'e-commerce',
        element: (
            <>
                <ScrollToTop />
                <Ecommerce_Order />
            </>
        ),
    },
    {
        path: 'e-commerce/orders',
        element: <Ecommerce_Order />,
    },
    {
        path: 'e-commerce/orders/:id',
        element: <EcommerceOrderDetailsPage />,
    },
    {
        path: 'e-commerce/customers',
        element: <ManageCustomer />,
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
        path: 'customer/e-commerce/customer-details/:customerId/orders',
        element: <CustomerAllOrders />,
    },
    {
        path: 'e-commerce/customers-carts',
        element: <CustomerCarts />,
    },
    {
        path: 'e-commerce/customers-wishist',
        element: <CustomerWishlist />,
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
        path: 'e-commerce/policy',
        element: <PoliciesPage />,
    },
    {
        path: 'e-commerce/terms',
        element: <TermsPage />,
    },
    {
        path: 'e-commerce/integrations',
        element: <SocialLinksPage />,
    },
    {
        path: 'e-commerce/promotions',
        element: <PromotionsPage />,
    },
    {
        path: 'e-commerce/promotions/create-promotions',
        element: <FlashSalePage />,
    },
    {
        path: 'e-commerce/promotions/update-promotions',
        element: <FlashSalePage />,
    },
    {
        path: 'e-commerce/partnership-brands',
        element: <PartnershipBrandsPage />,
    },
    {
        path: 'e-commerce/custom-sections',
        element: <CustomSectionsPage />,
    },
    {
        path: 'e-commerce/questions',
        element: <FaqsPage />,
    },
    {
        path: 'e-commerce/reviews',
        element: <ReviewsPage />,
    },
    {
        path: 'e-commerce/achievements',
        element: <AchievementsPage />,
    },
    {
        path: 'e-commerce/testimonials',
        element: <TestimonialsPage />,
    },
    {
        path: 'e-commerce/newsletter',
        element: <NewslettersPage />,
    },
    {
        path: 'e-commerce/general-seo',
        element: <SEOPage />,
    },
    {
        path: 'e-commerce/settings',
        element: <ThemeCustomizer />,
    },
    {
        path: 'inventory',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="inventory:view"
                    element={<Ware_House />}
                />
            </>
        ),
    },

    {
        path: 'report/general',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="inventory:view"
                    element={<UnderConstructionPage />}
                />
            </>
        ),
    },

    {
        path: 'hr-module/employees',
        element: <Employees />,
    },
    {
        path: 'hr-module/employees/add-employees',
        element: (
            <>
                <ScrollToTop />
                <AddEmployees />
            </>
        ),
    },
    {
        path: 'hr-module/employees/edit-employees/:id',
        element: (
            <>
                <ScrollToTop />
                <EditEmployee />
            </>
        ),
    },
    {
        path: 'hr-module/employees/view-details/:id',
        element: (
            <>
                <ScrollToTop />
                <ViewDetails />
            </>
        ),
    },
    {
        path: 'hr-module/attendance',
        element: (
            <>
                <ScrollToTop />
                <Attendance />
            </>
        ),
    },
    {
        path: 'settings/account-settings/profile-info',
        element: (
            <>
                <ScrollToTop />
                <Profile_Info />
            </>
        ),
    },
    {
        path: 'settings/account-settings/change-password',
        element: (
            <>
                <ScrollToTop />
                <Change_Password />
            </>
        ),
    },
    {
        path: 'settings/account-settings/security',
        element: (
            <>
                <ScrollToTop />
                <Security />
            </>
        ),
    },
    {
        path: 'settings/account-settings/notifications',
        element: (
            <>
                <ScrollToTop />
                <UnderConstructionPage />
            </>
        ),
    },
    {
        path: 'settings/general/language',
        element: (
            <>
                <ScrollToTop />
                <Language />
            </>
        ),
    },
    {
        path: 'settings/general/timezones',
        element: (
            <>
                <ScrollToTop />
                <Time_Zone />
            </>
        ),
    },
    {
        path: 'settings/general/currency',
        element: (
            <>
                <ScrollToTop />
                <Currency />
            </>
        ),
    },
    {
        path: 'settings/general/units',
        element: (
            <>
                <ScrollToTop />
                <UnderConstructionPage />
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
        path: 'settings/shipping/methods',
        element: (
            <>
                <ScrollToTop />
                <Shiping_Setting />
            </>
        ),
    },
    {
        path: 'settings/shipping/zones',
        element: (
            <>
                <ScrollToTop />
                <UnderConstructionPage />
            </>
        ),
    },
    // --- Support ---
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
    {
        path: 'inventory/stock-check',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="inventory:view"
                    element={<UnderConstructionPage />}
                />
            </>
        ),
    },
    {
        path: 'inventory/stock-request',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="inventory:view"
                    element={<UnderConstructionPage />}
                />
            </>
        ),
    },
    {
        path: 'inventory/ware-house',
        element: (
            <>
                <ScrollToTop />
                <RequirePermission
                    permission="inventory:view"
                    element={<UnderConstructionPage />}
                />
            </>
        ),
    },
];
