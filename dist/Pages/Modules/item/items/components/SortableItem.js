import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// Single image item
const SortableItem = SortableElement(({ url, onRemove }) =>
    _jsxs('div', {
        className: 'relative inline-block mr-2 mb-2 w-20 h-20',
        children: [
            _jsx('img', {
                src: url,
                alt: 'cover',
                className: 'w-full h-full object-cover rounded border',
            }),
            _jsx('span', {
                onClick: e => {
                    e.stopPropagation(); // ✅ Prevent Dragger or parent click
                    onRemove(url);
                },
                className:
                    'absolute top-0 right-0 cursor-pointer bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs',
                children: '\u00D7',
            }),
        ],
    })
);
// List of thumbnails
const SortableList = SortableContainer(({ items, onRemove }) =>
    _jsx('div', {
        className: 'flex flex-wrap mt-2',
        children: items.map((url, index) =>
            _jsx(
                SortableItem,
                { index: index, url: url, onRemove: onRemove },
                url
            )
        ),
    })
);
export { SortableItem, SortableList };
