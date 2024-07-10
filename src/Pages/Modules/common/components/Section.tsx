interface SectionProps {
    title: string;
    sideComponent?: React.ReactNode;
    children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
    title,
    sideComponent,
    children,
}) => {
    return (
        <div className="text-black dark:text-white">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-light-dark text-xl dark:text-gray-300">
                    {title}
                </h1>

                {sideComponent && sideComponent}
            </div>

            <div>{children}</div>
        </div>
    );
};

export default Section;
