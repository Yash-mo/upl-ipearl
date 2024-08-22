import './App.css';
import Header from './Components/header';
import Footer from './Components/footer';
import Homescreen from './screens/homescren';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/productscreen';
import Loginscreen from './screens/Loginscreen';
import Regscreen from './screens/regscreen';
import { useState } from 'react';
import Cartscreen from './screens/Cartscreen';
import Shippingscreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProtectedRoute from './comn/ProtectedRoute';

function App() {

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const [token, settoken] = useState(localStorage.getItem('token') || '')
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  return (
    <BrowserRouter>
      <div className="App">
        <Header setuserInfo={setUserInfo} settoken={settoken} userInfo={userInfo} token={token} cartItems={cartItems} setcartItems={setcartItems} />
        <main style={{ minHeight: '107.8vh' }}>
          <Routes>
            <Route path="/product" element={<ProtectedRoute token={token}><Homescreen /></ProtectedRoute>} />
            <Route path='/product/:id' element={<ProtectedRoute token={token}><ProductScreen cartItems={cartItems} setcartItems={setcartItems} /></ProtectedRoute>} />
            {/* login register */}
            <Route path='/' element={<Loginscreen setUserInfo={setUserInfo} setToken={settoken} />} />
            <Route path='/registration' element={<Regscreen setUserInfo={setUserInfo} setToken={settoken} />} />

            <Route path="/Addtocart" element={<ProtectedRoute token={token}><Cartscreen cartItems={cartItems} setcartItems={setcartItems} /></ProtectedRoute>} />
            <Route path="/Shipping" element={<ProtectedRoute token={token}><Shippingscreen /></ProtectedRoute>} />
            <Route path="/Placeorder" element={<ProtectedRoute token={token}><PlaceOrderScreen cartItems={cartItems} setcartItems={setcartItems} /></ProtectedRoute>} />
            <Route />
          </Routes>
        </main >
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;


