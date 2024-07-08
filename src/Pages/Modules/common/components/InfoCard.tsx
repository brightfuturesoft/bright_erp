interface InfoCardProps {
    title: string;
    amount: number;
    icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, amount, icon }) => {
    return (
        <div>
            <div>{icon}</div>
            <div>
                <h1>{title}</h1>
                <p>৳ {amount}</p>
            </div>
        </div>
    );
};

export default InfoCard;
