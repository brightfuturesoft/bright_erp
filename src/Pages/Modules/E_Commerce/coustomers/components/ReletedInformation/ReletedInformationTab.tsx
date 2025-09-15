import React from 'react';
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
            component: <CustomerDetailOrders customerId={customerId} />,
        },
        {
            id: 2,
            name: 'Deliveries',
            key: '2',
            component: <Deliveries customerId={customerId} />,
        },
    ];

    const items = tabsData.map(tab => ({
        label: tab.name,
        key: tab.id.toString(),
        children: tab.component,
    }));

    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox
            offsetTop={64}
            offsetBottom={20}
            style={{ zIndex: 1 }}
        >
            <DefaultTabBar
                {...props}
                style={{ background: colorBgContainer }}
            />
        </StickyBox>
    );

    return (
        <>
            <Tabs
                className="hidden md:block w-full"
                defaultActiveKey="0"
                renderTabBar={renderTabBar}
                items={items}
            />
            <div className="block md:hidden absolute top-0 right-0 bottom-0 left-0 w-full">
                <div className="md:pb-0 pb-20">
                    <Tabs
                        defaultActiveKey="0"
                        renderTabBar={renderTabBar}
                        items={items}
                    />
                </div>
            </div>
        </>
    );
};

export default RelatedInformationTabs;
