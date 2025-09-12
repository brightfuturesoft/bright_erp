export const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    return (
        '#' +
        result
            .map(x => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
};

export const rgbToColorName = (rgb: string): string => {
    const [r, g, b] = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
    if (r === 0 && g === 0 && b === 0) return 'Black';
    if (r === 255 && g === 255 && b === 255) return 'White';
    if (r === 255 && g === 0 && b === 0) return 'Red';
    if (r === 0 && g === 255 && b === 0) return 'Green';
    if (r === 0 && g === 0 && b === 255) return 'Blue';
    if (r === 255 && g === 255 && b === 0) return 'Yellow';
    if (r === 0 && g === 255 && b === 255) return 'Cyan';
    if (r === 255 && g === 0 && b === 255) return 'Magenta';
    return rgbToHex(rgb);
};
