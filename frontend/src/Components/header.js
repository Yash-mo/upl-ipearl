import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../header.css'

export default function Header({ token, setuserInfo, settoken, cartItems }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const clickToLogin = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    return navigate("/");
  };

  const Logouthandler = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    settoken("");
    setuserInfo({});
    return navigate("/");
  };

  const closeback = () => {
    console.log("no way");
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Search term:", searchTerm);
  };

  return (
    <header className="bg-dark text-light px-3 d-flex flex-row flex-md-row  justify-content-between">
      <div className="logo mb-md-0">
        <h3 className="mb-0 fw-bold">
          <span>iPearl</span>
        </h3>
      </div>

      <div className="search-bar flex-column flex-md-row align-items-center mb-3 mb-md-0">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-light">
          <SearchIcon />
        </button>
      </div>

      <div className="header-right d-flex flex-row flex-md-row align-items-center gap-2 py-2 text-light">
        <Link to="/Addtocart" className=" align-items-center cart-icon">
          <div className="position-relative">
            <ShoppingCartIcon fontSize="large" />
            {cartItems.length > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>

        <button
          type="button"
          className="btn btn-warning fw-bold bg-gradient"
          onClick={token ? () => { Logouthandler(); closeback(); } : clickToLogin}
        >
          {token ? "Logout" : "Sign In"}
        </button>

        <Link to="/Registration">
          <button type="button" className="btn btn-warning fw-bold bg-gradient">
            Create Account
          </button>
        </Link>
      </div>
    </header>
  );
}
