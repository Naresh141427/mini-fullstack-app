import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/productCard/ProductCard";
import "../styles/ProductList.styles.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products", {
                    params: { search, category, page, limit: 6 }
                });

                setProducts(res.data.products);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category, page]);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h1>Products</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="grid">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))
                )}
            </div>

            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default ProductList;
