import React from "react";
import styles from './css/PostCard.module.css'; // Asegúrate de que la ruta sea correcta

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface CardProps {
    product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
    return (
        <div className={styles.postCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;
