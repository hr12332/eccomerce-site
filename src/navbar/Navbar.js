import React from "react";
import Aos from "aos";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
// import logo from "../navbar/images/logo.png";
import logo from "../navbar/images/logo.png";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {" "}
      <img
        src={logo}
        className="logo"
        onClick={() => navigate("/homepage")}
      />{" "}
      <div className="nav-items">
        <div className="items" onClick={() => navigate("/homepage")}>
          HOME
        </div>
        <div className="items" onClick={() => navigate("/product")}>
          PRODUCTS
        </div>
        <div className="items" onClick={() => navigate("/contactus")}>
          CONTACT
        </div>
        <div className="logout" onClick={() => navigate("/login")}>
          LOG OUT
        </div>
        <div className="cart">
          <div className={`${scrolled ? "count_cart1" : "count_cart"}`}>
            {cartArray.length}
          </div>
          <ShoppingCartOutlined
            onClick={() => navigate("/cart")}
            className="cart_image"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
