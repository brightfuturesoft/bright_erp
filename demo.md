### Common table
``` 
<div className="">
            <div className="py-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold dark:text-light  capitalize">Expence</h2>
                    <Button type='primary' className="dark:bg-light-dark bg-blue-500 text-white px-4 !shadow-none !h-[40px] rounded">Add Items</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border dark:border-gray-700  border-gray-200">
                        <thead className='dark:text-gray-200'>
                            <tr>
                                <th className="px-6 py-3 border-b dark:border-gray-700  border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                    Coast
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700  border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                    AC Name
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700  border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700  border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700  border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='dark:text-gray-500'>
                            {filterData?.map((itm, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700  border-gray-200">
                                        <div className="text-sm leading-5 ">{itm.amount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700  border-gray-200">
                                        <div className="text-sm leading-5 ">{itm?.ac_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700  border-gray-200 w-[300px] text-justify text-nowrap">
                                        <div className="text-sm leading-5  ">{itm?.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700  border-gray-200">
                                        {itm?.status ? <div className="bg-[#00802038] text-green-400 w-[90px] rounded-full flex items-center justify-center text-xs h-[25px] ">Active</div>
                                            :
                                            <div className="bg-[#80004638] text-red-400 w-[90px] rounded-full flex items-center justify-center text-xs h-[25px] ">Active</div>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700  border-gray-200">
                                        <button className="text-blue-500 hover:text-blue-700">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

 ```