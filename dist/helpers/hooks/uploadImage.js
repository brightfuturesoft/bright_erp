// @ts-ignore
import Erp_Alert from '@alert';
const uploadImage = async file => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const url = `https://server.orybiz.com/api/v1/image/upload-image`;
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        const imageData = await response.json();
        return imageData.data.image_url;
    } catch (error) {
        Erp_Alert('Error', 'Failed to upload image', 'error');
    }
};
export default uploadImage;
