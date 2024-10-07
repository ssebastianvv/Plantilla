"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductCard from "../FormPost/PostCard"; // Asegúrate de que la ruta sea correcta
import styles from './css/PostCard.module.css'; // Asegúrate de que la ruta sea correcta
import { URL_BASE } from "@/endpoint"; // Asegúrate de que la ruta sea correcta

const ProductsPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            fetchProducts();
        }
    }, [status, router]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const accessToken = session?.user?.accessToken; 
            const response = await fetch(`${URL_BASE}auth/products`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }

            const data = await response.json();
            setProducts(data); // Asegúrate de que `data` tenga el formato correcto
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || status === "loading") {
        return <div>Loading...</div>; 
    }

    return (
        <div className={styles.containerProducts}>
            <h1 className={styles.title}>Products</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductsPage;
