import axios from 'axios';
import {
    AtSign,
    Building2,
    Check,
    ChevronDown,
    Eye,
    EyeOff,
    Fingerprint,
    ImageUp,
    KeyRound,
    Mail,
    User,
} from 'lucide-react';
import {
    BaseSyntheticEvent,
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Erp_Alert from '@/helpers/erp_alert/Erp_Alert';
import {
    getFromLocalStorage,
    setToLocalStorage,
} from '@/helpers/local-storage';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { useQuery } from '@tanstack/react-query';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextArea from 'antd/es/input/TextArea';
import { Spin } from 'antd';

type Option = {
    value: string;
    label: string;
};

const fetchCountries = async (): Promise<Option[]> => {
    const response = await fetch(
        'https://server.orybiz.com/api/v1/address/countries'
    );
    const result = await response.json();
    return result?.data?.map((country: any) => ({
        value: country.value,
        label: country.label,
    }));
};

const fetchDivisions = async (countryId: string): Promise<Option[]> => {
    if (!countryId) return [];
    const response = await fetch(
        `https://server.orybiz.com/api/v1/address/divisions?countryId=${countryId}`
    );
    const result = await response.json();
    return result?.data?.map((division: any) => ({
        value: division.value,
        label: division.label,
    }));
};

const fetchCities = async (divisionId: string): Promise<Option[]> => {
    if (!divisionId) return [];
    const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${divisionId}&username=brightfuturesoft`
    );
    const data = await response.json();
    return data?.geonames?.map((city: any) => ({
        value: city.geonameId,
        label: city.name,
    }));
};

const fetchAreas = async (cityId: string): Promise<Option[]> => {
    if (!cityId) return [];
    const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${cityId}&username=brightfuturesoft`
    );
    const data = await response.json();
    return data?.geonames?.map((area: any) => ({
        value: area.geonameId,
        label: area.name,
    }));
};

export default function EcommerceProfileStep() {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState('');
    const [country, setCountry] = useState<Option | null>(null);
    const [division, setDivision] = useState<Option | null>(null);
    const [city, setCity] = useState<Option | null>(null);
    const [area, setArea] = useState<Option | null>(null);
    const [postal_code, setpostal_code] = useState<Option | null>(null);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    console.log(phone);

    const workSpaceJsonData = getFromLocalStorage('worspaceData');
    // @ts-ignore
    const workSpaceData = workSpaceJsonData as IWorkSpaceSchema;
    const navigate = useNavigate();

    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (
        e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ) => {
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

    return (
        <div className="container-home">
            <section>
                <div className="min-h-full lg:flex lg:flex-row-reverse lg:justify-between">
                    <div className="justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900  sm:px-6 lg:px-20 xl:px-24 rounded-r-xl">
                        <div className="">
                            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white  sm:text-4xl xl:text-5xl font-pj lg:text-left">
                                Shop Information
                            </h1>

                            <form
                                onChange={() => setWarning('')}
                                onSubmit={onSubmitHandler}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10 ">
                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Provide Country Name
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <CustomSelect
                                                options={countries}
                                                value={country}
                                                onChange={setCountry}
                                                placeholder="Select Country"
                                                loading={loadingCountries}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-base font-medium text-gray-900 dark:text-white">
                                            Provide State/Division Name
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <CustomSelect
                                                options={divisions}
                                                value={division}
                                                onChange={setDivision}
                                                placeholder="Select State/Division"
                                                loading={loadingDivisions}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Provide Zip Code
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <input
                                                type="text"
                                                name="zipCode"
                                                id="zipCode"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter Zip Code"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Provide Official Phone Number
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <PhoneInput
                                                value={phone}
                                                onChange={setPhone}
                                                country={'bd'} // default flag (Bangladesh)
                                                enableSearch={true}
                                                inputStyle={{
                                                    width: '100%',
                                                    padding: '24px 40px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #d1d5db',
                                                }}
                                                buttonStyle={{
                                                    border: 'none',
                                                    background: 'transparent',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900 dark:text-white"
                                    >
                                        Provide your full address
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <TextArea
                                            value={address}
                                            onChange={e =>
                                                setAddress(e.target.value)
                                            }
                                            rows={2}
                                            placeholder="Enter your full address"
                                            className="w-full px-4 text-white py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
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
                </div>
            </section>
        </div>
    );
}

interface CustomSelectProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder: string;
    formatOptionLabel?: (option: Option) => React.ReactNode;
    loading?: boolean;
}

interface CustomSelectProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder: string;
    formatOptionLabel?: (option: Option) => React.ReactNode;
    loading?: boolean; // 👈 নতুন prop
}

function CustomSelect({
    options,
    value,
    onChange,
    placeholder,
    formatOptionLabel,
    loading = false,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

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
            className="relative"
            ref={selectRef}
        >
            <button
                type="button"
                onClick={() => !loading && setIsOpen(!isOpen)}
                disabled={loading}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-ring/50 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200"
            >
                {loading ? (
                    <div className="flex w-full justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <span
                            className={value ? 'text-foreground' : 'text-muted'}
                        >
                            {value
                                ? formatOptionLabel
                                    ? formatOptionLabel(value)
                                    : value.label
                                : placeholder}
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 text-muted transition-transform dark:text-gray-200 text-black duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </>
                )}
            </button>

            {isOpen && !loading && (
                <div className="absolute z-50 w-full mt-2 dark:bg-gray-900 bg-gray-100 border dark:border-gray-500 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <div className="p-2 border-b border-border">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 bg-input border border-gray-400 dark:text-white text-black dark:placeholder-white placeholder-black rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
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
                                    className="w-full dark:text-gray-200 text-black px-4 py-3 text-left hover:bg-accent/10 focus:bg-accent/10 focus:outline-none flex items-center justify-between group transition-colors duration-150"
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
