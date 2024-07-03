// import React, { useState, useEffect } from 'react';
// import { data } from './example-category-data';

// // Helper functions and CRUD operations

// const getDataFromLocalStorage = () => {
//     const storedData = localStorage.getItem('categoryData');
//     return storedData ? JSON.parse(storedData) : [];
// };

// const saveDataToLocalStorage = (data) => {
//     localStorage.setItem('categoryData', JSON.stringify(data));
// };

// const generateId = () => Math.floor(Math.random() * 100000);

// const findCategoryById = (categories, id) => {
//     for (let category of categories) {
//         if (category.id === id) return category;
//         if (category.categories) {
//             const found = findCategoryById(category.categories, id);
//             if (found) return found;
//         }
//     }
//     return null;
// };

// const addCategory = (newCategory, parentId, categories) => {
//     if (parentId === null) {
//         newCategory.id = generateId();
//         newCategory.categories = [];
//         categories.push(newCategory);
//     } else {
//         const parentCategory = findCategoryById(categories, parentId);
//         if (parentCategory) {
//             newCategory.id = generateId();
//             newCategory.parentId = parentId;
//             newCategory.categories = [];
//             parentCategory.categories.push(newCategory);
//         }
//     }
//     saveDataToLocalStorage(categories);
//     return [...categories];
// };

// const updateCategory = (categoryId, updatedCategory, categories) => {
//     const categoryToUpdate = findCategoryById(categories, categoryId);
//     if (categoryToUpdate) {
//         Object.assign(categoryToUpdate, updatedCategory);
//         saveDataToLocalStorage(categories);
//     }
//     return [...categories];
// };

// const deleteCategory = (categoryId, categories) => {
//     const removeCategory = (categories, id) => {
//         for (let i = 0; i < categories.length; i++) {
//             if (categories[i].id === id) {
//                 categories.splice(i, 1);
//                 return true;
//             } else if (categories[i].categories && removeCategory(categories[i].categories, id)) {
//                 return true;
//             }
//         }
//         return false;
//     };
//     removeCategory(categories, categoryId);
//     saveDataToLocalStorage(categories);
//     return [...categories];
// };

// // Category Component
// const Category = ({ category, onDelete, onUpdate, onAddSubcategory }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [name, setName] = useState(category.name);
//     const [imageUrl, setImageUrl] = useState(category.imageUrl);

//     const toggleOpen = () => setIsOpen(!isOpen);
//     const toggleEditMode = () => setEditMode(!editMode);

//     const handleNameChange = (e) => setName(e.target.value);
//     const handleImageUrlChange = (e) => setImageUrl(e.target.value);

//     const handleUpdate = () => {
//         onUpdate(category.id, { name, imageUrl });
//         setEditMode(false);
//     };

//     const handleDelete = () => {
//         onDelete(category.id);
//     };

//     const handleAddSubcategory = () => {
//         const subCategoryName = prompt('Enter subcategory name:');
//         if (subCategoryName) {
//             onAddSubcategory({ name: subCategoryName, imageUrl: '' }, category.id);
//         }
//     };

//     return (
//         <div className="p-2 md:p-4 border-l-2">
//             <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
//                 <img src={"https://pos.softghor.com/dashboard/images/not-available.png"} alt={name} className="w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-4" />
//                 {editMode ? (
//                     <input type="text" value={name} onChange={handleNameChange} className="font-semibold text-sm md:text-base" />
//                 ) : (
//                     <span className="font-semibold text-sm md:text-base">{name}</span>
//                 )}
//                 {category.categories && category.categories.length > 0 && (
//                     <span className="ml-2">{isOpen ? '-' : '+'}</span>
//                 )}
//                 {editMode && (
//                     <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleUpdate}>
//                         Save
//                     </button>
//                 )}
//                 <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleDelete}>
//                     Delete
//                 </button>
//                 {!editMode && (
//                     <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={toggleEditMode}>
//                         Edit
//                     </button>
//                 )}
//                 <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleAddSubcategory}>
//                     Add Subcategory
//                 </button>
//             </div>
//             {isOpen && category.categories && category.categories.length > 0 && (
//                 <div className="ml-4 md:ml-8">
//                     {category.categories.map((subCategory) => (
//                         <Category key={subCategory.id} category={subCategory} onDelete={onDelete} onUpdate={onUpdate} onAddSubcategory={onAddSubcategory} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // Main Component
// const Categories = ({ data, onAddCategory, onDeleteCategory, onUpdateCategory, onAddSubcategory }) => {
//     const handleAddCategory = () => {
//         const categoryName = prompt('Enter category name:');
//         if (categoryName) {
//             onAddCategory({ name: categoryName, imageUrl: '' }, null);
//         }
//     };

