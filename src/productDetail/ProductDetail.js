import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./ProductDetail.css";
import { Button, Col, Divider, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { getProfileByIdData } from "../redux/products/actioncCreator";
import { useDispatch, useSelector } from "react-redux";
const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const id = location && location.state.id;
  // console.log("id : ", id);
  useEffect(() => {
    getProfileByIdApi();
  }, []);
  const getProfileByIdApi = () => {
    dispatch(getProfileByIdData(id));
  };
  const ProfileDataById = useSelector(
    (state) => state.ProductReducer.profileId
  );
  // console.log(ProfileDataById);
  const exchangeRate = 83;
  const originalPriceInRupees = ProfileDataById.price
    ? ProfileDataById.price * exchangeRate
    : 0;

  const discountMultiplier =
    ProfileDataById.discountPercentage !== undefined
      ? 1 - ProfileDataById.discountPercentage / 100
      : 1;

  const discountedPriceInRupees = originalPriceInRupees * discountMultiplier;
  const generateStars = (rating) => {
    const maxStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;

    const stars = [];
    {
      /* console.log(stars) */
    }
    for (let i = 0; i < maxStars; i++) {
      if (roundedRating - i >= 0.5) {
        stars.push(<span key={i}>&#9733;</span>);
      } else if (roundedRating - i > 0) {
        stars.push(<span key={`half-${i}`}>&#9734;&#9733;</span>);
      } else {
        stars.push(<span key={`empty-${i}`}>&#9734;</span>);
      }
    }

    return stars;
  };

  const starRating = generateStars(ProfileDataById.rating);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleCart = () => {
    const isProductInCart = cart.some((item) => item.id == ProfileDataById.id);
    if (isProductInCart) {
      message.error("This product is already present in your cart");
      return;
    } else {
      const updatedCart = [...cart, ProfileDataById];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      message.success("Successfully added to your cart");
      return;
    }
  };

  // console.log("cart", cart);
  return (
    <>
      <Navbar />
      <div className="detail_container">
        <div className="back-button">
          <Button className="back" onClick={() => navigate("/product")}>
            Back
          </Button>
        </div>
        <div className="product_detail">
          <Row justify="center" gutter={[24, 24]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {ProfileDataById.images && ProfileDataById.images.length > 0 && (
                <img src={ProfileDataById.images[0]} className="product_img" />
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="product_title">{ProfileDataById.title}</div>
              <div className="price_div">
                {ProfileDataById.discountPercentage ? (
                  <span className="discount_price">
                    -{Math.round(ProfileDataById.discountPercentage)}%
                  </span>
                ) : (
                  "-0%"
                )}
                <span className="price">
                  &#x20B9;{Math.round(discountedPriceInRupees)}
                </span>
              </div>
              <div className="mrp_div">
                <p className="original_price">
                  M.R.P:&#x20B9;
                  <del>{Math.round(originalPriceInRupees)}</del>
                </p>
              </div>
              <section className="star_rating">
                {starRating}{" "}
                <span className="total_rating">({ProfileDataById.rating})</span>
              </section>
              <Divider style={{ backgroundColor: "#959595" }} />
              <div className="description_div">
                <p className="about_heading">About this item</p>
                <p className="description">{ProfileDataById.description}</p>
              </div>
              <Divider style={{ backgroundColor: "#959595" }} />
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="brand_heading">Brand</span>
                      </td>
                      <td>
                        <span className="brand_name">
                          {ProfileDataById.brand}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="brand_heading">Category</span>
                      </td>
                      <td>
                        <span className="brand_name">
                          {ProfileDataById.category}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="brand_heading">Stock</span>
                      </td>
                      <td>
                        <span className="brand_name">
                          {ProfileDataById.stock}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="cart_div">
                <Button className="cart_btn" onClick={handleCart}>
                  Add to cart
                </Button>
                <Button
                  className="GoCart_btn"
                  onClick={() => navigate("/cart")}
                >
                  Go to cart
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
