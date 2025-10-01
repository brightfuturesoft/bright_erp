import React, { useContext, useMemo, useState, useEffect } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { Erp_context } from '@/provider/ErpContext';

interface DataType {
    key: string;
    photo: string;
    name: string;
    price: number;
    order_count: number;
}

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
}
const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
            type="text"
            size="small"
            icon={<HolderOutlined />}
            style={{ cursor: 'move' }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};

const Row: React.FC<any> = props => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props['data-row-key'] });
    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
    const contextValue = useMemo<RowContextProps>(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners]
    );
    return (
        <RowContext.Provider value={contextValue}>
            <tr
                {...props}
                ref={setNodeRef}
                style={style}
                {...attributes}
            />
        </RowContext.Provider>
    );
};

const TopSaleingItems: React.FC = () => {
    const { user } = useContext(Erp_context);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
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
                const itemMap: Record<string, DataType> = {};
                data.data.forEach((order: any) => {
                    order.products.forEach((product: any) => {
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
    const onDragEnd = ({ active, over }: DragEndEvent) => {
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

    const columns: ColumnsType<DataType> = [
        {
            key: 'sort',
            align: 'center',
            width: 80,
            render: () => <DragHandle />,
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: text => (
                <img
                    src={text}
                    alt="product"
                    className="rounded"
                    style={{ width: 50, height: 'auto' }}
                />
            ),
        },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Price', dataIndex: 'price' },
        { title: 'Order Count', dataIndex: 'order_count' },
    ];

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="space-y-3 mt-2">
            <DashboardTitle title={'Top Selling Items'} />
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={dataSource.map(i => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        rowKey="key"
                        components={{ body: { row: Row } }}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default TopSaleingItems;
