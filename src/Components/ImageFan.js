// ImageFan.js
import React, { useState } from 'react';
import '../Css/ImageFan.css';

const ImageFan = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="image-fan">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    className={`image-fan__image ${image === selectedImage ? 'image-fan__image--selected' : ''}`}
                    onClick={() => setSelectedImage(image)}
                    style={{ '--i': index }} // Asigna un valor a --i para cada imagen
                />
            ))}
        </div>
    );
};

export default ImageFan;