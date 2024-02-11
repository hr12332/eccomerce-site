import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./cart.css";
import FeatherIcon from "feather-icons-react";

import { Table, Empty, Row, Col, Button } from "antd";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const storedProducts = localStorage.getItem("cart");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  // console.log(cart);

  const [Count, setCount] = useState(0);

  //   console.log(cart);
  const FirstLetterCapital = (word = "") => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const CartData = JSON.parse(localStorage.getItem("cart")) || [];
  const userName = JSON.parse(localStorage.getItem("user")) || [];
  //   console.log(CartData);
  const handleRemoveFromCart = (itemId) => {
    const updatedCart = CartData.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  const exchangeRate = 83;

  const columns = [
    {
      title: "ITEM",
      dataIndex: "item",
      key: "item",
      align: "center",
      render: (text, record) => (
        <div className="cart-items">
          <div className="wrapper_item">
            <img
              src={record.images[0]}
              alt={record.title}
              className="item_img"
            />
            <span className="record_title">
              {FirstLetterCapital(record.title)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRICE",
      key: "price",
      align: "center",
      render: (text, record) => (
        <div className="cart-items">
          <div className="wrapper_item">
            &#x20B9;{Math.round(record.price * exchangeRate)}
          </div>
        </div>
      ),
    },
    {
      title: "QUANTITY",
      key: "quantity",
      align: "center",
      render: () => (
        <div className="count_div">
          <div
            className="decrement"
            onClick={() => setCount(Count > 0 ? Count - 1 : 0)}
          >
            -
          </div>
          <div>{Count}</div>
          <div className="increment" onClick={() => setCount(Count + 1)}>
            +
          </div>
        </div>
      ),
    },
    {
      title: "SUBTOTAL",
      key: "subtotal",
      align: "center",
      render: (text, record) => (
        <div>&#x20B9;{record.price * exchangeRate * Count}</div>
      ),
    },
    {
      title: "REMOVE",
      key: "action",
      align: "center",
      render: (icon, target, index) => (
        <div>
          <FeatherIcon
            onClick={() => handleRemoveFromCart(target.id)}
            className="feather_icon mr-10"
            icon="trash-2"
            width="17"
          />
        </div>
      ),
    },
  ];
  let locale = {
    emptyText: (
      <>
        <Empty />;
      </>
    ),
  };
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setCount(0);
  };

  return (
    <>
      <Navbar />
      <div className="cart_container">
        <div className="username">
          {FirstLetterCapital(userName.name)} Cart Items
        </div>
        <div className="table_layout">
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              {CartData && CartData.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={CartData}
                  rowKey={(record) => record.id}
                  pagination={false}
                  scroll={{ x: "45vh" }}
                />
              ) : (
                <Table
                  locale={locale}
                  columns={columns}
                  dataSource={CartData}
                  scroll={{ x: "45vh" }}
                />
              )}
            </Col>
          </Row>
        </div>
        <div className="clear_div" onClick={handleClearCart}>
          CLEAR CART
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
