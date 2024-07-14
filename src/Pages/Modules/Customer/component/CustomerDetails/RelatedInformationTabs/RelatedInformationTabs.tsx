import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import Ledger from './Ledger/Ledger';

const tabsData = [
    { id: 0, name: 'Ledger', key: '0', table: <Ledger /> },
    { id: 1, name: 'Orders', key: '1', table: 'Order table data is here' },
    {
        id: 2,
        name: 'Deliveries',
        key: '2',
        table: 'Deliveries Order table data is here',
    },
    {
        id: 3,
        name: 'Direct Sales',
        key: '3',
        table: 'Direct Sales Order table data is here',
    },
    { id: 4, name: 'Invoice', key: '4', table: 'Invoice table data is here' },
];

const items = tabsData.map(tab => ({
    label: tab.name,
    key: tab.id.toString(),
    children: tab.table,
}));

const RelatedInformationTabs: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
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
                <Tabs
                    defaultActiveKey="0"
                    renderTabBar={renderTabBar}
                    items={items}
                />
            </div>
        </>
    );
};

export default RelatedInformationTabs;
