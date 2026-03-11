import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosSecure('/api/Products/get_products')
                setProducts(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();    
        }, []);
    return { products, isLoading, error };
}