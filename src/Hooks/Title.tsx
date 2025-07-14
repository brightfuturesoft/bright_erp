import React from 'react';

interface TitleProps {
    subtitle: string;
    title: string;
    description: any;
}

const Title: React.FC<TitleProps> = ({ subtitle, title, description }) => {
    return (
        <div className="flex flex-col gap-2 dark:text-light text-gray-800  md:w-[600px] m-auto w-[320px] items-center">
            {subtitle && (
                <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                    <p className="text-xs font-semibold tracking-widest text-gray-50 uppercase">
                        {subtitle}
                    </p>
                </div>
            )}
            {title && (
                <h1 className="md:text-4xl text-xl font-black uppercase text-center">
                    {title}
                </h1>
            )}
            {description && (
                <p className="text-base text-center text-body-color dark:text-gray-400 text-dark">
                    {description}
                </p>
            )}
        </div>
    );
};

export default Title;
