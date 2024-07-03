import React from 'react';
import FolderTree from './FolderTree';

// Define the data structure for the folders and files
const data = {
    type: 'folder',
    name: 'root',
    children: [
        {
            type: 'folder',
            name: 'src',
            children: [
                {
                    type: 'folder',
                    name: 'components',
                    children: [
                        {
                            type: 'file',
                            name: 'Header.js',
                        },
                        {
                            type: 'file',
                            name: 'Footer.js',
                        },
                    ],
                },
                {
                    type: 'file',
                    name: 'App.js',
                },
                {
                    type: 'file',
                    name: 'index.js',
                },
            ],
        },
        {
            type: 'folder',
            name: 'public',
            children: [
                {
                    type: 'file',
                    name: 'index.html',
                },
            ],
        },
        {
            type: 'file',
            name: 'package.json',
        },
    ],
};

const Demo: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Folder Structure</h1>
            <ul className='demo-box'>
                {
                    data?.children && data?.children?.map(itm => <li className='list' key={itm?.name}>
                        <details>
                            <summary>
                                {itm?.name}
                            </summary>
                            <ul>
                                <li>
                                    itm 1
                                </li>
                                <li>
                                    itm 2
                                </li>
                                <li>
                                    itm 3
                                </li>
                            </ul>
                        </details>
                    </li>)
                }
            </ul>

            <br />



        </div>
    );
};

export default Demo;