//     return (
//         <div className="p-4 md:p-8">
//             <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleAddCategory}>
//                 Add Category
//             </button>
//             {data.map((category) => (
//                 <Category key={category.id} category={category} onDelete={onDeleteCategory} onUpdate={onUpdateCategory} onAddSubcategory={onAddSubcategory} />
//             ))}
//         </div>
//     );
// };

// // App Component
// const Demo2 = () => {
//     const [categories, setCategories] = useState(getDataFromLocalStorage());

//     useEffect(() => {
//         if (!localStorage.getItem('categoryData')) {
//             saveDataToLocalStorage(data); // Initialize with sample data
//             setCategories(data);
//         }
//     }, []);

//     const handleAddCategory = (newCategory, parentId) => {
//         const updatedCategories = addCategory(newCategory, parentId, categories);
//         setCategories(updatedCategories);
//     };

//     const handleUpdateCategory = (categoryId, updatedCategory) => {
//         const updatedCategories = updateCategory(categoryId, updatedCategory, categories);
//         setCategories(updatedCategories);
//     };

//     const handleDeleteCategory = (categoryId) => {
//         const updatedCategories = deleteCategory(categoryId, categories);
//         setCategories(updatedCategories);
//     };

//     const handleAddSubcategory = (newCategory, parentId) => {
//         handleAddCategory(newCategory, parentId);
//     };

//     return (
//         <div className="container mx-auto p-4 md:p-8">
//             <Categories
//                 data={categories}
//                 onAddCategory={handleAddCategory}
//                 onDeleteCategory={handleDeleteCategory}
//                 onUpdateCategory={handleUpdateCategory}
//                 onAddSubcategory={handleAddSubcategory}
//             />
//         </div>
//     );
// };

// export default Demo2;
import React, { useState, useEffect } from 'react';

// Sample data

const data = [
    {
        type: 'category',
        name: 'Electronics',
        children: [
            {
                type: 'subcategory',
                name: 'Mobile Phones',
                children: [
                    {
                        type: 'product',
                        name: 'iPhone 12',
                        price: 799,
                        stock: 120,
                        children: [
                            {
                                type: 'product',
                                name: 'MacBook Pro',
                                price: 1299,
                                stock: 60,
                            },
                            {
                                type: 'product',
                                name: 'Dell XPS 13',
                                price: 999,
                                stock: 45,
                            },
                        ],
                    },
                    {
                        type: 'product',
                        name: 'Samsung Galaxy S21',
                        price: 699,
                        stock: 85,
                    },
                ],
            },
            {
                type: 'subcategory',
                name: 'Laptops',
                children: [
                    {
                        type: 'product',
                        name: 'MacBook Pro',
                        price: 1299,
                        stock: 60,
                    },
                    {
                        type: 'product',
                        name: 'Dell XPS 13',
                        price: 999,
                        stock: 45,
                    },
                ],
            },
        ],
    },
    {
        type: 'food',
        name: 'Fast Food'
    }
];


// Helper functions and CRUD operations
const generateId = () => Math.floor(Math.random() * 100000);

const findCategoryById = (categories: any[], id: number): any | null => {
    for (let category of categories) {
        if (category.id === id) return category;
        if (category.categories) {
            const found = findCategoryById(category.categories, id);
            if (found) return found;
        }
    }
    return null;
};

const addCategory = (newCategory: any, parentId: number | null, categories: any[]): any[] => {
    if (parentId === null) {
        newCategory.id = generateId();
        newCategory.categories = [];
        categories.push(newCategory);
    } else {
        const parentCategory = findCategoryById(categories, parentId);
        if (parentCategory) {
            newCategory.id = generateId();
            newCategory.parentId = parentId;
            newCategory.categories = [];
            parentCategory.categories.push(newCategory);
        }
    }
    return [...categories];
};

