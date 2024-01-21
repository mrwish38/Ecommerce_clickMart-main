import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";
import Home from "./pages/Home/home";
import Products from "./pages/Product/viewStore";
import ProductDetails from "./pages/Product/productDetails";
import Contact from "./pages/contact";
import About from "./pages/about";
import Profile from "./pages/Account/profile";
import LoginSignup from "./pages/Account/login_signup";
import FAQ from "./pages/faq";
import TNC from "./pages/tnc";
import SizeChart from "./pages/sizeChart";
import PrivacyPolicy from "./pages/privacy-policy";
import ReturnPolicy from "./pages/return-policy";
import ShippingPolicy from "./pages/shipping-policy";
import Cart from "./pages/Cart/cart";
import CheckOut from "./pages/Cart/checkout";
import ConfirmOrder from "./pages/Cart/confirmOrder";
import Payment from "./pages/Cart/payment";
import OrderSuccess from "./pages/Cart/orderSuccess";
import MyOrders from "./pages/Order/myOrders";
import OrderDetails from "./pages/Order/orderDetails";
import { LoadUser } from "./actions/userAction";
import store from "./store";
import ProtectedRoute from "./components/Route/protectedRoutes";
import UpdateProfile from "./pages/Account/updateProfile";
import UpdatePassword from "./pages/Account/updatePassword";
import ForgotPassword from "./pages/Account/forgotPassword";
import ResetPassword from "./pages/Account/resetPassword";
import PageNotFound from "./pages/pageNotFound";

const App = () => {
  React.useEffect(() => {
    store.dispatch(LoadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/products" element={<Products />} exact />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="contact" element={<Contact />} exact />
            <Route path="about" element={<About />} exact />
            <Route path="/login" element={<LoginSignup />} exact />
            <Route path="/password/forgot" element={<ForgotPassword />} exact />
            <Route path="/password/reset/:token" element={<ResetPassword />} exact />
            <Route path="tnc" element={<TNC />} exact />
            <Route path="faq" element={<FAQ />} exact />
            <Route path="sizeChart" element={<SizeChart />} exact />
            <Route path="privacy-policy" element={<PrivacyPolicy />} exact />
            <Route path="shipping-policy" element={<ShippingPolicy />} exact />
            <Route path="return-policy" element={<ReturnPolicy />} exact />

            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<Cart />} exact />
              <Route path="/account" element={<Profile />} exact />
              <Route path="/me/update" element={<UpdateProfile />} exact />
              <Route path="/password/update" element={<UpdatePassword />} exact />
              <Route path="/checkout" element={<CheckOut />} exact />
              <Route path="/order/confirm" element={<ConfirmOrder />} exact />
              <Route path="/process/payment" element={<Payment />} exact />
              <Route path="/success" element={<OrderSuccess />} exact />
              <Route path="/orders" element={<MyOrders />} exact />
              <Route path="/order/:id" element={<OrderDetails />} exact />
            </Route>
            
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
