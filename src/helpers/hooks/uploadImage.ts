// useImageUpload.js

const uploadImage = async (file: File) => {
    console.log('🚀 ~ file: uploadImage.ts:4 ~ uploadImage ~ file:', file);
    try {
        const formData = new FormData();
        formData.append('image', file);
        const url = `http://localhost:5001/api/v1/image/upload`;
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            // Swal.fire('Failed to upload image', '', 'error');
            throw new Error('Failed to upload image');
        }

        const imageData = await response.json();
        console.log('🚀 ~ imageData:', imageData);
        return imageData.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        // Swal.fire('Error uploading image', error.message, 'error');
        return null; // Return null to indicate the upload failed
    }
};

export default uploadImage;
