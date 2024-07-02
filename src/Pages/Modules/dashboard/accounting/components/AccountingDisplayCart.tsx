import React from 'react';
import { Calendar } from 'lucide-react';

const AccountingDisplayCart: React.FC = ({ itm, currencySymbol }) => {
    return (
        <div className="ring-1 dark:ring-gray-700 relative overflow-hidden ring-gray-300 dark:bg-light-dark rounded p-3">
            <div className="">
                <h1 className="text-blue-500 text-xs">{itm?.title}</h1>
                <p className="dark:text-gray-300 md:text-sm text-2xl text-dark">{currencySymbol}{itm?.amount}</p>

                <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1 dark:text-gray-500 text-xs text-dark">
                        <Calendar size={16} className='' /> <span className="text-xs">{itm?.date}</span>
                    </div>
                    <span className="dark:text-gray-300 md:text-md text-xs  text-dark">{currencySymbol} {itm?.amount2}</span>
                </div>
            </div>
            <div
                className={`w-[150px] h-[150px] rounded-full flex absolute md:top-[-50px] top-[-30px] md:right-[-60px] right-[-40px] items-center justify-center ${itm.bg} ${itm.bgDark}`}>
                <img src={itm?.icon} alt="" className="md:w-8 w-12 md:mr-12 md:mt-10 mt-4 mr-8" />
            </div>
        </div>
    );
};

export default AccountingDisplayCart;