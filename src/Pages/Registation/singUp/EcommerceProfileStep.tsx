import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getFromLocalStorage,
    setToLocalStorage,
} from '@/helpers/local-storage';
import { useQuery } from '@tanstack/react-query';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Option } from './CustomSelect_Type';
import { CustomSelect } from './CustomSelect';

const fetchCountries = async (): Promise<Option[]> => {
    const response = await fetch(
        'http://localhost:5005/api/v1/address/countries'
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
        `http://localhost:5005/api/v1/address/divisions?countryId=${countryId}`
    );
    const result = await response.json();
    return result?.data?.map((division: any) => ({
        value: division.value,
        label: division.label,
    }));
};

export default function EcommerceProfileStep() {
    const [warning, setWarning] = useState('');
    const [country, setCountry] = useState<Option | null>(null);
    const [division, setDivision] = useState<Option | null>(null);
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { data: countries = [], isLoading: loadingCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    const { data: divisions = [], isLoading: loadingDivisions } = useQuery({
        queryKey: ['divisions', country?.value],
        queryFn: () => fetchDivisions(country?.value || ''),
        enabled: !!country,
    });

    useEffect(() => {
        setDivision(null);
    }, [country]);

    const onSubmitHandler = async (
        e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!country) {
            setWarningMessage('Country is required');
            return;
        }
        if (!division) {
            setWarningMessage('Division is required');
            return;
        }
        if (!postalCode || postalCode.trim() === '') {
            setWarningMessage('Postal code is required');
            return;
        }
        if (!phone || phone.trim() === '') {
            setWarningMessage('Phone number is required');
            return;
        }
        if (!address || address.trim() === '') {
            setWarningMessage('Address is required');
            return;
        }

        const bodyData = {
            country,
            division,
            postal_code: postalCode,
            phone: `+${phone}`,
            address,
        };

        setToLocalStorage('address_info', JSON.stringify(bodyData));
        navigate('/workspace/package');
    };

    return (
        <div className="container-home">
            <section>
                <div className="min-h-full lg:flex lg:flex-row-reverse lg:justify-between">
                    <div className="justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900 sm:px-6 lg:px-20 xl:px-24 rounded-r-xl">
                        <div>
                            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white sm:text-4xl xl:text-5xl font-pj lg:text-left">
                                Shop Information
                            </h1>

                            <form
                                onChange={() => setWarningMessage(null)}
                                onSubmit={onSubmitHandler}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
                                    {/* Country */}
                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Country{' '}
                                            <span className="ml-1">Name</span>
                                        </label>
                                        <div className="mt-2.5 relative">
                                            <CustomSelect
                                                options={countries}
                                                value={country}
                                                onChange={setCountry}
                                                placeholder="Select Country"
                                                loading={loadingCountries}
                                            />
                                            {warningMessage ===
                                                'Country is required' && (
                                                <p className="text-red-600 mt-2 text-sm">
                                                    {warningMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Division */}
                                    <div>
                                        <label className="text-base font-medium text-gray-900 dark:text-white">
                                            State/Division{' '}
                                            <span className="ml-1">Name</span>
                                        </label>
                                        <div className="mt-2.5 relative">
                                            <CustomSelect
                                                options={divisions}
                                                value={division}
                                                onChange={setDivision}
                                                placeholder="Select State/Division"
                                                loading={loadingDivisions}
                                            />
                                            {warningMessage ===
                                                'Division is required' && (
                                                <p className="text-red-600 mt-2 text-sm">
                                                    {warningMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Zip Code */}
                                    <div>
                                        <label className="text-base font-medium text-gray-900 dark:text-white">
                                            Zip Code
                                        </label>
                                        <div className="mt-2.5 relative">
                                            <input
                                                required
                                                type="text"
                                                name="zipCode"
                                                id="zipCode"
                                                value={postalCode}
                                                onChange={e =>
                                                    setPostalCode(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                                placeholder="Enter Zip Code"
                                            />
                                            {warningMessage ===
                                                'Postal code is required' && (
                                                <p className="text-red-600 mt-2 text-sm">
                                                    {warningMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="text-base font-medium text-gray-900 dark:text-white">
                                            Official{' '}
                                            <span className="px-1">Phone</span>{' '}
                                            Number
                                        </label>
                                        <div className="phone-input-wrapper w-full mt-2">
                                            <PhoneInput
                                                value={phone}
                                                onChange={setPhone}
                                                country={'bd'}
                                                enableSearch={true}
                                                inputClass="
                                                    !w-full !py-6 !pl-12 !pr-10 
                                                    !rounded-lg 
                                                    !border !border-gray-300 
                                                    bg-white text-gray-900
                                                    dark:!bg-gray-900 dark:!text-white dark:!border-gray-700
                                                    focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500
                                                "
                                                buttonClass="!border-none !bg-transparent hover:bg-gray-900 dark:hover:bg-gray-700"
                                                dropdownClass="
                                                    !bg-white !text-gray-900 
                                                    dark:!bg-[#1f2937] dark:!text-white 
                                                    !border !border-gray-200 dark:!border-gray-700 
                                                    !rounded-lg !shadow-lg
                                                "
                                                searchClass="
                                                    !bg-white !text-gray-900 
                                                    dark:!bg-[#374151] dark:!text-white 
                                                    !rounded-md !border 
                                                    !border-gray-300 dark:!border-gray-600
                                                "
                                            />
                                            {warningMessage ===
                                                'Phone number is required' && (
                                                <p className="text-red-600 mt-2 text-sm">
                                                    {warningMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mt-4">
                                    <label className="text-base font-medium text-gray-900 dark:text-white">
                                        Your <span className="px-1">Full</span>{' '}
                                        Address
                                    </label>
                                    <div className="mt-2.5 relative">
                                        <input
                                            type="text"
                                            required
                                            name="address"
                                            id="address"
                                            value={address}
                                            onChange={e =>
                                                setAddress(e.target.value)
                                            }
                                            placeholder="Enter Your Full Address"
                                            className="w-full px-4 py-5 border border-gray-300 dark:border-gray-700 rounded-lg 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white 
                                            bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900"
                                        />
                                        {warningMessage ===
                                            'Address is required' && (
                                            <p className="text-red-600 mt-2 text-sm">
                                                {warningMessage}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
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
                                        className="relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-600 dark:bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-700"
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
