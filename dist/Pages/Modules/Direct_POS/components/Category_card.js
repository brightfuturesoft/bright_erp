import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
function Category_card({ category, selected_category, set_selected_category }) {
    return _jsxs(
        'div',
        {
            className: `
                                                                rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-102 hover:border-gray-300 active:scale-98  ${category?.name === selected_category ? 'border-2 border-orange-400 shadow-lg scale-105' : 'border border-gray-200'}`,
            onClick: () => set_selected_category(category?.name),
            children: [
                _jsx('div', {
                    className:
                        'w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center',
                    children: _jsx('img', {
                        className:
                            'w-full h-full object-cover transition-transform duration-200 hover:scale-110',
                        src: category.image,
                        alt: category?.name,
                        loading: 'lazy',
                    }),
                }),
                _jsx('div', {
                    className:
                        'font-semibold dark:text-white whitespace-nowrap text-black text-sm text-center leading-tight',
                    children: category.name,
                }),
                _jsxs('div', {
                    className: 'text-xs text-gray-500 font-medium',
                    children: [category.itemCount, ' Items'],
                }),
                category.name === selected_category &&
                    _jsx('div', {
                        className:
                            'w-2 h-2 bg-orange-400 rounded-full animate-pulse',
                    }),
            ],
        },
        category._id
    );
}
export default Category_card;
