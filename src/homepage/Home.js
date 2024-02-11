import React, { Fragment } from "react";
import { useEffect } from "react";
import "./home.css";
import Aos from "aos";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { Button, Card, Col, Row } from "antd";
import banner from "../homepage/images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/products/actioncCreator";
import Footer from "../footer/Footer";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    await dispatch(getProducts());
  };

  const data = useSelector((state) => state.ProductReducer.product.products);
  // console.log(data);
  return (
    <>
      <Navbar />

      <div className="container-1">
        <Row justify="center" align="middle">
          <Col lg={12} md={8} sm={24} xs={24}>
            <div className="wrap">
              <div className="welcome">WELCOME TO</div>
              <div className="title">E Commerce Store</div>
              <div className="text">
                Lorem ipsum is typically a corrupted version
              </div>

              <Button className="shopNow" onClick={() => navigate("/product")}>
                SHOP NOW
              </Button>
            </div>
          </Col>
          <Col lg={12} md={8} sm={24} xs={24}>
            <img src={banner} alt="Banner" className="banner" />
          </Col>
        </Row>
        <div className="feature_section">
          <div className="check_now">CHECK NOW</div>
          <div className="feature_services">Our Feature Services</div>
          <Row justify="start" gutter={[24, 24]}>
            {data && data.length > 0
              ? data.slice(0, 3).map((feature) => {
                  const exchangeRate = 83;
                  const originalPriceInRupees = feature.price * exchangeRate;
                  return (
                    <Fragment key={feature.id}>
                      <Col lg={8} md={12} sm={24} xs={24}>
                        <Card
                          hoverable
                          className="feature_card"
                          cover={
                            <img
                              alt={feature.title}
                              src={feature.images[0]}
                              className="card_img"
                            />
                          }
                          onClick={() => {
                            navigate("/productdetail", {
                              state: {
                                id: feature.id,
                              },
                            });
                          }}
                        >
                          <div className="wrap_content">
                            <div className="feature_title">{feature.title}</div>
                            <div className="feature">
                              &#x20B9;
                              {Math.round(originalPriceInRupees.toFixed(2))}
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Fragment>
                  );
                })
              : "No Data"}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
