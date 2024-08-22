import { useNavigate, useParams } from "react-router-dom";
import apiHelper from "../comn/ApiHelper";
import { useEffect, useState } from "react";
import MessageBox from "../Components/MessageBox";
import Loader from "../Components/Loader";
import './productscreen.css'; // Import your CSS file

export default function ProductScreen(props) {
    const { setcartItems, cartItems } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(false);
    const [Product, setProdcuts] = useState({});
    const [err, seterr] = useState("");
    const [qty, setqty] = useState(1);

    const getProduct = async () => {
        try {
            setisLoading(true);
            const result = await apiHelper.fetchproductByid(id);
            setisLoading(false);
            if (result.status === 200) {
                setProdcuts(result.data.product);
            }
        } catch (error) {
            setisLoading(false);
            seterr(error.message);
        }
    };
// eslint-disable-next-line 
    useEffect(() => { getProduct() }, [id]);

    const AddToCart = () => {
        try {
            console.log(cartItems)
            const findIndex = cartItems.findIndex((x) => x.product === id);
            if (findIndex > -1) {
                cartItems[findIndex].qty = qty;
            } else {
                cartItems.push({ product: id, qty: qty });
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            setcartItems(cartItems);
            navigate("/Addtocart");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="product-screen-container">
            {err && err.length > 0 ? (
                <MessageBox message={err} />
            ) : (
                <>
                    <Loader loading={isLoading} />
                    <div className="container product-details">
                        <div className="row">
                            <div className="col-md-6 product-image">
                                <img src={Product.image} className="img-fluid" alt={Product.name} />
                            </div>
                            <div className="col-md-6 product-info">
                                <h2 className="product-title">{Product.brand}</h2>
                                <h4 className="product-subtitle text-secondary">{Product.name}</h4>
                                <div className="rating mt-2">
                                    <span>{Product.rating}</span>
                                    <i className="fa-solid fa-star"></i>
                                    <span className="text-dark ms-2">({Product.ratings}/10)</span>
                                </div>
                                <div className="stock-status mt-2">
                                    <span>Status:</span>
                                    <span className={Product.stocks > 0 ? "text-success" : "text-danger"}>
                                        {Product.stocks > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                                <hr />
                                <div className="price-info mt-3">
                                    <h3 className="price">${Product.price}</h3>
                                    <span className="discount">
                                        MRP <span className="text-decoration-line-through">${Product.discount}</span>
                                    </span>
                                    <div className="discount-info d-none d-md-block">
                                        Discount: {Product.dis}
                                    </div>
                                    <div className="tax-info mt-2">
                                        <span>Inclusive of all taxes</span>
                                    </div>
                                </div>
                                <div className="quantity-selector mt-3 align-items-center ">
                                    <h5 className="quantity-title">Quantity</h5>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button
                                            onClick={() => setqty(qty - 1)}
                                            disabled={qty <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{qty}</span>
                                        <button
                                            onClick={() => setqty(qty + 1)}
                                            disabled={qty >= Product.stocks}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-3"
                                        disabled={Product.stocks <= 0}
                                        onClick={AddToCart}
                                    >
                                        Add to Cart <i className="bi bi-cart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
