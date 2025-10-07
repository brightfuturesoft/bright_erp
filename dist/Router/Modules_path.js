import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { RequirePermission } from '@/Router/Private/Modules_private';
import ScrollToTop from '../Hooks/ScrollTop';
// Import Pages
import Buisness from '@/Pages/Modules/dashboard/business/Buisness';
import Accounting from '@/Pages/Modules/dashboard/accounting/Accounting';
import Chart_of_account from '../Pages/Modules/accounting/pages/chartOfAccount/Chart_of_account';
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
const AutoLanding = () => {
    const ctx = useContext(Erp_context);
    const [path, setPath] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                const userId = ctx?.user?._id || ctx?.user?.id;
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
                const rawPerms =
                    me?.role?.permissions || me?.role_permissions || [];
                const norm = new Set();
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
                const has = required => {
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
    return _jsx(Navigate, { to: path, replace: true });
};
export const Modules_path = [
    // --- Auto Landing Route ---
    {
        path: '',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(AutoLanding, {})],
        }),
    },
    // --- Dashboard ---
    {
        path: 'business',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'business:view',
                    element: _jsx(Buisness, {}),
                }),
            ],
        }),
    },
    // --- Accounting ---
    {
        path: 'accounting',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'accounting:view',
                    element: _jsx(Accounting, {}),
                }),
            ],
        }),
    },
    {
        path: 'accounting/chart_of_account',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Chart_of_account, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/expenses',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Expenses, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/expenses/add_expenses',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(AddExpense, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/expenses/edit_expense/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(EditExpense, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/income',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(IncomeTransition, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/income/add_income',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(AddIncome, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/income/edit_income/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(EditIncome, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/add_journals',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(AddJournals, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/journals_details/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(JournalInvoice, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/journals',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Journals, {})],
        }),
    },
    {
        path: 'accounting/chart_of_account/journals/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(EditJournals, {})],
        }),
    },
    // --- Customers ---
    {
        path: 'customer',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'customer:view',
                    element: _jsx(Manage_Customer, {}),
                }),
            ],
        }),
    },
    {
        path: 'customer/add-customer', // Added missing route
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'customer:add',
                    element: _jsx(Add_customer_modal, {}),
                }),
            ],
        }),
    },
    // --- Direct Sale ---
    {
        path: 'direct-sale',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(ManageDirectSale, {})],
        }),
    },
    // --- Items ---
    {
        path: 'item',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Category, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/category',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Category, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/items',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Items, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/items/create_item',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(AddSingleItem, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/items/edit_item/:id',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(EditSingleItem, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/manufacturer',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Manufacturers, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/brand',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Brand, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/color',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(Color, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/size_type',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(SizeType, {}),
                }),
            ],
        }),
    },
    {
        path: 'item/attribute_set',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'items:view',
                    element: _jsx(AttributeSet, {}),
                }),
            ],
        }),
    },
    // --- Sales ---
    {
        path: 'sale',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(DirectSale, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/direct-sale',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(DirectSale, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/direct-sale/direct-sale-create',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(AddDirectSale, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/direct-sale/:id',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(DirectSaleDetails, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/quotation',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Quotation, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/order',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Order, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/delivery',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Delivery, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/invoice',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Invoice, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/return',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Return, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/batch-payment',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(BatchPayment, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/payment',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Payment, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/customer-debit',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(CustomerDebit, {}),
                }),
            ],
        }),
    },
    {
        path: 'sale/refund',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'sales:view',
                    element: _jsx(Refund, {}),
                }),
            ],
        }),
    },
    // --- Direct POS ---
    {
        path: 'pos',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(Direct_Pos_Order, {}),
                }),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(Direct_Pos_Order, {}),
                }),
            ],
        }),
    },
    {
        path: 'pos/outlet',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(OutletsPage, {}),
                }),
            ],
        }),
    },
    {
        path: 'pos/orders',
        element: _jsx(RequirePermission, {
            permission: 'pos:view',
            element: _jsx(Direct_Pos_Order, {}),
        }),
    },
    {
        path: 'pos/orders/:id',
        element: _jsx(OrderDetailsPage, {}),
    },
    {
        path: 'pos/order/invoice/:id',
        element: _jsx(OrderInvoice, {}),
    },
    {
        path: 'pos/return',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(Return_Order, {}),
                }),
            ],
        }),
    },
    {
        path: 'pos/refund',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(Refund_Order, {}),
                }),
            ],
        }),
    },
    {
        path: 'pos/barcode',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'pos:view',
                    element: _jsx(BarcodePage, {}),
                }),
            ],
        }),
    },
    // --- E-Commerce ---
    {
        path: 'e-commerce',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Ecommerce_Order, {})],
        }),
    },
    {
        path: 'e-commerce/orders',
        element: _jsx(Ecommerce_Order, {}),
    },
    {
        path: 'e-commerce/orders/:id',
        element: _jsx(EcommerceOrderDetailsPage, {}),
    },
    {
        path: 'e-commerce/customers',
        element: _jsx(ManageCustomer, {}),
    },
    {
        path: 'e-commerce/customer-details/:id',
        element: _jsx(CustomerDetails, {}),
    },
    {
        path: 'e-commerce/customer-details/:customerId/orders',
        element: _jsx(CustomerAllOrders, {}),
    },
    {
        path: 'e-commerce/customers-carts',
        element: _jsx(CustomerCarts, {}),
    },
    {
        path: 'e-commerce/customers-wishist',
        element: _jsx(CustomerWishlist, {}),
    },
    {
        path: 'e-commerce/banners',
        element: _jsx(Banners, {}),
    },
    {
        path: 'e-commerce/contact-us',
        element: _jsx(ContactsPage, {}),
    },
    {
        path: 'e-commerce/blog-category',
        element: _jsx(BlogCategoriesPage, {}),
    },
    {
        path: 'e-commerce/blogs',
        element: _jsx(BlogsPage, {}),
    },
    {
        path: 'e-commerce/coupon',
        element: _jsx(CouponsPage, {}),
    },
    {
        path: 'e-commerce/policy',
        element: _jsx(PoliciesPage, {}),
    },
    {
        path: 'e-commerce/terms',
        element: _jsx(TermsPage, {}),
    },
    {
        path: 'e-commerce/integrations',
        element: _jsx(SocialLinksPage, {}),
    },
    {
        path: 'e-commerce/promotions',
        element: _jsx(PromotionsPage, {}),
    },
    {
        path: 'e-commerce/partnership-brands',
        element: _jsx(PartnershipBrandsPage, {}),
    },
    {
        path: 'e-commerce/custom-sections',
        element: _jsx(CustomSectionsPage, {}),
    },
    {
        path: 'e-commerce/questions',
        element: _jsx(FaqsPage, {}),
    },
    {
        path: 'e-commerce/reviews',
        element: _jsx(ReviewsPage, {}),
    },
    {
        path: 'e-commerce/achievements',
        element: _jsx(AchievementsPage, {}),
    },
    {
        path: 'e-commerce/testimonials',
        element: _jsx(TestimonialsPage, {}),
    },
    {
        path: 'e-commerce/newsletter',
        element: _jsx(NewslettersPage, {}),
    },
    {
        path: 'e-commerce/general-seo',
        element: _jsx(SEOPage, {}),
    },
    {
        path: 'e-commerce/settings',
        element: _jsx(ThemeCustomizer, {}),
    },
    {
        path: 'inventory',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'inventory:view',
                    element: _jsx(Ware_House, {}),
                }),
            ],
        }),
    },
    {
        path: 'hr-module/employees',
        element: _jsx(Employees, {}),
    },
    {
        path: 'hr-module/employees/add-employees',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(AddEmployees, {})],
        }),
    },
    {
        path: 'hr-module/employees/edit-employees/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(EditEmployee, {})],
        }),
    },
    {
        path: 'hr-module/employees/view-details/:id',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(ViewDetails, {})],
        }),
    },
    {
        path: 'hr-module/attendance',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Attendance, {})],
        }),
    },
    {
        path: 'settings/account-settings/profile-info',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Profile_Info, {})],
        }),
    },
    {
        path: 'settings/account-settings/change-password',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Change_Password, {})],
        }),
    },
    {
        path: 'settings/account-settings/security',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Security, {})],
        }),
    },
    {
        path: 'settings/general/language',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Language, {})],
        }),
    },
    {
        path: 'settings/general/timezones',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Time_Zone, {})],
        }),
    },
    {
        path: 'settings/general/currency',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Currency, {})],
        }),
    },
    {
        path: 'settings/company-settings/company-info',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Company_Info, {})],
        }),
    },
    {
        path: 'settings/company-settings/domain-url',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Domain_url, {})],
        }),
    },
    {
        path: 'settings/company-settings/branding',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Branding, {})],
        }),
    },
    {
        path: 'settings/company-settings/locations',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Business_location, {})],
        }),
    },
    {
        path: 'settings/user-roles/roles',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(RoleManagement, {})],
        }),
    },
    {
        path: 'settings/user-roles/users',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(UserPage, {})],
        }),
    },
    {
        path: 'settings/shipping/methods',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Shiping_Setting, {})],
        }),
    },
    // --- Support ---
    {
        path: 'support/faq',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(FaqPage, {})],
        }),
    },
    {
        path: 'support/ticket',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(User_Support_Ticket, {})],
        }),
    },
    {
        path: 'support/knowledge-base',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(KnowledgeBaseSupportTicket, {}),
            ],
        }),
    },
    {
        path: 'inventory/stock-check',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'inventory:view',
                    element: _jsx(Stock_Check, {}),
                }),
            ],
        }),
    },
    {
        path: 'inventory/stock-request',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'inventory:view',
                    element: _jsx(Stock_Request, {}),
                }),
            ],
        }),
    },
    {
        path: 'inventory/ware-house',
        element: _jsxs(_Fragment, {
            children: [
                _jsx(ScrollToTop, {}),
                _jsx(RequirePermission, {
                    permission: 'inventory:view',
                    element: _jsx(Ware_House, {}),
                }),
            ],
        }),
    },
];
