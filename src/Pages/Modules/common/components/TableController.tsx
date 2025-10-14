import React, { useState } from 'react';

const TableController = ({
    searchValue,
    setSearchValue,
    palaceholder,
}: {
    searchValue: string;
    setSearchValue: (value: string) => void;
    palaceholder?: string;
}) => {
    const onSearch = (value: string) => {
        console.log('search', value);
    };

    return (
        <div className="flex justify-end my-4">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSearch(searchValue);
                }}
                className="flex items-center"
            >
                <input
                    type="text"
                    className="w-[400px] h-[40px] text-black border border-gray-300 rounded-l-md pl-3 text-base outline-none bg-white"
                    placeholder={palaceholder ? palaceholder : ''}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="h-[40px] px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-700 text-base cursor-pointer"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <circle
                            cx="9"
                            cy="9"
                            r="7"
                            stroke="#333"
                            strokeWidth="2"
                        />
                        <line
                            x1="15"
                            y1="15"
                            x2="19"
                            y2="19"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default TableController;
