import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import CustomerDetailOrders from './order/CustomerDetailOrder';
import Deliveries from './order/Deliveries/Deliveries';
const RelatedInformationTabs = ({ customerId }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const tabsData = [
        {
            id: 1,
            name: 'Orders',
            key: '1',
            component: _jsx(CustomerDetailOrders, { customerId: customerId }),
        },
        {
            id: 2,
            name: 'Deliveries',
            key: '2',
            component: _jsx(Deliveries, { customerId: customerId }),
        },
    ];
    const items = tabsData.map(tab => ({
        label: tab.name,
        key: tab.id.toString(),
        children: tab.component,
    }));
    const renderTabBar = (props, DefaultTabBar) =>
        _jsx(StickyBox, {
            offsetTop: 64,
            offsetBottom: 20,
            style: { zIndex: 1 },
            children: _jsx(DefaultTabBar, {
                ...props,
                style: { background: colorBgContainer },
            }),
        });
    return _jsxs(_Fragment, {
        children: [
            _jsx(Tabs, {
                className: 'hidden md:block w-full',
                defaultActiveKey: '0',
                renderTabBar: renderTabBar,
                items: items,
            }),
            _jsx('div', {
                className:
                    'block md:hidden absolute top-0 right-0 bottom-0 left-0 w-full',
                children: _jsx('div', {
                    className: 'md:pb-0 pb-20',
                    children: _jsx(Tabs, {
                        defaultActiveKey: '0',
                        renderTabBar: renderTabBar,
                        items: items,
                    }),
                }),
            }),
        ],
    });
};
export default RelatedInformationTabs;
