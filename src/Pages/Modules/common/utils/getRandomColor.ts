const colorsList = [
    {
        bgColor: '#EAF6FF',
        iconBgColor: '#C3E7FF',
        borderColor: '#6198E2',
        textColor: '#4682B4',
    },
    {
        bgColor: '#EBF6F1',
        iconBgColor: '#C7E6C7',
        borderColor: '#4C8946',
        textColor: '#3F7F3F',
    },
    {
        bgColor: '#FBEDEA',
        iconBgColor: '#F6E9C8',
        borderColor: '#D6A800',
        textColor: '#A87900',
    },
    {
        bgColor: '#ECF1F8',
        iconBgColor: '#C8D6E0',
        borderColor: '#4F83B2',
        textColor: '#3E6EA3',
    },
    {
        bgColor: '#F9ECEC',
        iconBgColor: '#F8EFCB',
        borderColor: '#F7B800',
        textColor: '#AD7800',
    },
    {
        bgColor: '#F4FAFB',
        iconBgColor: '#D6E9ED',
        borderColor: '#8DB3B2',
        textColor: '#6F8C8B',
    },
    {
        bgColor: '#EAF6FF',
        iconBgColor: '#C3E7FF',
        borderColor: '#B7DDE8',
        textColor: '#72C2D4',
    },
];

const getRandomColor = () => {
    return colorsList[Math.floor(Math.random() * colorsList.length)];
};

export default getRandomColor;
