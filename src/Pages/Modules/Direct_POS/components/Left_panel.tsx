import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Category_card from '../components/Category_card';
import Product_data from '../components/Product_data';

const Left_panel = ({
    categories,
    visible_categories,
    selected_category,
    set_selected_category,
    page,
    setPage,
    itemsPerView,
    endIndex,
    cart_items,
    handleReset,
    heldOrders,
    set_is_hold_list_modal_visible,
    filtered_products,
    add_to_cart,
    search_term,
    set_search_term,
    handle_search_key_down,
}: any) => {
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            {/* Header Buttons */}
            <div className="flex gap-3 mb-6">
                <Link to={'/dashboard/pos/orders'}>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        📋 View Orders
                    </button>
                </Link>
                <button
                    onClick={handleReset}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    🔄 Reset
                </button>
                <Link to={'/dashboard/pos/orders'}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        💳 Transaction
                    </button>
                </Link>
                {heldOrders?.length > 0 && (
                    <button
                        onClick={() => set_is_hold_list_modal_visible(true)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        Pending Orders ({heldOrders.length})
                    </button>
                )}
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white text-black ">
                        Categories
                    </h2>
                    <div className="flex justify-end gap-2 ">
                        <button
                            onClick={() =>
                                setPage((p: number) => Math.max(0, p - 1))
                            }
                            disabled={page === 0}
                            className="dark:bg-white bg-gray-900 hover:bg-gray-50 disabled:dark:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <ChevronLeftIcon
                                className={`w-5 h-5 ${page === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                            />
                        </button>
                        <button
                            onClick={() =>
                                setPage((p: number) =>
                                    Math.min(
                                        Math.ceil(
                                            (categories?.length || 0) /
                                                itemsPerView
                                        ) - 1,
                                        p + 1
                                    )
                                )
                            }
                            disabled={endIndex >= (categories?.length || 0)}
                            className="dark:bg-white bg-gray-900 hover:bg-gray-50 disabled:dark:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <ChevronRightIcon
                                className={`w-5 h-5 ${endIndex >= (categories?.length || 0) ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                            />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    {visible_categories?.map((category: any) => (
                        <Category_card
                            key={category._id}
                            category={category}
                            selected_category={selected_category}
                            set_selected_category={set_selected_category}
                        />
                    ))}
                </div>
                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 gap-1">
                    {Array.from(
                        {
                            length: Math.ceil(
                                (categories?.length || 0) / itemsPerView
                            ),
                        },
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    page === index
                                        ? 'bg-orange-400 w-6'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        )
                    )}
                </div>
            </div>
            {/* Products Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white text-black">
                        Products
                    </h2>
                    <div className="relative">
                        <input
                            value={search_term}
                            onKeyDown={handle_search_key_down}
                            onChange={e => set_search_term(e.target.value)}
                            type="text"
                            placeholder="Search Product"
                            className="pl-3 pr-3 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {filtered_products.map((product: any) => (
                        <Product_data
                            add_to_cart={add_to_cart}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Left_panel;
