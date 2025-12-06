import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/ProductDetails.styles.css";
import EnquiryForm from "../components/enquiryForm/EnquiryForm";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="details-container">
            <div className="image-section">
                <img src={product.image_url} alt={product.name} />
            </div>

            <div className="info-section">
                <h1>{product.name}</h1>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price}</p>
                <p className="description">{product.long_desc}</p>

                <button className="enquiry-btn" onClick={() => setShowForm(true)}>
                    Enquire Now
                </button>

                {showForm && (
                    <EnquiryForm
                        productId={product.id}
                        onClose={() => setShowForm(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
