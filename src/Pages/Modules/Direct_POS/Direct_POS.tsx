import React, {
    useState,
    useRef,
    useEffect,
    useContext,
    useMemo,
    useCallback,
} from 'react';
import PosHeader from './components/Pos_head';
import { Card, Button, Modal, Input, message, Select, Table, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import Barcode from 'react-barcode';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Category {
    _id: string;
    name: string;
    image: string;
    itemCount: number;
}

interface HeldOrder {
    id: string;
    reference: string;
    items: any[];
    total: number;
    date: string;
}

interface Customer {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    customer_type?: string;
}

interface OrderData {
    transactionId: string;
    items: any[];
    subtotal: number;
    tax: number;
    taxAmount: number;
    shipping: number;
    discount: number;
    discountAmount: number;
    total: number;
    date: string;
    time: string;
    customer?: Customer;
}

const columns = [
    {
        title: 'Reference',
        dataIndex: 'reference',
        key: 'reference',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (val: number) => `$${val.toFixed(2)}`,
    },
    {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
        render: (items: any[]) => items.length,
    },
    {
        title: 'Quantity',
        dataIndex: 'items',
        key: 'quantity',
        render: (items: any[]) =>
            items.reduce((sum, item) => sum + item.quantity, 0),
    },
];

const Direct_POS = () => {
    const { user, workspace } = useContext(Erp_context);

    // Basic state
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [selectedReference, setSelectedReference] = useState<string | null>(
        null
    );
    const [editingCustomer, setEditingCustomer] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [transactionId] = useState('#65565');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Modal states
    const [isHoldModalVisible, setIsHoldModalVisible] = useState(false);
    const [isHoldListModalVisible, setIsHoldListModalVisible] = useState(false);
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
    const [holdOrderReference, setHoldOrderReference] = useState('');
    const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
    const [currentOrderData, setCurrentOrderData] = useState<OrderData | null>(
        null
    );

    // Customer states
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] =
        useState<string>('walk-in');
    const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
        name: '',
        phone: '',
        email: '',
        address: '',
        customer_type: '',
    });

    // Order calculation states
    const [tax, setTax] = useState(5);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);

    // UI states
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    // Fetch categories
    const {
        data: categories,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/category/get-category`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            return data.data;
        },
    });

    // Fetch customer data
    const {
        data: customer_data,
        isLoading: customerLoading,
        isError: isCustomerError,
        refetch: customerRefetch,
    } = useQuery({
        queryKey: ['customerData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/customers/get-customers`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            return data.data;
        },
    });

    // Default customers with proper memoization
    const defaultCustomers: Customer[] = useMemo(
        () => [{ id: 'walk-in', name: 'Walk-in Customer' }],
        []
    );

    // Update customers when data is fetched - USE EFFECT TO PREVENT RERENDER LOOP
    useEffect(() => {
        if (customer_data && Array.isArray(customer_data)) {
            // Map API customer data to match our Customer interface
            const mappedCustomers = customer_data.map((customer: any) => ({
                id: customer._id || customer.id, // Use _id from API or fallback to id
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
                customer_type: customer.customer_type,
            }));
            // Merge default customers with fetched data
            const allCustomers = [...defaultCustomers, ...mappedCustomers];
            console.log('Setting customers:', allCustomers);
            setCustomers(allCustomers);
        } else {
            // If no customer data, use default customers
            console.log('Using default customers only');
            setCustomers(defaultCustomers);
        }
    }, [customer_data, defaultCustomers]);

    // Memoized selected customer to prevent unnecessary recalculations
    const selectedCustomer: Customer = useMemo(() => {
        return (
            customers?.find(c => c.id === selectedCustomerId) ||
            defaultCustomers[0]
        );
    }, [customers, selectedCustomerId, defaultCustomers]);

    // Memoized customer options
    const customerOptions = useMemo(() => {
        if (!customers || customers.length === 0) return [];

        return customers?.map(c => ({
            label: `${c.name}${c.phone ? ' · ' + c.phone : ''}${c.email ? ' · ' + c.email : ''}`,
            value: c.id,
        }));
    }, [customers]);

    // Handle customer selection change
    const handleCustomerChange = useCallback(
        (customerId: string) => {
            console.log('Selected customer ID:', customerId);
            console.log('Available customers:', customers);
            setSelectedCustomerId(customerId);
        },
        [customers]
    );

    // Static products data
    const products = useMemo(
        () => [
            {
                id: 1,
                name: 'iPhone 15 Pro Max',
                category: 'Mobiles',
                price: 1199,
                stock: 25,
                image: 'https://img.freepik.com/free-psd/smartphone-device-mockup_53876-57597.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 2,
                name: 'Samsung Galaxy S24',
                category: 'Mobiles',
                price: 999,
                stock: 18,
                image: 'https://img.freepik.com/free-psd/smartphone-mockup-concept_23-2148525221.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 3,
                name: 'MacBook Pro M3',
                category: 'Laptops',
                price: 2499,
                stock: 12,
                image: 'https://img.freepik.com/free-psd/laptop-mockup-isolated_1310-1502.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 4,
                name: 'Dell XPS 13',
                category: 'Laptops',
                price: 1299,
                stock: 15,
                image: 'https://img.freepik.com/free-photo/laptop-computer-isolated-white-background_53876-47190.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 5,
                name: 'Sony WH-1000XM5',
                category: 'Headphones',
                price: 399,
                stock: 30,
                image: 'https://img.freepik.com/free-photo/black-headphones-digital-device_53876-96805.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 6,
                name: 'Apple AirPods Pro',
                category: 'Headphones',
                price: 249,
                stock: 45,
                image: 'https://img.freepik.com/free-photo/white-wireless-earphones-charging-case_53876-96806.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 7,
                name: 'Bose QuietComfort',
                category: 'Headphones',
                price: 329,
                stock: 22,
                image: 'https://img.freepik.com/free-photo/modern-headphones-isolated_23-2150773426.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 8,
                name: 'Nike Air Max 270',
                category: 'Shoes',
                price: 150,
                stock: 35,
                image: 'https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 9,
                name: 'Adidas Ultra Boost',
                category: 'Shoes',
                price: 180,
                stock: 28,
                image: 'https://img.freepik.com/free-photo/sports-shoe-pair-design-illustration-generated-by-ai_188544-19642.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 10,
                name: 'Converse Chuck Taylor',
                category: 'Shoes',
                price: 65,
                stock: 50,
                image: 'https://img.freepik.com/free-photo/red-sneaker-shoe-isolated-white-background_93675-134695.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 11,
                name: 'Apple Watch Series 9',
                category: 'Watches',
                price: 429,
                stock: 20,
                image: 'https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-96808.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 12,
                name: 'Rolex Submariner',
                category: 'Watches',
                price: 8500,
                stock: 3,
                image: 'https://img.freepik.com/free-photo/luxury-watch-white-background_53876-96807.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 13,
                name: 'Casio G-Shock',
                category: 'Watches',
                price: 120,
                stock: 40,
                image: 'https://img.freepik.com/free-photo/black-digital-watch-white-background_53876-96809.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 14,
                name: 'Canon EOS R5',
                category: 'Cameras',
                price: 3899,
                stock: 8,
                image: 'https://img.freepik.com/free-photo/modern-camera-isolated-white-background_53876-96810.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 15,
                name: 'Sony Alpha A7 IV',
                category: 'Cameras',
                price: 2498,
                stock: 12,
                image: 'https://img.freepik.com/free-photo/professional-camera-lens-isolated_53876-96811.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 16,
                name: 'PlayStation 5',
                category: 'Gaming',
                price: 499,
                stock: 15,
                image: 'https://img.freepik.com/free-photo/gaming-console-controller-isolated_53876-96812.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 17,
                name: 'Xbox Series X',
                category: 'Gaming',
                price: 499,
                stock: 18,
                image: 'https://img.freepik.com/free-photo/black-gaming-console-white-background_53876-96813.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 18,
                name: 'Nintendo Switch OLED',
                category: 'Gaming',
                price: 349,
                stock: 25,
                image: 'https://img.freepik.com/free-photo/gaming-device-portable-console_53876-96814.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 19,
                name: 'iPad Pro 12.9"',
                category: 'Tablets',
                price: 1099,
                stock: 14,
                image: 'https://img.freepik.com/free-photo/tablet-device-white-background_53876-96815.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 20,
                name: 'Samsung Galaxy Tab S9',
                category: 'Tablets',
                price: 799,
                stock: 20,
                image: 'https://img.freepik.com/free-photo/modern-tablet-isolated-white_53876-96816.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 21,
                name: 'Samsung 65" QLED',
                category: 'Smart TV',
                price: 1299,
                stock: 8,
                image: 'https://img.freepik.com/free-photo/smart-tv-isolated-white-background_53876-96817.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 22,
                name: 'LG OLED 55"',
                category: 'Smart TV',
                price: 1599,
                stock: 6,
                image: 'https://img.freepik.com/free-photo/television-screen-isolated_53876-96818.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 23,
                name: 'JBL Charge 5',
                category: 'Speakers',
                price: 179,
                stock: 32,
                image: 'https://img.freepik.com/free-photo/bluetooth-speaker-isolated_53876-96819.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 24,
                name: 'Sonos One',
                category: 'Speakers',
                price: 219,
                stock: 18,
                image: 'https://img.freepik.com/free-photo/smart-speaker-white-background_53876-96820.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 25,
                name: 'The Psychology of Programming',
                category: 'Books',
                price: 29,
                stock: 50,
                image: 'https://img.freepik.com/free-photo/book-hardcover-isolated_53876-96821.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 26,
                name: 'Clean Code',
                category: 'Books',
                price: 35,
                stock: 45,
                image: 'https://img.freepik.com/free-photo/programming-book-stack_53876-96822.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 27,
                name: 'Premium Cotton T-Shirt',
                category: 'Clothing',
                price: 25,
                stock: 75,
                image: 'https://img.freepik.com/free-photo/white-t-shirt-isolated_53876-96823.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 28,
                name: 'Denim Jacket',
                category: 'Clothing',
                price: 89,
                stock: 30,
                image: 'https://img.freepik.com/free-photo/denim-jacket-isolated_53876-96824.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 29,
                name: 'Smart Plant Pot',
                category: 'Home & Garden',
                price: 45,
                stock: 25,
                image: 'https://img.freepik.com/free-photo/plant-pot-isolated_53876-96825.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
            {
                id: 30,
                name: 'LED Desk Lamp',
                category: 'Home & Garden',
                price: 65,
                stock: 40,
                image: 'https://img.freepik.com/free-photo/desk-lamp-isolated_53876-96826.jpg?uid=R207616652&ga=GA1.1.1649928169.1754755392&semt=ais_hybrid',
            },
        ],
        []
    );

    // Memoized calculations to prevent unnecessary recalculations
    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    const taxAmount = useMemo(() => subtotal * (tax / 100), [subtotal, tax]);
    const discountAmount = useMemo(
        () => subtotal * (discount / 100),
        [subtotal, discount]
    );
    const total = useMemo(
        () => subtotal + taxAmount + shipping - discountAmount,
        [subtotal, taxAmount, shipping, discountAmount]
    );

    // Memoized filtered products
    const filteredProducts = useMemo(() => {
        return selectedCategory === 'All Categories'
            ? products.filter(product =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : products
                  .filter(product => product.category === selectedCategory)
                  .filter(product =>
                      product.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                  );
    }, [products, selectedCategory, searchTerm]);

    // Memoized pagination
    const itemsPerView = 7;
    const startIndex = page * itemsPerView;
    const endIndex = startIndex + itemsPerView;
    const visibleCategories = useMemo(() => {
        return Array.isArray(categories)
            ? categories.slice(startIndex, endIndex)
            : [];
    }, [categories, startIndex, endIndex]);

    // Sound functions
    const playAddSound = useCallback(() => {
        try {
            const audioContext = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.2
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Audio not supported');
        }
    }, []);

    const playEmptyCartSound = useCallback(() => {
        try {
            const audioContext = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(
                200,
                audioContext.currentTime + 0.5
            );

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.5
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported');
        }
    }, []);

    // Cart management functions
    const addToCart = useCallback(
        (product: any) => {
            playAddSound();
            setCartItems(prev => {
                const existing = prev.find(item => item.id === product.id);
                if (existing) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prev, { ...product, quantity: 1 }];
            });
        },
        [playAddSound]
    );

    const clearAll = useCallback(() => {
        playEmptyCartSound();
        setCartItems([]);
    }, [playEmptyCartSound]);

    const removeFromCart = useCallback(
        (id: any) => {
            playEmptyCartSound();
            setCartItems(prev => prev.filter(item => item.id !== id));
        },
        [playEmptyCartSound]
    );

    const updateQuantity = useCallback(
        (id: any, newQuantity: number) => {
            if (newQuantity <= 0) {
                removeFromCart(id);
                return;
            }
            playAddSound(); // Add sound effect for quantity changes
            setCartItems(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        },
        [removeFromCart, playAddSound]
    );

    // Customer management functions
    const openAddCustomer = useCallback(() => {
        setNewCustomer({
            name: '',
            phone: '',
            email: '',
            address: '',
            customer_type: '',
        });
        setIsCustomerModalVisible(true);
    }, []);

    const saveNewCustomer = useCallback(async () => {
        if (!newCustomer.name || !newCustomer.name.trim()) {
            message.error('Customer name is required');
            return;
        }

        const payload: any = {
            name: newCustomer.name.trim(),
            phone: (newCustomer.phone || '').trim() || undefined,
            email: (newCustomer.email || '').trim() || undefined,
            address: (newCustomer.address || '').trim() || undefined,
            customer_type:
                (newCustomer.customer_type || '').trim() || undefined,
        };

        let url = `${import.meta.env.VITE_BASE_URL}items/customers/create-customer`;
        let method = 'POST';

        if (editingCustomer) {
            url = `${import.meta.env.VITE_BASE_URL}items/customers/update-customer`;
            method = 'PUT';
            payload.id = editingCustomer._id;
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.error) {
                message.error(result.message || 'Something went wrong');
            } else {
                setIsCustomerModalVisible(false);
                setEditingCustomer(null);
                message.success(
                    editingCustomer ? 'Customer updated' : 'Customer added'
                );

                // Refresh customer data and select the new customer
                await customerRefetch();

                // If creating new customer, try to select it
                if (!editingCustomer && result.data) {
                    const newCustomerId = result.data._id || result.data.id;
                    if (newCustomerId) {
                        setSelectedCustomerId(newCustomerId);
                    }
                }
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            message.error('Failed to save customer');
        }
    }, [newCustomer, editingCustomer, user, customerRefetch]);

    // Order management functions
    const handleHoldOrder = useCallback(() => {
        if (cartItems?.length === 0) {
            message.warning('No items in cart to hold');
            return;
        }
        setIsHoldModalVisible(true);
    }, [cartItems]);

    const confirmHoldOrder = useCallback(() => {
        if (!holdOrderReference.trim()) {
            message.error('Please provide an order reference');
            return;
        }

        const newHeldOrder: HeldOrder = {
            id: Date.now().toString(),
            reference: holdOrderReference,
            items: [...cartItems],
            total: total,
            date: new Date().toLocaleDateString(),
        };

        setHeldOrders(prev => [...prev, newHeldOrder]);
        setCartItems([]);
        setHoldOrderReference('');
        setIsHoldModalVisible(false);
        message.success('Order held successfully');
    }, [holdOrderReference, cartItems, total]);

    const handlePayment = useCallback(() => {
        if (cartItems?.length === 0) {
            message.warning('No items in cart to process payment');
            return;
        }

        const orderData: OrderData = {
            transactionId,
            items: cartItems,
            subtotal,
            tax,
            taxAmount,
            shipping,
            discount,
            discountAmount,
            total,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            customer: selectedCustomer,
        };

        setCurrentOrderData(orderData);
        setIsPaymentModalVisible(true);
    }, [
        cartItems,
        transactionId,
        subtotal,
        tax,
        taxAmount,
        shipping,
        discount,
        discountAmount,
        total,
        selectedCustomer,
    ]);

    const confirmPayment = useCallback(() => {
        setIsPaymentModalVisible(false);
        setIsReceiptModalVisible(true);
    }, []);

    const generateReceiptHTML = useCallback(() => {
        const order = currentOrderData;
        const items = order?.items || cartItems;
        const name = order?.customer?.name || 'Walk-in Customer';
        const customerId = order?.customer?.id || 'WALKIN';
        const orderSubtotal = order?.subtotal ?? subtotal;
        const orderDiscountAmount = order?.discountAmount ?? discountAmount;
        const orderShipping = order?.shipping ?? shipping;
        const orderTax = order?.tax ?? tax;
        const orderTaxAmount = order?.taxAmount ?? taxAmount;
        const orderTotal = order?.total ?? total;
        const orderDate = order?.date || new Date().toLocaleDateString();

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: 'Courier New', monospace; margin: 0; padding: 20px; max-width: 300px; }
          .header { text-align: center; margin-bottom: 20px; }
          .company-name { font-weight: bold; font-size: 16px; }
          .contact-info { font-size: 12px; margin: 5px 0; }
          .divider { border-top: 1px dashed #000; margin: 10px 0; }
          .invoice-header { text-align: center; font-weight: bold; margin: 10px 0; }
          .customer-info { margin: 10px 0; }
          .item-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .totals { margin-top: 15px; }
          .total-row { display: flex; justify-content: space-between; margin: 3px 0; }
          .grand-total { font-weight: bold; font-size: 14px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          .barcode { text-align: center; margin: 15px 0; font-family: 'Courier New'; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">${workspace?.name}</div>
          <div class="contact-info">Phone Number: +1 5656665656</div>
          <div class="contact-info">Email: example@gmail.com</div>
        </div>

        <div class="divider"></div>

        <div class="invoice-header">Tax Invoice</div>

        <div class="customer-info">
          <div>Name: ${name}</div>
          <div>Invoice No: ${order?.transactionId || transactionId}</div>
          <div>Customer Id: #${customerId}</div>
          <div>Date: ${orderDate}</div>
        </div>

        <div class="divider"></div>

        <div style="display: flex; justify-content: space-between; font-weight: bold;">
          <span># Item</span>
          <span>Price</span>
          <span>Qty</span>
          <span>Total</span>
        </div>

        ${items
            .map(
                (item: any, index: number) => `
          <div class="item-row">
            <span>${index + 1}. ${item.name}</span>
            <span>৳${item.price}</span>
            <span>${item.quantity}</span>
            <span>৳${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `
            )
            .join('')}

        <div class="divider"></div>

        <div class="totals">
          <div class="total-row">
            <span>Sub Total:</span>
            <span>৳${orderSubtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Discount:</span>
            <span>-৳${orderDiscountAmount.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>৳${orderShipping.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Tax (${orderTax}%):</span>
            <span>৳${orderTaxAmount.toFixed(2)}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Bill:</span>
            <span>৳${orderTotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Due:</span>
            <span>৳0.00</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Payable:</span>
            <span>৳${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="footer">
          **VAT against this challan is payable through central registration. Thank you for your business!
        </div>

        <div class="barcode">
        <div className="text-center my-4" style={{ width: '100%', margin: 'auto', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <Barcode value={transactionId} />,
                              </div>
        </div>

        <div class="footer">
          Thank You For Shopping With Us. Please Come Again
        </div>
      </body>
      </html>
    `;
    }, [
        currentOrderData,
        cartItems,
        subtotal,
        discountAmount,
        shipping,
        tax,
        taxAmount,
        total,
        workspace,
        transactionId,
    ]);

    const printReceipt = useCallback(() => {
        const printWindow = window.open('', '_blank');
        const receiptContent = generateReceiptHTML();

        if (!printWindow) {
            message.error(
                'Popup blocked. Please allow popups to print the receipt.'
            );
            return;
        }

        printWindow.document.write(receiptContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();

        setCartItems([]);
        setIsReceiptModalVisible(false);
        message.success('Receipt printed successfully');
    }, [generateReceiptHTML]);

    const continueWithoutPrint = useCallback(() => {
        setCartItems([]);
        setIsReceiptModalVisible(false);
        message.success('Order completed successfully');
    }, []);

    // Search handler with useCallback
    const handleSearchKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const foundProduct = filteredProducts.find(
                    product =>
                        product.name.toLowerCase() ===
                        searchTerm.trim().toLowerCase()
                );
                if (foundProduct) {
                    addToCart(foundProduct);
                }
            }
        },
        [filteredProducts, searchTerm, addToCart]
    );

    // Reset function
    const handleReset = useCallback(() => {
        setCartItems([]);
        setSelectedCategory('All Categories');
        setSearchTerm('');
        setTax(5);
        setShipping(0);
        setDiscount(0);
    }, []);

    return (
        <div className="bg-gray-900 text-white">
            <audio
                ref={audioRef}
                preload="auto"
            >
                <source
                    src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeBjqH0fPTgjMGHm7A7+OZURE"
                    type="audio/wav"
                />
            </audio>

            <div className="flex h-screen mx-auto max-w-screen-2xl px-4">
                {/* Left Panel - Categories and Products */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Header Buttons */}
                    <div className="flex gap-3 mb-6">
                        <Link to={'/dashboard/pos/orders'}>
                            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                📋 View Orders
                            </button>
                        </Link>
                        <button
                            onClick={handleReset}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            🔄 Reset
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            💳 Transaction
                        </button>
                        {heldOrders?.length > 0 && (
                            <button
                                onClick={() => setIsHoldListModalVisible(true)}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                Pending Orders ({heldOrders.length})
                            </button>
                        )}
                    </div>

                    {/* Categories Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Categories
                        </h2>

                        {/* Navigation */}
                        <div className="flex justify-end gap-2 mb-4">
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <ChevronLeftIcon
                                    className={`w-5 h-5 ${page === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                                />
                            </button>

                            <button
                                onClick={() =>
                                    setPage(p =>
                                        Math.min(
                                            Math.ceil(
                                                categories?.length /
                                                    itemsPerView
                                            ) - 1,
                                            p + 1
                                        )
                                    )
                                }
                                disabled={endIndex >= categories?.length}
                                className="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <ChevronRightIcon
                                    className={`w-5 h-5 ${endIndex >= categories?.length ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                                />
                            </button>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-7 gap-4">
                            {visibleCategories?.map((category: Category) => (
                                <div
                                    key={category._id}
                                    className={`
                    ${
                        category?.name === selectedCategory
                            ? 'border-2 border-orange-400 shadow-lg scale-105'
                            : 'border border-gray-200'
                    }
                    rounded-lg p-4 cursor-pointer
                    flex flex-col items-center gap-2
                    transition-all duration-200 ease-in-out
                    hover:shadow-md hover:scale-102 hover:border-gray-300
                    active:scale-98
                  `}
                                    onClick={() =>
                                        setSelectedCategory(category?.name)
                                    }
                                >
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                                            src={category.image}
                                            alt={category?.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="font-semibold text-gray-800 text-sm text-center leading-tight">
                                        {category.name}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        {category.itemCount} Items
                                    </div>
                                    {category.name === selectedCategory && (
                                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center mt-4 gap-1">
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        categories?.length / itemsPerView
                                    ),
                                },
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPage(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            page === index
                                                ? 'bg-orange-400 w-6'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* Products Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Products</h2>
                            <div className="relative">
                                <input
                                    value={searchTerm}
                                    onKeyDown={handleSearchKeyDown}
                                    onChange={e =>
                                        setSearchTerm(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Search Product"
                                    className="pl-3 pr-3 py-2 border rounded-lg bg-white text-gray-100 placeholder:text-gray-100"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-white text-gray-900 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all transform hover:scale-105"
                                    onClick={() => addToCart(product)}
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {product.category}
                                    </div>
                                    <div className="font-semibold">
                                        {product.name}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-gray-600">
                                            {product.stock} Pcs
                                        </span>
                                        <span className="font-semibold text-teal-600">
                                            ৳{product.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Order Information */}
                <div className="w-96 bg-gray-800 shadow-lg p-6 border-l border-gray-600 h-screen overflow-y-auto">
                    {/* Order Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-2">
                            Order List
                        </h2>
                        <div className="text-sm text-gray-300">
                            Transaction ID: {transactionId}
                        </div>
                    </div>

                    {/* Customer Selection */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-300">
                                Customer
                            </div>
                            <button
                                onClick={openAddCustomer}
                                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                            >
                                + Add Customer
                            </button>
                        </div>
                        <Select
                            showSearch
                            placeholder="Select customer"
                            className="w-full custom-select"
                            value={selectedCustomerId}
                            options={customerOptions}
                            onChange={handleCustomerChange}
                            filterOption={(input, option) =>
                                (option?.label as string)
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            notFoundContent={
                                customerLoading
                                    ? 'Loading...'
                                    : 'No customers found'
                            }
                        />
                        {/* Selected customer details */}
                        <div className="mt-3 bg-gray-700 rounded p-3">
                            <div className="font-medium text-white text-base mb-2">
                                {selectedCustomer?.name || 'Walk-in Customer'}
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs text-gray-300">
                                    ID: #{selectedCustomer?.id || 'WALKIN'}
                                </div>
                                {selectedCustomer?.phone && (
                                    <div className="text-xs text-gray-300">
                                        📞 Phone: {selectedCustomer.phone}
                                    </div>
                                )}
                                {selectedCustomer?.email && (
                                    <div className="text-xs text-gray-300">
                                        📧 Email: {selectedCustomer.email}
                                    </div>
                                )}
                                {selectedCustomer?.address && (
                                    <div className="text-xs text-gray-300">
                                        📍 Address: {selectedCustomer.address}
                                    </div>
                                )}
                                {selectedCustomer?.customer_type && (
                                    <div className="text-xs text-gray-300">
                                        🏷️ Type:{' '}
                                        {selectedCustomer.customer_type}
                                    </div>
                                )}
                                {selectedCustomer?.id === 'walk-in' && (
                                    <div className="text-xs text-blue-300 mt-2">
                                        💡 Default walk-in customer
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Added Counter and Clear All */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            Product Added:{' '}
                            {cartItems.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            )}
                        </div>
                        <button
                            onClick={clearAll}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                            Clear all
                        </button>
                    </div>

                    {/* Products Header */}
                    <h3 className="font-semibold text-white mb-4">Products</h3>

                    {/* Cart Items */}
                    <div className="mb-6 max-h-64 overflow-y-auto">
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="bg-gray-700 rounded-lg p-3 mb-3"
                            >
                                <div className="flex gap-3">
                                    {/* Product Image */}
                                    <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={e => {
                                                e.currentTarget.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMjAgMjBMMjggMjgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI4IDIwTDIwIDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
                                            }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm text-gray-300">
                                                {item.productCode ||
                                                    `#${item.id}`}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="text-red-400 hover:text-red-300 text-xs"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="font-medium text-white mb-1">
                                            {item.name}
                                        </div>
                                        <div className="text-green-400 font-semibold mb-2">
                                            <span className="kalpurush-font">
                                                ৳
                                            </span>{' '}
                                            {item.price}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-white font-semibold">
                                                {item.quantity} Products
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">
                                    Order Tax
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Select or enter tax"
                                    className="w-full custom-select"
                                    value={tax}
                                    onChange={setTax}
                                    options={[
                                        { label: '5%', value: 5 },
                                        { label: '10%', value: 10 },
                                        { label: '15%', value: 15 },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label as string)
                                            ?.toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <div className="p-2 border-t">
                                                <Input
                                                    placeholder="Enter custom tax %"
                                                    type="number"
                                                    onPressEnter={e => {
                                                        const value = Number(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        );
                                                        if (
                                                            !isNaN(value) &&
                                                            value >= 0 &&
                                                            value <= 100
                                                        ) {
                                                            setTax(value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">
                                    Shipping
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Select or enter shipping"
                                    className="w-full custom-select"
                                    value={shipping}
                                    onChange={setShipping}
                                    options={[
                                        { label: '0', value: 0 },
                                        { label: '60', value: 60 },
                                        { label: '120', value: 120 },
                                        { label: '180', value: 180 },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label as string)
                                            ?.toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <div className="p-2 border-t">
                                                <Input
                                                    placeholder="Enter custom shipping"
                                                    type="number"
                                                    onPressEnter={e => {
                                                        const value = Number(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        );
                                                        if (
                                                            !isNaN(value) &&
                                                            value >= 0
                                                        ) {
                                                            setShipping(value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">
                                    Discount
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Select or enter discount"
                                    className="w-full custom-select"
                                    value={discount}
                                    onChange={setDiscount}
                                    options={[
                                        { label: '0%', value: 0 },
                                        { label: '5%', value: 5 },
                                        { label: '10%', value: 10 },
                                        { label: '20%', value: 20 },
                                        { label: '30%', value: 30 },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label as string)
                                            ?.toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <div className="p-2 border-t">
                                                <Input
                                                    placeholder="Enter custom discount %"
                                                    type="number"
                                                    onPressEnter={e => {
                                                        const value = Number(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        );
                                                        if (
                                                            !isNaN(value) &&
                                                            value >= 0 &&
                                                            value <= 100
                                                        ) {
                                                            setDiscount(value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    {cartItems.length > 0 && (
                        <div className="space-y-2 mb-6 bg-gray-700 p-4 rounded-lg">
                            <div className="flex justify-between text-gray-300">
                                <span>Sub Total</span>
                                <span>
                                    <span className="kalpurush-font">৳</span>
                                    {subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Tax (GST {tax}%)</span>
                                <span>
                                    <span className="kalpurush-font">৳</span>
                                    {taxAmount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Shipping</span>
                                <span>
                                    <span className="kalpurush-font">৳</span>
                                    {shipping.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Sub Total</span>
                                <span>
                                    <span className="kalpurush-font">৳</span>
                                    {(subtotal + taxAmount + shipping).toFixed(
                                        2
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between text-red-400">
                                <span>Discount ({discount}%)</span>
                                <span>
                                    -<span className="kalpurush-font">৳</span>
                                    {discountAmount.toFixed(2)}
                                </span>
                            </div>
                            <hr className="border-gray-600" />
                            <div className="flex justify-between font-semibold text-lg text-white">
                                <span>Total</span>
                                <span>
                                    <span className="kalpurush-font">৳</span>
                                    {total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Total Button */}
                    {cartItems.length > 0 && (
                        <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold mb-3 hover:bg-blue-800">
                            Grand Total:{' '}
                            <span className="kalpurush-font">৳</span>
                            {total.toFixed(2)}
                        </button>
                    )}

                    {/* Payment Method */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-white">
                            Payment Method
                        </h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <button
                                onClick={() => setPaymentMethod('cash')}
                                className={
                                    paymentMethod === 'cash'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-700 hover:bg-gray-600 text-white'
                                }
                            >
                                💵
                                <br />
                                Cash
                            </button>
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={
                                    paymentMethod === 'card'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-700 hover:bg-gray-600 text-white'
                                }
                            >
                                💳
                                <br />
                                Debit Card
                            </button>
                            <button
                                onClick={() => setPaymentMethod('scan')}
                                className={
                                    paymentMethod === 'scan'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-700 hover:bg-gray-600 text-white'
                                }
                            >
                                📱
                                <br />
                                Scan
                            </button>
                        </div>

                        {/* Render Input only if payment method is cash */}
                        {paymentMethod === 'cash' && (
                            <div className="mt-4">
                                <Input
                                    type="number"
                                    placeholder="Enter cash received"
                                    value={cashReceived}
                                    onChange={e =>
                                        setCashReceived(Number(e.target.value))
                                    }
                                />
                                <p className="text-white mt-2">
                                    Return Amount:{' '}
                                    <span className="font-semibold">
                                        {(cashReceived - total).toFixed(2)}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={handleHoldOrder}
                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            📱 Hold
                        </button>
                        <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
                            🗑️ Void
                        </button>
                        <button
                            onClick={handlePayment}
                            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            💳 Payment
                        </button>
                    </div>
                </div>
            </div>

            {/* Hold Order Modal */}
            <Modal
                title="Hold Order"
                open={isHoldModalVisible}
                onOk={confirmHoldOrder}
                onCancel={() => {
                    setIsHoldModalVisible(false);
                    setHoldOrderReference('');
                }}
                okText="Hold Order"
                cancelText="Cancel"
                className="hold-order-modal dark:bg-gray-800 dark:text-white"
                bodyStyle={{ backgroundColor: 'inherit' }}
            >
                <div className="mb-4">
                    <div className="text-lg font-semibold mb-2">
                        <span className="kalpurush-font">৳</span>
                        {total.toFixed(2)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The current order will be set on hold. You can retrieve
                        this order from the pending order button. Providing a
                        reference to it might help you to identify the order
                        more quickly.
                    </p>

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Order Reference *
                    </label>
                    <Input
                        value={holdOrderReference}
                        onChange={e => setHoldOrderReference(e.target.value)}
                        placeholder="Enter order reference"
                        className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
            </Modal>

            {/* Pending Orders Modal */}
            <Modal
                title="Pending Orders"
                open={isHoldListModalVisible}
                onCancel={() => setIsHoldListModalVisible(false)}
                footer={null}
                className="dark:bg-gray-900 dark:text-white"
                bodyStyle={{ backgroundColor: 'inherit' }}
                width={800}
            >
                <Table
                    columns={columns}
                    dataSource={heldOrders
                        ?.filter(order =>
                            !selectedReference
                                ? true
                                : order.reference === selectedReference
                        )
                        .map(order => ({
                            key: order.id,
                            ...order,
                        }))}
                    pagination={false}
                    className="dark:bg-gray-900 dark:text-white"
                    expandable={{
                        expandedRowRender: order => (
                            <Table
                                columns={[
                                    {
                                        title: 'Product',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Category',
                                        dataIndex: 'category',
                                        key: 'category',
                                    },
                                    {
                                        title: 'Image',
                                        dataIndex: 'image',
                                        key: 'image',
                                        render: (src: string) => (
                                            <img
                                                src={src}
                                                alt="product"
                                                className="w-12 h-12 object-cover"
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Price',
                                        dataIndex: 'price',
                                        key: 'price',
                                    },
                                    {
                                        title: 'Quantity',
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                    },
                                    {
                                        title: 'Stock',
                                        dataIndex: 'stock',
                                        key: 'stock',
                                    },
                                ]}
                                dataSource={order.items.map(item => ({
                                    key: item.id,
                                    ...item,
                                }))}
                                pagination={false}
                                size="small"
                                className="dark:bg-gray-800 dark:text-white"
                            />
                        ),
                        rowExpandable: record =>
                            record.items && record.items.length > 0,
                    }}
                />
            </Modal>

            {/* Add Customer Modal */}
            <Modal
                title="Add Customer"
                open={isCustomerModalVisible}
                onOk={saveNewCustomer}
                onCancel={() => setIsCustomerModalVisible(false)}
                okText="Save"
                cancelText="Cancel"
                className="dark:bg-gray-800 dark:text-white"
                bodyStyle={{ backgroundColor: 'inherit' }}
            >
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Name *
                        </label>
                        <Input
                            placeholder="Customer name"
                            value={newCustomer.name}
                            onChange={e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    name: e.target.value,
                                }))
                            }
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                        </label>
                        <Input
                            placeholder="Phone number"
                            value={newCustomer.phone}
                            onChange={e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    phone: e.target.value,
                                }))
                            }
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={newCustomer.email}
                            onChange={e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    email: e.target.value,
                                }))
                            }
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Address
                        </label>
                        <Input.TextArea
                            rows={3}
                            placeholder="Address"
                            value={newCustomer.address}
                            onChange={e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    address: e.target.value,
                                }))
                            }
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Customer Type
                        </label>
                        <Input
                            type="text"
                            placeholder="Customer Type"
                            value={newCustomer.customer_type}
                            onChange={e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    customer_type: e.target.value,
                                }))
                            }
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                </div>
            </Modal>

            {/* Payment Completion Modal */}
            <Modal
                title="Payment Completed"
                open={isPaymentModalVisible}
                footer={null}
                onCancel={() => setIsPaymentModalVisible(false)}
                className="payment-modal dark:bg-gray-800 dark:text-white"
                bodyStyle={{ backgroundColor: 'inherit' }}
            >
                <div className="text-center">
                    <div className="mb-6">
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <p className="text-lg mb-4 dark:text-gray-300">
                            Do you want to Print Receipt for the Completed
                            Order?
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button
                            type="primary"
                            onClick={confirmPayment}
                            className="bg-blue-600"
                        >
                            Print Receipt
                        </Button>
                        <Button
                            onClick={continueWithoutPrint}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Receipt Modal */}
            <Modal
                title="Print Receipt"
                open={isReceiptModalVisible}
                footer={null}
                onCancel={() => setIsReceiptModalVisible(false)}
                width={400}
                className="receipt-modal"
            >
                <div className="receipt-content bg-white text-black p-4 font-mono text-sm">
                    <div className="text-center mb-4">
                        <div className="font-bold text-lg">
                            {workspace?.name}
                        </div>
                        <div className="text-sm">
                            Phone Number: {workspace?.phone}
                        </div>
                        <div className="text-sm">Email: {workspace?.email}</div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-4"></div>

                    <div className="text-center font-bold mb-4">
                        Tax Invoice
                    </div>

                    <div className="mb-4">
                        <div>
                            Name:{' '}
                            {currentOrderData?.customer?.name ||
                                'Walk-in Customer'}
                        </div>
                        <div>
                            Invoice No:{' '}
                            {currentOrderData?.transactionId || transactionId}
                        </div>
                        <div>
                            Customer Id: #
                            {currentOrderData?.customer?.id || 'WALKIN'}
                        </div>
                        <div>
                            Date:{' '}
                            {currentOrderData?.date ||
                                new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-4"></div>

                    <div className="flex justify-between font-bold mb-2">
                        <span># Item</span>
                        <span>Price</span>
                        <span>Qty</span>
                        <span>Total</span>
                    </div>

                    {(currentOrderData?.items || cartItems).map(
                        (item, index) => (
                            <div
                                key={item.id}
                                className="flex justify-between text-xs mb-1"
                            >
                                <span className="flex-1">
                                    {index + 1}. {item.name}
                                </span>
                                <span className="w-16 text-right">
                                    <span className="kalpurush-font">৳</span>
                                    {item.price}
                                </span>
                                <span className="w-8 text-center">
                                    {item.quantity}
                                </span>
                                <span className="w-16 text-right">
                                    <span className="kalpurush-font">৳</span>
                                    {(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        )
                    )}

                    <div className="border-t border-dashed border-gray-400 my-4"></div>

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span>Sub Total:</span>
                            <span>
                                <span className="kalpurush-font">৳</span>
                                {(
                                    currentOrderData?.subtotal ?? subtotal
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span>
                                -<span className="kalpurush-font">৳</span>
                                {(
                                    currentOrderData?.discountAmount ??
                                    discountAmount
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>
                                <span className="kalpurush-font">৳</span>
                                {(
                                    currentOrderData?.shipping ?? shipping
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax ({currentOrderData?.tax ?? tax}%):</span>
                            <span>
                                <span className="kalpurush-font">৳</span>
                                {(
                                    currentOrderData?.taxAmount ?? taxAmount
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total Bill:</span>
                            <span>
                                <span className="kalpurush-font">৳</span>
                                {(currentOrderData?.total ?? total).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Due:</span>
                            <span>
                                <span className="kalpurush-font">৳</span>0.00
                            </span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total Payable:</span>
                            <span>
                                <span className="kalpurush-font">৳</span>
                                {(currentOrderData?.total ?? total).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Payment Method</span>
                            <span className="capitalize">{paymentMethod}</span>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-400 my-4"></div>

                    <div className="text-center text-xs">
                        **VAT against this challan is payable through central
                        registration. Thank you for your business!
                    </div>

                    <div
                        className="text-center my-4"
                        style={{
                            width: '100%',
                            margin: 'auto',
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Barcode value={transactionId} />
                    </div>

                    <div className="text-center text-xs">
                        Thank You For Shopping With Us. Please Come Again
                    </div>
                </div>

                <div className="flex gap-4 justify-center mt-4">
                    <Button
                        type="primary"
                        onClick={printReceipt}
                        className="bg-blue-600"
                    >
                        Print Receipt
                    </Button>
                    <Button onClick={continueWithoutPrint}>Continue</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Direct_POS;
