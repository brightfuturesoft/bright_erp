import React from 'react';

const CustomerShocaseCart = ({ itm }) => {
    const { title, amount, subAmount, icon } = itm;
    return (
        <div
            style={{
                boxShadow: '#0d0d0d0 8px 9px 5px',
            }}
            className="dark:bg-gray-700 bg-[#f8f4f4] border  dark:!border-gray-500  border-[#ff006f37] hover:shadow-xl duration-200 rounded md:p-6 p-2 md:h-auto h-[90px] flex items-center md:space-x-4 space-x-1"
        >
            <div className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex items-center justify-center dark:bg-light-dark bg-[#ff008010]  text-[red] dark:text-light rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="md:text-sm text-xs font-medium dark:text-gray-400 text-gray-700">
                    {title}
                </h3>
                <p className="md:text-xl text-sm flex gap-2 font-semibold dark:text-danger text-gray-900">
                    {subAmount ? `${subAmount}/` : ''}৳ {amount}
                </p>
            </div>
        </div>
    );
};

export default CustomerShocaseCart;
