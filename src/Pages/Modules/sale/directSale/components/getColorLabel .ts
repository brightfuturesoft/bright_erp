const colorNameMap: Record<string, string> = {
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#00FFFF': 'Cyan',
    '#FFC0CB': 'Pink',
    '#808080': 'Gray',
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#A52A2A': 'Brown',
    '#008000': 'Dark Green',
    '#FFD700': 'Gold',
    '#4B0082': 'Indigo',
    '#ADD8E6': 'Light Blue',
    '#90EE90': 'Light Green',
    '#FF69B4': 'Hot Pink',
    '#FFA07A': 'Light Salmon',
    '#20B2AA': 'Light Sea Green',
    '#B22222': 'Firebrick',
    '#F5DEB3': 'Wheat',
    '#D2691E': 'Chocolate',
    '#8B4513': 'Saddle Brown',
};

export const getColorLabel = (colorValue: string) => {
    if (!colorValue) return 'No Color';
    return colorNameMap[colorValue] || colorValue;
};
