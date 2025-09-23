import { setToLocalStorage } from '@/helpers/local-storage';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ecommerceCategories = [
    { label: 'Fashion & Apparel', value: 'fashion' },
    { label: "Men's Clothing", value: 'mens-clothing' },
    { label: "Women's Clothing", value: 'womens-clothing' },
    { label: 'Kids & Baby Clothing', value: 'kids-baby-clothing' },
    { label: 'Shoes & Footwear', value: 'shoes-footwear' },
    { label: 'Bags & Accessories', value: 'bags-accessories' },
    { label: 'Jewelry & Watches', value: 'jewelry-watches' },
    { label: 'Electronics & Gadgets', value: 'electronics' },
    { label: 'Mobiles & Tablets', value: 'mobiles-tablets' },
    { label: 'Computers & Laptops', value: 'computers-laptops' },
    { label: 'Cameras & Photography', value: 'cameras-photography' },
    { label: 'Audio & Headphones', value: 'audio-headphones' },
    { label: 'Wearables & Smartwatches', value: 'wearables-smartwatches' },
    { label: 'TVs & Home Appliances', value: 'tvs-home-appliances' },
    { label: 'Home & Living', value: 'home-living' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Kitchen & Dining', value: 'kitchen-dining' },
    { label: 'Home Decor', value: 'home-decor' },
    { label: 'Bedding & Bath', value: 'bedding-bath' },
    { label: 'Lighting', value: 'lighting' },
    { label: 'Tools & Hardware', value: 'tools-hardware' },
    { label: 'Beauty & Personal Care', value: 'beauty-personal-care' },
    { label: 'Skincare', value: 'skincare' },
    { label: 'Haircare', value: 'haircare' },
    { label: 'Makeup & Cosmetics', value: 'makeup-cosmetics' },
    { label: 'Fragrances', value: 'fragrances' },
    { label: 'Personal Hygiene', value: 'personal-hygiene' },
    { label: 'Grooming & Shaving', value: 'grooming-shaving' },
    { label: 'Health & Wellness', value: 'health-wellness' },
    { label: 'Vitamins & Supplements', value: 'vitamins-supplements' },
    { label: 'Fitness Equipment', value: 'fitness-equipment' },
    { label: 'Medical Supplies', value: 'medical-supplies' },
    { label: 'Organic & Natural Products', value: 'organic-natural' },
    { label: 'Ayurveda & Herbal', value: 'ayurveda-herbal' },
    { label: 'Food & Grocery', value: 'food-grocery' },
    { label: 'Fresh Fruits & Vegetables', value: 'fruits-vegetables' },
    { label: 'Packaged Foods', value: 'packaged-foods' },
    { label: 'Beverages', value: 'beverages' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Dairy & Bakery', value: 'dairy-bakery' },
    { label: 'Organic Food', value: 'organic-food' },
    { label: 'Sports & Outdoors', value: 'sports-outdoors' },
    { label: 'Sportswear', value: 'sportswear' },
    { label: 'Gym & Fitness Equipment', value: 'gym-fitness' },
    { label: 'Camping & Hiking Gear', value: 'camping-hiking' },
    { label: 'Bicycles & Accessories', value: 'bicycles' },
    { label: 'Outdoor Games', value: 'outdoor-games' },
    { label: 'Toys, Kids & Baby', value: 'toys-kids-baby' },
    { label: 'Toys & Games', value: 'toys-games' },
    { label: 'Baby Clothing', value: 'baby-clothing' },
    { label: 'Baby Care', value: 'baby-care' },
    { label: 'Strollers & Car Seats', value: 'strollers-car-seats' },
    { label: 'Learning & Educational Toys', value: 'educational-toys' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Car Accessories', value: 'car-accessories' },
    { label: 'Motorcycle Parts & Gear', value: 'motorcycle-parts' },
    { label: 'Tires & Batteries', value: 'tires-batteries' },
    { label: 'Oils & Lubricants', value: 'oils-lubricants' },
    { label: 'Car Electronics', value: 'car-electronics' },
    { label: 'Books, Media & Stationery', value: 'books-media' },
    { label: 'Books', value: 'books' },
    { label: 'Magazines & Newspapers', value: 'magazines-newspapers' },
    { label: 'Music & Instruments', value: 'music-instruments' },
    { label: 'Movies & Games', value: 'movies-games' },
    { label: 'Office Supplies', value: 'office-supplies' },
    { label: 'Pet Supplies', value: 'pet-supplies' },
    { label: 'Pet Food', value: 'pet-food' },
    { label: 'Pet Grooming', value: 'pet-grooming' },
    { label: 'Pet Health Products', value: 'pet-health' },
    { label: 'Pet Toys & Accessories', value: 'pet-toys-accessories' },
    { label: 'Arts, Crafts & Hobbies', value: 'arts-crafts-hobbies' },
    { label: 'Crafting Materials', value: 'crafting-materials' },
    { label: 'Collectibles', value: 'collectibles' },
    { label: 'DIY Supplies', value: 'diy-supplies' },
    { label: 'Musical Instruments', value: 'musical-instruments' },
    { label: 'Jewelry & Luxury Goods', value: 'jewelry-luxury' },
    { label: 'Fine Jewelry', value: 'fine-jewelry' },
    { label: 'Luxury Watches', value: 'luxury-watches' },
    { label: 'Designer Clothing', value: 'designer-clothing' },
    { label: 'Handbags & Shoes', value: 'handbags-shoes' },
    { label: 'Industrial & Business Supplies', value: 'industrial-business' },
    { label: 'Office Equipment', value: 'office-equipment' },
    { label: 'Industrial Machinery', value: 'industrial-machinery' },
    { label: 'Safety & Security', value: 'safety-security' },
    { label: 'Cleaning Supplies', value: 'cleaning-supplies' },
    { label: 'Travel & Experiences', value: 'travel-experiences' },
    { label: 'Tickets', value: 'tickets' },
    { label: 'Hotels & Resorts', value: 'hotels-resorts' },
    { label: 'Travel Accessories', value: 'travel-accessories' },
    { label: 'Tours & Activities', value: 'tours-activities' },
    { label: 'Services & Digital Products', value: 'services-digital' },
    { label: 'Online Courses', value: 'online-courses' },
    { label: 'Software & Licenses', value: 'software-licenses' },
    { label: 'Subscriptions', value: 'subscriptions' },
    { label: 'Gift Cards', value: 'gift-cards' },
    { label: 'Other', value: 'other' },
    { label: 'Religious Items', value: 'religious-items' },
    { label: 'Seasonal & Festival Products', value: 'seasonal-festival' },
    { label: 'Eco-friendly & Sustainable Goods', value: 'eco-friendly' },
];

const Package_and_category = () => {
    const [warningMessage, setWarningMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [warning, setWarning] = React.useState('');
    const [select_package, setSelectPackage] = React.useState('');
    const [category, setCategory] = useState<Option | null>(null);

    const {
        data: subscriptions = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}admin/subscription/get-all`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch subscriptions');
            const data = await response.json();
            return data.data; // assuming API returns { data: [...] }
        },
    });

    const navigate = useNavigate();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            select_package,
            category,
        };
        setToLocalStorage('package_info', JSON.stringify(payload));
        navigate('/workspace/sign-up');
    };

    return (
        <div className="container-home">
            <section>
                <div className="min-h-full lg:flex lg:flex-row-reverse lg:justify-between">
                    <div className="flex flex-col justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900  sm:px-6 lg:px-20 xl:px-24 rounded-r-xl">
                        <div className="flex-1 max-w-sm mx-auto lg:max-w-md ">
                            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white  sm:text-4xl xl:text-5xl font-pj lg:text-left">
                                Package and Category
                            </h1>

                            <form
                                onChange={() => setWarning('')}
                                onSubmit={onSubmitHandler}
                                className="mt-10"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Select Category
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                                            <CustomSelect
                                                options={ecommerceCategories}
                                                value={category}
                                                onChange={setCategory}
                                                placeholder="Select Category"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {warningMessage && (
                                    <div className="text-red-600 mt-8 dark:text-red-400">
                                        {warningMessage}
                                    </div>
                                )}

                                <div className="relative mt-8">
                                    <div className="absolute -inset-2">
                                        <div
                                            className="w-full h-full mx-auto opacity-30 blur-lg filter"
                                            style={{
                                                background:
                                                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                                    >
                                        {loading ? 'Loading...' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* right section */}
                    <div className="relative grid flex-1 w-full px-4 py-12 overflow-hidden bg-gray-900 lg:max-w-2xl lg:px-20 xl:px-24 sm:px-6 place-items-center rounded-l-xl">
                        <div className="absolute inset-0">
                            <img
                                className="object-cover object-top w-full h-full scale-150 -rotate-90 opacity-10"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/background-pattern.png"
                                alt=""
                            />
                        </div>

                        <div className="relative max-w-sm mx-auto space-y-4">
                            <div>
                                <h1 className="text-lg font-bold">
                                    Package and Category
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Select your payment method
                                </p>

                                <div className="">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                        {subscriptions.map(
                                            (subscription, idx) => {
                                                const isSelected =
                                                    select_package
                                                        ? select_package ===
                                                          subscription._id
                                                        : idx === 0; // first package if none selected

                                                return (
                                                    <li
                                                        onClick={() =>
                                                            setSelectPackage(
                                                                subscription._id
                                                            )
                                                        }
                                                        key={
                                                            subscription._id
                                                                .$oid
                                                        }
                                                        className="w-48"
                                                    >
                                                        <label
                                                            htmlFor={
                                                                subscription.type
                                                            }
                                                            className="block cursor-pointer relative group"
                                                        >
                                                            <input
                                                                id={
                                                                    subscription.type
                                                                }
                                                                type="radio"
                                                                name="payment"
                                                                defaultChecked={
                                                                    idx === 1
                                                                }
                                                                className="sr-only peer"
                                                            />

                                                            <div className="p-5 rounded-xl border border-gray-200 bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full peer-checked:border-indigo-600 peer-checked:ring-2 peer-checked:ring-indigo-400">
                                                                {/* Top Row: Type and Price */}
                                                                <div className="flex justify-between items-center mb-3">
                                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                                        {
                                                                            subscription.type
                                                                        }
                                                                    </h3>
                                                                </div>

                                                                {/* Subscription Description */}
                                                                <div className="flex-1">
                                                                    <p className="text-sm text-gray-600 mb-1 capitalize">
                                                                        {
                                                                            subscription.subscription
                                                                        }
                                                                    </p>
                                                                    <span className="text-indigo-600 font-bold text-lg">
                                                                        <span className="kalpurush-font">
                                                                            ৳
                                                                        </span>
                                                                        {
                                                                            subscription.price
                                                                        }
                                                                    </span>
                                                                </div>

                                                                {isSelected && (
                                                                    <span className="absolute top-4 right-4 w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                                                                        <span className="w-3 h-3 bg-indigo-600 rounded-full transition-transform duration-300"></span>
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </label>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Package_and_category;

type Option = {
    value: string;
    label: string;
};

interface CustomSelectProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder: string;
    formatOptionLabel?: (option: Option) => React.ReactNode;
}

function CustomSelect({
    options,
    value,
    onChange,
    placeholder,
    formatOptionLabel,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div
            className="relative bgg"
            ref={selectRef}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-ring/50 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200"
            >
                <span className={value ? 'text-foreground' : 'text-muted'}>
                    {value
                        ? formatOptionLabel
                            ? formatOptionLabel(value)
                            : value.label
                        : placeholder}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <div className="p-2 border-b border-border">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-muted">
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className="w-full text-gray-200 px-4 py-3 text-left hover:bg-accent/10 focus:bg-accent/10 focus:outline-none flex items-center justify-between group transition-colors duration-150"
                                >
                                    <span className="flex items-center">
                                        {formatOptionLabel
                                            ? formatOptionLabel(option)
                                            : option.label}
                                    </span>
                                    {value?.value === option.value && (
                                        <Check className="w-4 h-4 text-accent" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
