import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const PurchaseReport = ({ strokeWidth, strokeColor, trailColor }) => {
    const { user } = useContext(Erp_context);
    const [purchasingInfo, setPurchasingInfo] = useState({
        totalPurchaseAmount: 0,
        totalVATAmount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}items/item/get-item`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id,
                            workspace_id: user?.workspace_id,
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch items');
                const data = await res.json();
                const products = data.data.filter(
                    item => item.item_type === 'product'
                );
                let totalPurchase = 0;
                let totalVAT = 0;
                products.forEach(item => {
                    const price = parseFloat(item.purchasing_price || 0);
                    const vatPercent = parseFloat(item.purchasing_vat || 0);
                    const vatAmount = (price * vatPercent) / 100;
                    totalVAT += vatAmount;
                    totalPurchase += price + vatAmount;
                });
                setPurchasingInfo({
                    totalPurchaseAmount: parseFloat(totalPurchase.toFixed(2)),
                    totalVATAmount: parseFloat(totalVAT.toFixed(2)),
                });
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [user]);
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    const maxTarget = 1000000;
    const averageProgressPercent = parseFloat(
        Math.min(
            (purchasingInfo.totalPurchaseAmount / maxTarget) * 100,
            100
        ).toFixed(2)
    );
    return _jsxs('div', {
        className:
            'flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400',
        children: [
            _jsxs('div', {
                children: [
                    _jsx('h1', {
                        className: 'font-[200] text-2xl dark:text-gray-300',
                        children: 'Purchase Report',
                    }),
                    _jsx('h1', {
                        className: 'text-gray-500 text-md',
                        children: 'This Month',
                    }),
                    _jsxs('p', {
                        className: 'mt-5 font-bold text-green-500',
                        children: [
                            'Total:',
                            ' ',
                            _jsx('span', {
                                className: 'text-red-500',
                                children:
                                    purchasingInfo.totalPurchaseAmount -
                                    purchasingInfo.totalVATAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 text-gray-500',
                        children: [
                            'VAT Included:',
                            ' ',
                            _jsx('span', {
                                className: 'text-blue-500',
                                children: purchasingInfo.totalVATAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 font-semibold',
                        children: [
                            'Total (Including VAT):',
                            ' ',
                            _jsx('span', {
                                className: 'text-purple-500',
                                children:
                                    purchasingInfo.totalPurchaseAmount +
                                    purchasingInfo.totalVATAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                ],
            }),
            _jsx(Flex, {
                align: 'center',
                wrap: true,
                gap: 0,
                children: _jsx(Progress, {
                    type: 'circle',
                    percent: averageProgressPercent,
                    size: 'default',
                    strokeWidth: strokeWidth,
                    strokeColor: strokeColor,
                    trailColor: trailColor,
                }),
            }),
        ],
    });
};
export default PurchaseReport;
