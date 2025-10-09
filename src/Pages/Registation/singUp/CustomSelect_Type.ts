export type Option = {
    value: string;
    label: string;
};

export interface CustomSelectProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder: string;
    formatOptionLabel?: (option: Option) => React.ReactNode;
    loading?: boolean;
}
