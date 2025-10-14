import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Spin } from 'antd';
import { CustomSelectProps, Option } from './CustomSelect_Type';

export function CustomSelect({
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
                className="w-full  bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg px-4 py-3 text-left flex items-center justify-between  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 transition-all duration-200"
            >
                {loading ? (
                    <div className="flex w-full justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <span
                            className={
                                value
                                    ? 'text-foreground '
                                    : 'text-black dark:text-white'
                            }
                        >
                            {value
                                ? formatOptionLabel
                                    ? formatOptionLabel(value)
                                    : value.label
                                : placeholder}
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 text-black transition-transform  dark:text-gray-800  duration-200 ${
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
                            className="w-full px-3 py-2 bg-input border border-gray-400 dark:text-white text-black dark:placeholder-black placeholder-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
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
                                    className="w-full  dark:text-gray-200 text-black px-4 py-3 text-left hover:bg-accent/10 focus:bg-accent/10 focus:outline-none flex items-center justify-between group transition-colors duration-150"
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
