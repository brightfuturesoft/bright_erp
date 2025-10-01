import {
    useState,
    useRef,
    useEffect,
    useContext,
    useMemo,
    useCallback,
} from 'react';
import { message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import {
    getCategories,
    getCustomers,
    getProducts,
    getTransactionId,
} from '../api_call';
import { Category, Customer, HeldOrder, OrderData } from '../pos_types';

// Custom hook containing all logic and state, split from main component
const use_direct_pos = () => {
    const { user, workspace } = useContext(Erp_context);

    // All states and functions moved here from main file
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);
    const [selected_category, set_selected_category] =
        useState('All Categories');
    const [cart_items, set_cart_items] = useState<any[]>([]);
    const [order_id, set_order_id] = useState('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [payment_id, set_payment_id] = useState('');

    // Dark mode hook
    const useDarkMode = () => {
        const [isDark, setIsDark] = useState(
            document.documentElement.classList.contains('dark')
        );
        useEffect(() => {
            const observer = new MutationObserver(() => {
                setIsDark(document.documentElement.classList.contains('dark'));
            });
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class'],
            });
            return () => observer.disconnect();
        }, []);
        return isDark;
    };
    const isDark = useDarkMode();

    const [is_hold_modal_visible, set_is_hold_modal_visible] = useState(false);
    const [is_hold_list_modal_visible, set_is_hold_list_modal_visible] =
        useState(false);
    const [is_payment_modal_visible, set_is_payment_modal_visible] =
        useState(false);
    const [is_receipt_modal_visible, set_is_receipt_modal_visible] =
        useState(false);
    const [holdOrderReference, setHoldOrderReference] = useState('');
    const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
    const [current_order_data, set_current_order_data] =
        useState<OrderData | null>(null);

    const [selected_customer_id, set_selected_customer_id] =
        useState<string>('walk-in');
    const [is_customer_modal_visible, set_is_customer_modal_visible] =
        useState(false);
    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
        name: '',
        phone: '',
        email: '',
        address: '',
        customer_type: '',
    });

    const [tax, setTaxState] = useState<number>(0);
    const setTax = (v: any) => {
        const num = Number(v);
        setTaxState(!isNaN(num) ? num : 0);
    };

    const [shipping, setShippingState] = useState<number>(0);
    const set_shipping = (v: any) => {
        const num = Number(v);
        setShippingState(!isNaN(num) ? num : 0);
    };

    const [discount, setDiscountState] = useState<number>(0);
    const setDiscount = (v: any) => {
        const num = Number(v);
        setDiscountState(!isNaN(num) ? num : 0);
    };

    const [page, setPage] = useState(0);
    const [search_term, set_search_term] = useState('');
    const [payment_method, set_payment_method] = useState('cash');

    // Queries
    const {
        data: categories,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(user?._id, user?.workspace_id),
        select: data => {
            const totalItemCount = data.reduce(
                (sum: number, category: { itemCount: number }) =>
                    sum + (category.itemCount || 0),
                0
            );
            return [
                {
                    _id: 'all_categories',
                    name: 'All Categories',
                    image: 'https://img.icons8.com/ios-filled/100/apps-tab.png',
                    itemCount: totalItemCount,
                },
                ...data,
            ];
        },
    });

    const {
        data: customer_data,
        isLoading: customer_loading,
        refetch: customer_refetch,
    } = useQuery({
        queryKey: ['customerData'],
        queryFn: () => getCustomers(user?._id, user?.workspace_id),
    });

    const { data: product_data, isLoading: productLoading } = useQuery({
        queryKey: ['productData', user?.workspace_id],
        queryFn: () => getProducts(user?._id, user?.workspace_id),
        enabled: !!user?.workspace_id,
    });

    const {
        data: transaction_id,
        isLoading: transaction_idLoading,
        refetch: transaction_id_refetch,
    } = useQuery({
        queryKey: ['transaction_idData'],
        queryFn: () => getTransactionId(user?._id, user?.workspace_id),
    });

    useEffect(() => {
        if (transaction_id) {
            set_order_id(transaction_id.order_id);
        }
    }, [transaction_id, transaction_idLoading, transaction_id_refetch]);

    const [transactionCounter, setTransactionCounter] = useState(1);

    useEffect(() => {
        if (transaction_id) {
            const match = transaction_id.order_id.match(/_(\d+)$/);
            const number = match ? parseInt(match[1], 10) : 0;
            setTransactionCounter(number + 1);
        }
    }, [transaction_id]);

    const generateTransactionId = useCallback(() => {
        const prefix = (workspace?.name || 'ORDER')
            .replace(/\s+/g, '_')
            .toLowerCase();
        const id = `${prefix}_${String(transactionCounter).padStart(4, '0')}`;
        setTransactionCounter(prev => prev + 1);
        return id;
    }, [transactionCounter, workspace?.name]);

    // @ts-ignore
    const defaultCustomers: Customer[] = useMemo(
        () => [{ _id: 'walk-in', name: 'Walk-in Customer' }],
        []
    );

    const selected_customer: Customer = useMemo(() => {
        return (
            customer_data?.find(c => c._id === selected_customer_id) ||
            defaultCustomers[0]
        );
    }, [customer_data, selected_customer_id, defaultCustomers]);

    const customer_options = useMemo(() => {
        if (!customer_data || customer_data.length === 0) return [];
        return customer_data.map(c => ({
            label: `${c.name}${c.phone ? ' · ' + c.phone : ''}${c.email ? ' · ' + c.email : ''}`,
            value: c.id,
            data: c,
        }));
    }, [customer_data]);

    const handle_customer_change = useCallback(
        (customer_id: string) => set_selected_customer_id(customer_id),
        []
    );

    const subtotal = useMemo(() => {
        return cart_items.reduce((sum, item) => {
            const price = parseFloat(
                item.offer_price || item.normal_price || 0
            );
            return sum + price * item.quantity;
        }, 0);
    }, [cart_items]);

    const tax_amount = useMemo(
        () => subtotal * ((tax ?? 0) / 100),
        [subtotal, tax]
    );

    const discount_amount = useMemo(() => {
        const safe_subtotal = subtotal ?? 0;
        const safe_discount = discount ?? 0;
        return safe_subtotal * (safe_discount / 100);
    }, [subtotal, discount]);

    const total = useMemo(() => {
        const safe_subtotal = subtotal ?? 0;
        const safe_tax_amount = tax_amount ?? 0;
        const safe_shipping = shipping ?? 0;
        const safe_discount_amount = discount_amount ?? 0;
        return (
            safe_subtotal +
            safe_tax_amount +
            safe_shipping -
            safe_discount_amount
        );
    }, [subtotal, tax_amount, shipping, discount_amount]);

    const filtered_products = useMemo(() => {
        if (!product_data) return [];
        const search_text = search_term.toLowerCase();
        return product_data.filter((product: any) => {
            const matches_search = Object.values(product).some(value => {
                if (!value) return false;
                return JSON.stringify(value)
                    .toLowerCase()
                    .includes(search_text);
            });
            const matches_category =
                selected_category === 'All Categories'
                    ? true
                    : product.category?.some(
                          (category: any) =>
                              category.label === selected_category
                      );
            return matches_search && matches_category;
        });
    }, [product_data, selected_category, search_term]);

    const itemsPerView = 7;
    const startIndex = page * itemsPerView;
    const endIndex = startIndex + itemsPerView;

    const visible_categories = useMemo(() => {
        return Array.isArray(categories)
            ? categories.slice(startIndex, endIndex)
            : [];
    }, [categories, startIndex, endIndex]);

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
        } catch (error) {}
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
        } catch (error) {}
    }, []);

    // Cart operations
    const add_to_cart = useCallback(
        (product: any) => {
            playAddSound();
            set_cart_items(prev => {
                const existing = prev.find(item => item.sku === product.sku);
                if (existing) {
                    return prev.map(item =>
                        item.sku === product.sku
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [
                    ...prev,
                    {
                        ...product,
                        quantity: 1,
                        sku: product.sku,
                        name: product.item_name,
                        price: parseFloat(product.selling_price) || 0,
                    },
                ];
            });
        },
        [playAddSound]
    );

    const clearAll = useCallback(() => {
        playEmptyCartSound();
        set_cart_items([]);
    }, [playEmptyCartSound]);

    const remove_from_cart = useCallback(
        (id: any) => {
            playEmptyCartSound();
            set_cart_items(prev => prev.filter(item => item.sku !== id));
        },
        [playEmptyCartSound]
    );

    const update_quantity = useCallback(
        (sku: any, newQuantity: number) => {
            if (newQuantity <= 0) {
                remove_from_cart(sku);
                return;
            }
            playAddSound();
            set_cart_items(prev =>
                prev.map(item =>
                    item.sku === sku ? { ...item, quantity: newQuantity } : item
                )
            );
        },
        [remove_from_cart, playAddSound]
    );

    const openAddCustomer = useCallback(() => {
        setNewCustomer({
            name: '',
            phone: '',
            email: '',
            address: '',
            customer_type: 'pos',
        });
        set_is_customer_modal_visible(true);
    }, []);

    const save_new_customer = useCallback(async () => {
        if (!newCustomer.name || !newCustomer.name.trim()) {
            message.error('Customer name is required');
            return;
        }
        const payload: any = {
            name: newCustomer.name.trim(),
            phone: (newCustomer.phone || '').trim() || undefined,
            email: (newCustomer.email || '').trim() || undefined,
            address: (newCustomer.address || '').trim() || undefined,
            customer_type: 'pos',
            workspace_id: user?.workspace_id,
        };
        let url = `${import.meta.env.VITE_BASE_URL}customers/create-customer`;
        let method = 'POST';
        if (editingCustomer) {
            url = `${import.meta.env.VITE_BASE_URL}customers/update-customer`;
            method = 'PATCH';
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
                set_is_customer_modal_visible(false);
                setEditingCustomer(null);
                message.success(
                    editingCustomer ? 'Customer updated' : 'Customer added'
                );
                await customer_refetch();
                if (!editingCustomer && result.data) {
                    const newCustomerId = result.data._id || result.data.id;
                    if (newCustomerId) {
                        set_selected_customer_id(newCustomerId);
                    }
                }
            }
        } catch (error) {
            message.error('Failed to save customer');
        }
    }, [newCustomer, editingCustomer, user, customer_refetch]);

    const handle_hold_order = useCallback(() => {
        if (cart_items?.length === 0) {
            message.warning('No items in cart to hold');
            return;
        }
        set_is_hold_modal_visible(true);
    }, [cart_items]);

    const confirm_hold_order = useCallback(() => {
        if (!holdOrderReference.trim()) {
            message.error('Please provide an order reference');
            return;
        }
        const newHeldOrder: HeldOrder = {
            order_number: holdOrderReference,
            user_id: user?._id,
            workspace_id: user?.workspace_id,
            order_type: 'pos',
            products: cart_items,
            delivery_address: {
                // @ts-ignore
                customer_id: selected_customer?._id,
                full_name: selected_customer?.name,
                phone: selected_customer?.phone,
                email_address: selected_customer?.email,
                address: selected_customer?.address,
            },
            shipping_charge: 0,
            tax_amount: 0,
            discount: 0,
            total_amount: total,
            promo: {
                used: false,
                promo_id: '',
                discount_amount: discount_amount,
            },
            payment: {
                payment_method: payment_method,
                amount: total,
                change: isFinite(cashReceived - total)
                    ? (cashReceived - total).toFixed(2)
                    : '0.00',
                payment_status: 'paid',
                payment_reference: '',
                transaction_id: payment_id,
            },
            order_status: 'delivered',
            tracking: {
                status: false,
            },
            created_at: new Date(),
            updated_at: new Date(),
            cashier_name: user?.name,
        };
        setHeldOrders(prev => [...prev, newHeldOrder]);
        const prevHoldOrders = localStorage.getItem('hold_order');
        const holdOrders = prevHoldOrders ? JSON.parse(prevHoldOrders) : [];
        localStorage.setItem(
            'hold_order',
            JSON.stringify([...holdOrders, newHeldOrder])
        );
        set_cart_items([]);
        setHoldOrderReference('');
        set_is_hold_modal_visible(false);
        message.success('Order held successfully');
    }, [holdOrderReference, cart_items, total]);

    // Payment
    const handle_payment = useCallback(() => {
        if (cart_items?.length === 0) {
            message.warning('No items in cart to process payment');
            return;
        }

        if (cashReceived < total) {
            message.error('Insufficient cash received');
            return;
        }

        const transactionId = generateTransactionId();

        const orderData: OrderData = {
            user_id: user?._id,
            workspace_id: user?.workspace_id,
            order_type: 'pos',
            products: cart_items,
            delivery_address: {
                // @ts-ignore
                customer_id: selected_customer?._id,
                full_name: selected_customer?.name,
                phone: selected_customer?.phone,
                email_address: selected_customer?.email,
                address: selected_customer?.address,
            },
            shipping_charge: shipping,
            tax_amount: tax_amount,
            discount: discount_amount,
            total_amount: total,
            promo: {
                used: false,
                promo_id: '',
                discount_amount: discount_amount,
            },
            payment: {
                payment_method: payment_method,
                amount: total,
                change:
                    cashReceived >= total
                        ? (cashReceived - total).toFixed(2)
                        : '0.00',
                payment_status: 'paid',
                payment_reference: '',
                transaction_id: transactionId,
            },
            order_status: 'delivered',
            tracking: {
                status: false,
            },
            created_at: new Date(),
            updated_at: new Date(),
            cashier_name: user?.name,
        };

        set_current_order_data(orderData);
        set_is_payment_modal_visible(true);
    }, [
        cart_items,
        subtotal,
        tax,
        tax_amount,
        shipping,
        discount,
        discount_amount,
        total,
        selected_customer,
        generateTransactionId,
        cashReceived,
        payment_method,
        user,
    ]);

    const confirm_payment = useCallback(async () => {
        if (!current_order_data) {
            message.error('No order data to save');
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BASE_URL}direct-pos/orders/create-order`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(current_order_data),
            });
            const result = await response.json();
            if (result.error) {
                message.error(result.message || 'Failed to save order');
            } else {
                message.success('Order saved successfully');
                set_is_payment_modal_visible(false);
                set_is_receipt_modal_visible(true);
                set_cart_items([]);
            }
        } catch (error) {
            message.error('Something went wrong while saving order');
        }
    }, [current_order_data, user, set_cart_items]);

    const printReceipt = useCallback(() => {
        confirm_payment();
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
        set_cart_items([]);
        set_is_receipt_modal_visible(false);
        transaction_id_refetch();
        message.success('Receipt printed successfully');
    }, []);

    const continue_without_print = useCallback(async () => {
        if (!current_order_data) {
            message.error('No order data to save');
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BASE_URL}direct-pos/orders/create-order`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(current_order_data),
            });
            const result = await response.json();
            if (result.error) {
                message.error(result.message || 'Failed to complete order');
            } else {
                set_cart_items([]);
                set_is_receipt_modal_visible(false);
                set_is_payment_modal_visible(false);
                message.success('Order completed successfully');
                transaction_id_refetch();
            }
        } catch (error) {
            message.error('Something went wrong while completing order');
        }
    }, [current_order_data, user]);

    const handle_search_key_down = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const found_product = filtered_products.find(product =>
                    Object.values(product).some(value => {
                        if (!value) return false;
                        return JSON.stringify(value)
                            .toLowerCase()
                            .trim()
                            .includes(search_term.toLowerCase().trim());
                    })
                );
                if (found_product) {
                    add_to_cart(found_product);
                }
            }
        },
        [filtered_products, search_term, add_to_cart]
    );

    const handleReset = useCallback(() => {
        transaction_id_refetch();
        set_cart_items([]);
        set_selected_customer_id('walk-in');
        set_selected_category('All Categories');
        set_search_term('');
        setTax(5);
        set_shipping(0);
        setDiscount(0);
    }, []);

    const generateReceiptHTML = useCallback(() => {
        const order = current_order_data;
        const items = order?.products || cart_items;
        const name = order?.delivery_address?.full_name || 'Walk-in Customer';
        const customerId = order?.delivery_address?.id || 'WALKIN';
        const orderSubtotal = order?.total_amount ?? subtotal;
        const orderdiscount_amount = order?.discount ?? discount_amount;
        const orderShipping = order?.shipping_charge ?? shipping;
        const orderTax = order?.tax_amount ?? tax;
        const orderTotal = order?.total_amount ?? total;
        const orderDate = order?.created_at || new Date().toLocaleDateString();
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
          <div class="company-name">${workspace?.name || 'Store Name'}</div>
          <div class="contact-info">Phone Number: ${workspace?.phone || '+1 5656665656'}</div>
          <div class="contact-info">Email: ${workspace?.email || 'example@gmail.com'}</div>
        </div>
        <div class="divider"></div>
        <div class="invoice-header">Tax Invoice</div>
        <div class="customer-info">
          <div>Name: ${name}</div>
          <div>Invoice No: ${order?.payment?.transaction_id}</div>
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
            <span>${index + 1}. ${item.item_name || item.name}</span>
            <span>৳${parseFloat(item.offer_price || item.price || 0)}</span>
            <span>${item.quantity}</span>
            <span>৳${(parseFloat(item.offer_price || item.price || 0) * item.quantity).toFixed(2)}</span>
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
            <span>-৳${orderdiscount_amount.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>৳${orderShipping.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Tax (${orderTax}%):</span>
            <span>৳${orderTax.toFixed(2)}</span>
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
        <div class="footer">
          Thank You For Shopping With Us. Please Come Again
        </div>
      </body>
      </html>
    `;
    }, [
        current_order_data,
        cart_items,
        subtotal,
        discount_amount,
        shipping,
        tax,
        tax_amount,
        total,
        workspace,
        order_id,
    ]);

    const customStyles = (isDark: boolean) => ({
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderColor: state.isFocused
                ? isDark
                    ? '#2563eb'
                    : '#3b82f6'
                : isDark
                  ? '#374151'
                  : '#d1d5db',
            boxShadow: state.isFocused
                ? `0 0 0 1px ${isDark ? '#2563eb' : '#3b82f6'}`
                : 'none',
            borderRadius: 0.5 * 8,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                borderColor: state.isFocused
                    ? isDark
                        ? '#2563eb'
                        : '#3b82f6'
                    : isDark
                      ? '#4b5563'
                      : '#9ca3af',
            },
            color: isDark ? '#f3f4f6' : '#111827',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? '#111827' : '#ffffff',
            borderRadius: 0.5 * 8,
            boxShadow: isDark
                ? '0 4px 6px rgba(0,0,0,0.5)'
                : '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 50,
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#2563eb'
                : state.isFocused
                  ? isDark
                      ? '#374151'
                      : '#e5e7eb'
                  : isDark
                    ? '#111827'
                    : '#ffffff',
            color: state.isSelected
                ? '#ffffff'
                : isDark
                  ? '#f3f4f6'
                  : '#111827',
            cursor: 'pointer',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: isDark ? '#f3f4f6' : '#111827',
        }),
        input: (provided: any) => ({
            ...provided,
            color: isDark ? '#f3f4f6' : '#111827',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: isDark ? '#9ca3af' : '#6b7280',
        }),
        dropdownIndicator: () => ({
            display: 'none',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    });

    const safe_fixed = (num: number | undefined | null, digits = 2) =>
        (num ?? 0).toFixed(digits);

    const hold_order_to_cart = useCallback(
        (reference: string) => {
            const order = heldOrders.find(
                order => order.order_number === reference
            );
            if (order) {
                transaction_id_refetch();
                set_cart_items(order.products ?? []);
                set_selected_customer_id(
                    order.delivery_address?.customer_id ?? null
                );
                set_shipping(order.shipping_charge ?? 0);
                setTax(order.tax_amount ?? 0);
                setDiscount(order.discount ?? 0);
                set_payment_method(order.payment?.payment_method ?? '');
                set_payment_id(order.payment?.transaction_id ?? '');
                set_is_hold_list_modal_visible(false);
                playAddSound();
            }
        },
        [heldOrders]
    );

    useEffect(() => {
        const prevHoldOrders = localStorage.getItem('hold_order');
        const holdOrders = prevHoldOrders ? JSON.parse(prevHoldOrders) : [];
        setHeldOrders(holdOrders);
    }, []);

    const delete_form_hold_order = useCallback(
        (reference: string) => {
            const order = heldOrders.find(
                order => order.order_number === reference
            );
            if (order) {
                const prevHoldOrders = localStorage.getItem('hold_order');
                const holdOrders = prevHoldOrders
                    ? JSON.parse(prevHoldOrders)
                    : [];
                const newHoldOrders = holdOrders.filter(
                    order => order.order_number !== reference
                );
                localStorage.setItem(
                    'hold_order',
                    JSON.stringify(newHoldOrders)
                );
                setHeldOrders(newHoldOrders);
            }
        },
        [heldOrders]
    );

    return {
        // All state and handlers exposed here
        user,
        workspace,
        audioRef,
        isDark,
        is_hold_modal_visible,
        set_is_hold_modal_visible,
        is_hold_list_modal_visible,
        set_is_hold_list_modal_visible,
        is_payment_modal_visible,
        set_is_payment_modal_visible,
        is_receipt_modal_visible,
        set_is_receipt_modal_visible,
        holdOrderReference,
        setHoldOrderReference,
        heldOrders,
        setHeldOrders,
        current_order_data,
        set_current_order_data,
        selected_customer_id,
        set_selected_customer_id,
        is_customer_modal_visible,
        set_is_customer_modal_visible,
        newCustomer,
        setNewCustomer,
        editingCustomer,
        setEditingCustomer,
        tax,
        setTax,
        shipping,
        set_shipping,
        discount,
        setDiscount,
        page,
        setPage,
        search_term,
        set_search_term,
        payment_method,
        set_payment_method,
        categories,
        isLoading,
        isError,
        refetch,
        customer_data,
        customer_loading,
        customer_refetch,
        product_data,
        productLoading,
        transaction_id,
        transaction_idLoading,
        order_id,
        cart_items,
        set_cart_items,
        selected_category,
        set_selected_category,
        defaultCustomers,
        selected_customer,
        customer_options,
        handle_customer_change,
        subtotal,
        tax_amount,
        discount_amount,
        total,
        filtered_products,
        itemsPerView,
        startIndex,
        endIndex,
        visible_categories,
        playAddSound,
        playEmptyCartSound,
        add_to_cart,
        clearAll,
        remove_from_cart,
        update_quantity,
        openAddCustomer,
        save_new_customer,
        handle_hold_order,
        confirm_hold_order,
        handle_payment,
        confirm_payment,
        printReceipt,
        continue_without_print,
        handle_search_key_down,
        handleReset,
        generateReceiptHTML,
        customStyles,
        safe_fixed,
        setCashReceived,
        cashReceived,
        set_payment_id,
        payment_id,
        hold_order_to_cart,
        delete_form_hold_order,
    };
};

export default use_direct_pos;
