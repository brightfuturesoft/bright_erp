import React from 'react';

const FolderTree = ({ data }) => {
    if (!data) return null;

    return (
        <ul className='folder-tree'>
            {data.children.map((item) => (
                <li key={item.name} className='list'>
                    {item.type === 'folder' ? (
                        <details>
                            <summary>{item.name}</summary>
                            <FolderTree data={item} />
                        </details>
                    ) : (
                        <span>{item.name}</span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default FolderTree;
