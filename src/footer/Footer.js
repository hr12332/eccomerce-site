import { Col, Row } from "antd";
import React from "react";
import "./footer.css";
import { InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <Row justify="center" align="middle" className="footer-row">
          <Col lg={2} md={12} sm={24} xs={24}></Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="name">Hritik Raghuwanshi</div>
            <div className="description">
              {" "}
              Lorem ipsum is typically a corrupted version
            </div>
          </Col>

          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="follow">Follow Us</div>
            <div className="icons-div">
              <div className="instagram">
                <a
                  href="https://www.instagram.com/hritik.raghuwanshi.528/"
                  target="blank"
                >
                  <InstagramOutlined className="insta-icon"/>
                </a>
              </div>
              <div className="linkedin">
                <a
                  href="https://www.linkedin.com/in/hritik-raghuwanshi-3b39b5232"
                  target="blank"
                >
                  <LinkedinOutlined className="linkedin-icon"/>{" "}
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="call-heading">Call Us</div>
            <div className="number">+91 1234567890</div>
          </Col>
        </Row>
        <div className="line-footer">
        <Row justify="center" align="middle">
          <Col lg={12} md={24} sm={24} xs={24}>
            <div className="copyright">Copyright © 2022 Theme by - Hritik Raghuwanshi</div>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <div className="privacy">
                PRIVACY POLICY TERMS & CONDITIONS
            </div>
          </Col>
        </Row>
        </div>
      
      </div>
    </>
  );
};

export default Footer;
