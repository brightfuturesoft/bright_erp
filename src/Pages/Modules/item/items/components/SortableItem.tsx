import React from 'react';
import {
    SortableContainer,
    SortableElement,
    SortEnd,
} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

// Single image item
const SortableItem = SortableElement<{
    url: string;
    onRemove: (url: string) => void;
}>(({ url, onRemove }) => (
    <div className="relative inline-block mr-2 mb-2 w-20 h-20">
        <img
            src={url}
            alt="cover"
            className="w-full h-full object-cover rounded border"
        />
        <span
            onClick={e => {
                e.stopPropagation(); // ✅ Prevent Dragger or parent click
                onRemove(url);
            }}
            className="absolute top-0 right-0 cursor-pointer bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
            ×
        </span>
    </div>
));

// List of thumbnails
const SortableList = SortableContainer<{
    items: string[];
    onRemove: (url: string) => void;
}>(({ items, onRemove }) => (
    <div className="flex flex-wrap mt-2">
        {items.map((url, index) => (
            <SortableItem
                key={url}
                index={index}
                url={url}
                onRemove={onRemove}
            />
        ))}
    </div>
));
export { SortableItem, SortableList };
