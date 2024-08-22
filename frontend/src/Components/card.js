import { Link } from "react-router-dom";
import Rating from "./rating";
import './card.css'

export default function Card({ product }) {
  return (
    <Link className="card-link" to={`/product/${product._id}`}>
      <div className="card align-items-center card-size">
        <div className="card-image-container">
          <img src={product.image} className="card-img-top" alt={product.name}></img>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <div className="rating-container d-flex align-items-center justify-content-center mt-2">
            <Rating rating={product.rating} />
            <span className="text-dark ms-2">({product.ratings})</span>
          </div>
          <div className="price mt-3">
            <h5 className="fw-bold">${product.price}</h5>
          </div>
          <div className="mt-3">
            <div className="card-link-btn">Add to Cart</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
