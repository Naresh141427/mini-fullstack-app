import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.id}`} className="card">
            <img
                src={product.image_url}
                alt={product.name}
                className="card-img"
            />

            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-price">₹{product.price}</p>
            </div>
        </Link>
    );
}

export default ProductCard;
