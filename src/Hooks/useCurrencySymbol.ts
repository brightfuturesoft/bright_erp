import { useState, useEffect } from 'react';

const currencySymbols: { [key: string]: string } = {
    US: '$',
    GB: '£',
    EU: '€',
    CA: 'CA$',
    JP: '¥',
    IN: '₹',
    // ...
};

const useCurrencySymbol = () => {
    const [currencySymbol, setCurrencySymbol] = useState('$');

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(
                    'http://www.geoplugin.net/json.gp'
                );
                const data = await response.json();
                const countryCode = data.geoplugin_countryCode;
                const symbol = currencySymbols[countryCode] || '$';
                setCurrencySymbol(symbol);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchLocation();
    }, []);

    return currencySymbol;
};

export default useCurrencySymbol;