const updateCategory = (categoryId: number, updatedCategory: any, categories: any[]): any[] => {
    const categoryToUpdate = findCategoryById(categories, categoryId);
    if (categoryToUpdate) {
        Object.assign(categoryToUpdate, updatedCategory);
    }
    return [...categories];
};

const deleteCategory = (categoryId: number, categories: any[]): any[] => {
    const removeCategory = (categories: any[], id: number): boolean => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === id) {
                categories.splice(i, 1);
                return true;
            } else if (categories[i].categories && removeCategory(categories[i].categories, id)) {
                return true;
            }
        }
        return false;
    };
    removeCategory(categories, categoryId);
    return [...categories];
};

// Category Component
const Category = ({ category, onDelete, onUpdate, onAddSubcategory }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(category.name);
    const [imageUrl, setImageUrl] = useState(category.imageUrl);

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleEditMode = () => setEditMode(!editMode);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value);

    const handleUpdate = () => {
        onUpdate(category.id, { name, imageUrl });
        setEditMode(false);
    };

    const handleDelete = () => {
        onDelete(category.id);
    };

    const handleAddSubcategory = () => {
        const subCategoryName = prompt('Enter subcategory name:');
        if (subCategoryName) {
            onAddSubcategory({ name: subCategoryName, imageUrl: '' }, category.id);
        }
    };

    return (
        <div className="p-2 md:p-4 border-l-2">
            <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
                <img src={category.imageUrl || 'https://pos.softghor.com/dashboard/images/not-available.png'} alt={name} className="w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-4" />
                {editMode ? (
                    <input type="text" value={name} onChange={handleNameChange} className="font-semibold text-sm md:text-base" />
                ) : (
                    <span className="font-semibold text-sm md:text-base">{name}</span>
                )}
                {category.categories && category.categories.length > 0 && (
                    <span className="ml-2">{isOpen ? '-' : '+'}</span>
                )}
                {editMode && (
                    <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleUpdate}>
                        Save
                    </button>
                )}
                <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleDelete}>
                    Delete
                </button>
                {!editMode && (
                    <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={toggleEditMode}>
                        Edit
                    </button>
                )}
                <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm" onClick={handleAddSubcategory}>
                    Add Subcategory
                </button>
            </div>
            {isOpen && category.categories && category.categories.length > 0 && (
                <div className="ml-4 md:ml-8">
                    {category.categories.map((subCategory: any) => (
                        <Category key={subCategory.id} category={subCategory} onDelete={onDelete} onUpdate={onUpdate} onAddSubcategory={onAddSubcategory} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Categories Component with Form
const Categories = ({ data, onAddCategory, onDeleteCategory, onUpdateCategory, onAddSubcategory }: any) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim() !== '') {
            onAddCategory({ name: newCategoryName, imageUrl: '', categories: [] }, null);
            console.log(data); // Log data after adding category
            setNewCategoryName('');
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="mb-4 flex">
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="px-2 py-1 border rounded mr-2" placeholder="Enter category name" />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs md:text-sm" onClick={handleAddCategory}>
                    Add Category
                </button>
            </div>
            {data.map((category: any) => (
                <Category key={category.id} category={category} onDelete={onDeleteCategory} onUpdate={onUpdateCategory} onAddSubcategory={onAddSubcategory} />
            ))}
        </div>
    );
};

// Main App Component
const Demo2 = () => {
    const [categories, setCategories] = useState(data);

    const handleAddCategory = (newCategory: any, parentId: number | null) => {
        const updatedCategories = addCategory(newCategory, parentId, categories);
        setCategories(updatedCategories);
    };

    const handleUpdateCategory = (categoryId: number, updatedCategory: any) => {
        const updatedCategories = updateCategory(categoryId, updatedCategory, categories);
        setCategories(updatedCategories);
    };

    const handleDeleteCategory = (categoryId: number) => {
        const updatedCategories = deleteCategory(categoryId, categories);
        setCategories(updatedCategories);
    };

    const handleAddSubcategory = (newCategory: any, parentId: number) => {
        handleAddCategory(newCategory, parentId);
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Categories
                data={categories}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
                onUpdateCategory={handleUpdateCategory}
                onAddSubcategory={handleAddSubcategory}
            />
        </div>
    );
};

export default Demo2;
