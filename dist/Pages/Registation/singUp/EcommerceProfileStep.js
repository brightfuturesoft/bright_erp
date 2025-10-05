import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getFromLocalStorage,
    setToLocalStorage,
} from '@/helpers/local-storage';
import { useQuery } from '@tanstack/react-query';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextArea from 'antd/es/input/TextArea';
import { Spin } from 'antd';
const fetchCountries = async () => {
    const response = await fetch(
        'https://server.orybiz.com/api/v1/address/countries'
    );
    const result = await response.json();
    return result?.data?.map(country => ({
        value: country.value,
        label: country.label,
    }));
};
const fetchDivisions = async countryId => {
    if (!countryId) return [];
    const response = await fetch(
        `https://server.orybiz.com/api/v1/address/divisions?countryId=${countryId}`
    );
    const result = await response.json();
    return result?.data?.map(division => ({
        value: division.value,
        label: division.label,
    }));
};
const fetchCities = async divisionId => {
    if (!divisionId) return [];
    const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${divisionId}&username=brightfuturesoft`
    );
    const data = await response.json();
    return data?.geonames?.map(city => ({
        value: city.geonameId,
        label: city.name,
    }));
};
const fetchAreas = async cityId => {
    if (!cityId) return [];
    const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${cityId}&username=brightfuturesoft`
    );
    const data = await response.json();
    return data?.geonames?.map(area => ({
        value: area.geonameId,
        label: area.name,
    }));
};
export default function EcommerceProfileStep() {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState('');
    const [country, setCountry] = useState(null);
    const [division, setDivision] = useState(null);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [postal_code, setpostal_code] = useState(null);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    console.log(phone);
    const workSpaceJsonData = getFromLocalStorage('worspaceData');
    // @ts-ignore
    const workSpaceData = workSpaceJsonData;
    const navigate = useNavigate();
    const [warningMessage, setWarningMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmitHandler = async e => {
        e.preventDefault();
        const bodyData = {
            country: country,
            division: division,
            postal_code: postal_code,
            phone: `+${phone}`,
            address: address,
        };
        setToLocalStorage('address_info', JSON.stringify(bodyData));
        navigate('/workspace/package');
    };
    const { data: countries = [], isLoading: loadingCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });
    const { data: divisions = [], isLoading: loadingDivisions } = useQuery({
        queryKey: ['divisions', country?.value],
        queryFn: () => fetchDivisions(country?.value || ''),
        enabled: !!country,
    });
    const { data: cities = [], isLoading: loadingCities } = useQuery({
        queryKey: ['cities', division?.value],
        queryFn: () => fetchCities(division?.value || ''),
        enabled: !!division,
    });
    const { data: areas = [], isLoading: loadingAreas } = useQuery({
        queryKey: ['areas', city?.value],
        queryFn: () => fetchAreas(city?.value || ''),
        enabled: !!city,
    });
    return _jsx('div', {
        className: 'container-home',
        children: _jsx('section', {
            children: _jsx('div', {
                className:
                    'min-h-full lg:flex lg:flex-row-reverse lg:justify-between',
                children: _jsx('div', {
                    className:
                        'justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900  sm:px-6 lg:px-20 xl:px-24 rounded-r-xl',
                    children: _jsxs('div', {
                        className: '',
                        children: [
                            _jsx('h1', {
                                className:
                                    'mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white  sm:text-4xl xl:text-5xl font-pj lg:text-left',
                                children: 'Shop Information',
                            }),
                            _jsxs('form', {
                                onChange: () => setWarning(''),
                                onSubmit: onSubmitHandler,
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10 ',
                                        children: [
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('label', {
                                                        htmlFor: 'country',
                                                        className:
                                                            'text-base font-medium text-gray-900 dark:text-white',
                                                        children:
                                                            'Provide Country Name',
                                                    }),
                                                    _jsx('div', {
                                                        className:
                                                            'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                        children: _jsx(
                                                            CustomSelect,
                                                            {
                                                                options:
                                                                    countries,
                                                                value: country,
                                                                onChange:
                                                                    setCountry,
                                                                placeholder:
                                                                    'Select Country',
                                                                loading:
                                                                    loadingCountries,
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('label', {
                                                        className:
                                                            'text-base font-medium text-gray-900 dark:text-white',
                                                        children:
                                                            'Provide State/Division Name',
                                                    }),
                                                    _jsx('div', {
                                                        className:
                                                            'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                        children: _jsx(
                                                            CustomSelect,
                                                            {
                                                                options:
                                                                    divisions,
                                                                value: division,
                                                                onChange:
                                                                    setDivision,
                                                                placeholder:
                                                                    'Select State/Division',
                                                                loading:
                                                                    loadingDivisions,
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('label', {
                                                        htmlFor: '',
                                                        className:
                                                            'text-base font-medium text-gray-900 dark:text-white',
                                                        children:
                                                            'Provide Zip Code',
                                                    }),
                                                    _jsx('div', {
                                                        className:
                                                            'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                        children: _jsx(
                                                            'input',
                                                            {
                                                                type: 'text',
                                                                name: 'zipCode',
                                                                id: 'zipCode',
                                                                className:
                                                                    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                                                                placeholder:
                                                                    'Enter Zip Code',
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('label', {
                                                        htmlFor: '',
                                                        className:
                                                            'text-base font-medium text-gray-900 dark:text-white',
                                                        children:
                                                            'Provide Official Phone Number',
                                                    }),
                                                    _jsx('div', {
                                                        className:
                                                            'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                        children: _jsx(
                                                            PhoneInput,
                                                            {
                                                                value: phone,
                                                                onChange:
                                                                    setPhone,
                                                                country: 'bd',
                                                                enableSearch: true,
                                                                inputStyle: {
                                                                    width: '100%',
                                                                    padding:
                                                                        '24px 40px',
                                                                    borderRadius:
                                                                        '8px',
                                                                    border: '1px solid #d1d5db',
                                                                },
                                                                buttonStyle: {
                                                                    border: 'none',
                                                                    background:
                                                                        'transparent',
                                                                },
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'mt-2',
                                        children: [
                                            _jsx('label', {
                                                htmlFor: '',
                                                className:
                                                    'text-base font-medium text-gray-900 dark:text-white',
                                                children:
                                                    'Provide your full address',
                                            }),
                                            _jsx('div', {
                                                className:
                                                    'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                children: _jsx(TextArea, {
                                                    value: address,
                                                    onChange: e =>
                                                        setAddress(
                                                            e.target.value
                                                        ),
                                                    rows: 2,
                                                    placeholder:
                                                        'Enter your full address',
                                                    className:
                                                        'w-full px-4 text-white py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                                                }),
                                            }),
                                        ],
                                    }),
                                    warningMessage &&
                                        _jsx('div', {
                                            className:
                                                'text-red-600 mt-8 dark:text-red-400',
                                            children: warningMessage,
                                        }),
                                    _jsxs('div', {
                                        className: 'relative mt-8',
                                        children: [
                                            _jsx('div', {
                                                className: 'absolute -inset-2',
                                                children: _jsx('div', {
                                                    className:
                                                        'w-full h-full mx-auto opacity-30 blur-lg filter',
                                                    style: {
                                                        background:
                                                            'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                                    },
                                                }),
                                            }),
                                            _jsx('button', {
                                                type: 'submit',
                                                className:
                                                    'relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600',
                                                children: loading
                                                    ? 'Loading...'
                                                    : 'Create',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
        }),
    });
}
function CustomSelect({
    options,
    value,
    onChange,
    placeholder,
    formatOptionLabel,
    loading = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef(null);
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // 👉 Loading শেষ হলে dropdown auto open হবে
    useEffect(() => {
        if (!loading && options.length > 0) {
            setIsOpen(true);
        }
    }, [loading, options]);
    useEffect(() => {
        const handleClickOutside = event => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSelect = option => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };
    return _jsxs('div', {
        className: 'relative',
        ref: selectRef,
        children: [
            _jsx('button', {
                type: 'button',
                onClick: () => !loading && setIsOpen(!isOpen),
                disabled: loading,
                className:
                    'w-full bg-input border border-border rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-ring/50 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200',
                children: loading
                    ? _jsx('div', {
                          className: 'flex w-full justify-center',
                          children: _jsx(Spin, { size: 'large' }),
                      })
                    : _jsxs(_Fragment, {
                          children: [
                              _jsx('span', {
                                  className: value
                                      ? 'text-foreground'
                                      : 'text-muted',
                                  children: value
                                      ? formatOptionLabel
                                          ? formatOptionLabel(value)
                                          : value.label
                                      : placeholder,
                              }),
                              _jsx(ChevronDown, {
                                  className: `w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`,
                              }),
                          ],
                      }),
            }),
            isOpen &&
                !loading &&
                _jsxs('div', {
                    className:
                        'absolute z-50 w-full mt-2 bg-gray-900 border border-gray-500 rounded-lg shadow-lg max-h-60 overflow-hidden',
                    children: [
                        _jsx('div', {
                            className: 'p-2 border-b border-border',
                            children: _jsx('input', {
                                type: 'text',
                                placeholder: 'Search...',
                                value: searchTerm,
                                onChange: e => setSearchTerm(e.target.value),
                                className:
                                    'w-full px-3 py-2 bg-input border border-gray-400 text-white placeholder-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring',
                            }),
                        }),
                        _jsx('div', {
                            className: 'max-h-48 overflow-y-auto',
                            children:
                                filteredOptions.length === 0
                                    ? _jsx('div', {
                                          className:
                                              'px-4 py-3 text-sm text-muted',
                                          children: 'No options found',
                                      })
                                    : filteredOptions.map(option =>
                                          _jsxs(
                                              'button',
                                              {
                                                  type: 'button',
                                                  onClick: () =>
                                                      handleSelect(option),
                                                  className:
                                                      'w-full text-gray-200 px-4 py-3 text-left hover:bg-accent/10 focus:bg-accent/10 focus:outline-none flex items-center justify-between group transition-colors duration-150',
                                                  children: [
                                                      _jsx('span', {
                                                          className:
                                                              'flex items-center',
                                                          children:
                                                              formatOptionLabel
                                                                  ? formatOptionLabel(
                                                                        option
                                                                    )
                                                                  : option.label,
                                                      }),
                                                      value?.value ===
                                                          option.value &&
                                                          _jsx(Check, {
                                                              className:
                                                                  'w-4 h-4 text-accent',
                                                          }),
                                                  ],
                                              },
                                              option.value
                                          )
                                      ),
                        }),
                    ],
                }),
        ],
    });
}
