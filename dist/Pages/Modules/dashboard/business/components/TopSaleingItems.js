import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { Erp_context } from '@/provider/ErpContext';
const RowContext = React.createContext({});
const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return _jsx(Button, {
        type: 'text',
        size: 'small',
        icon: _jsx(HolderOutlined, {}),
        style: { cursor: 'move' },
        ref: setActivatorNodeRef,
        ...listeners,
    });
};
const Row = props => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props['data-row-key'] });
    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
    const contextValue = useMemo(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners]
    );
    return _jsx(RowContext.Provider, {
        value: contextValue,
        children: _jsx('tr', {
            ...props,
            ref: setNodeRef,
            style: style,
            ...attributes,
        }),
    });
};
const TopSaleingItems = () => {
    const { user } = useContext(Erp_context);
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}ecommerce/orders/get-order`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id || '',
                            workspace_id: user?.workspace_id || '',
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                const itemMap = {};
                data.data.forEach(order => {
                    order.products.forEach(product => {
                        if (!itemMap[product.product_name]) {
                            itemMap[product.product_name] = {
                                key: product.product_id,
                                photo: product.product_image,
                                name: product.product_name,
                                price: product.order_price,
                                order_count: product.quantity,
                            };
                        } else {
                            itemMap[product.product_name].order_count +=
                                product.quantity;
                        }
                    });
                });
                const topItems = Object.values(itemMap)
                    .sort((a, b) => b.order_count - a.order_count)
                    .slice(0, 5);
                setDataSource(topItems);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (user?._id) fetchOrders();
    }, [user]);
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource(prevState => {
                const activeIndex = prevState.findIndex(
                    record => record.key === active.id
                );
                const overIndex = prevState.findIndex(
                    record => record.key === over?.id
                );
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };
    const columns = [
        {
            key: 'sort',
            align: 'center',
            width: 80,
            render: () => _jsx(DragHandle, {}),
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: text =>
                _jsx('img', {
                    src: text,
                    alt: 'product',
                    className: 'rounded',
                    style: { width: 50, height: 'auto' },
                }),
        },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Price', dataIndex: 'price' },
        { title: 'Order Count', dataIndex: 'order_count' },
    ];
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    return _jsxs('div', {
        className: 'space-y-3 mt-2',
        children: [
            _jsx(DashboardTitle, { title: 'Top Selling Items' }),
            _jsx(DndContext, {
                modifiers: [restrictToVerticalAxis],
                onDragEnd: onDragEnd,
                children: _jsx(SortableContext, {
                    items: dataSource.map(i => i.key),
                    strategy: verticalListSortingStrategy,
                    children: _jsx(Table, {
                        rowKey: 'key',
                        components: { body: { row: Row } },
                        columns: columns,
                        dataSource: dataSource,
                        pagination: false,
                    }),
                }),
            }),
        ],
    });
};
export default TopSaleingItems;
