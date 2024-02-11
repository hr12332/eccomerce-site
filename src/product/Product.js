import {
  Card,
  Button,
  Form,
  Modal,
  Input,
  message,
  Tooltip,
  Popover,
  Select,
} from "antd";
import React, { Fragment } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import FeatherIcon from "feather-icons-react";
import { PlusOutlined } from "@ant-design/icons";
import Aos from "aos";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductData,
  deleteDepartmentData,
  editProductData,
  getProductCategory,
  getProducts,
  searchProducts,
} from "../redux/products/actioncCreator";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

import "./product.css";
import useStateRef from "react-usestateref";
const Product = () => {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [previewMedia, setPreviewMedia] = useState("");
  const [previewMediaData, setPreviewMediaData] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Department");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedId, setSelectedId, setSelectedIdRef] = useStateRef("");
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [displayedProductCount, setDisplayedProductCount] = useState(8);
  const { Meta } = Card;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getItems = JSON.parse(localStorage.getItem("user"));
  // console.log(getItems.Email);
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
    window.scrollTo(0, 0);
  }, []);
  const data = useSelector((state) => state.ProductReducer.product.products);
  useEffect(() => {
    fetchProductData();
    fetchProductCategory();
  }, []);
  useEffect(() => {
    extractUniqueBrands();
  }, [data]);
  useEffect(() => {
    fetchProductData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const fetchProductData = async () => {
    await dispatch(getProducts());
  };
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      LoadMoreRepos();
    }
  };

  const LoadMoreRepos = () => {
    setDisplayedProductCount((prevCount) => prevCount + 10);
  };
  const fetchProductCategory = async () => {
    await dispatch(getProductCategory());
  };
  const exchangeRate = 83;

  // console.log(data);
  const category = useSelector((state) => state.ProductReducer.ProductCategory);
  // console.log(category);
  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle("Add Product");
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "-", ".", "+"].includes(e.key) && e.preventDefault();
  const handleSubmit = async (value) => {
    var form_data = new FormData();
    delete value.image;

    if (previewMediaData !== "") {
      form_data.append("image", previewMediaData);
    }

    for (var key in value) {
      form_data.append(key, value[key]);
    }
    for (const pair of form_data.entries()) {
      console.log("pair : ", pair);
    }
    if (selectedId == "") {
      const add = await dispatch(addProductData(form_data));
      if (add) {
        message.success("Product Added Successfully");
        setSelectedId("");
        setIsModalOpen(false);
        return;
      } else {
        message.error("invalid");
        return;
      }
    } else {
      const update = await dispatch(editProductData(form_data, selectedId));
      if (update) {
        message.success("Product Edit Successfully");
        setIsModalOpen(false);
        setSelectedId("");
        form.resetFields();
        return;
      } else {
        message.error("invalid");
        return;
      }
    }
  };
  const editProduct = (value) => {
    setIsModalOpen(true);
    setModalTitle("Edit Product");
    console.log("values :", value);

    form.setFieldsValue({
      title: value.title,
      price: value.price,
      discountPrice: value.discountPercentage,
    });
    setSelectedId(value.id);
  };
  const deleteProduct = (value) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Product?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteProductFinal(value);
      },
    });
  };

  const deleteProductFinal = async (value) => {
    const del = await dispatch(deleteDepartmentData(value.id));
    if (del) {
      message.success("Deleted Successfully");
      return;
    } else {
      message.error("invalid");
      return;
    }
  };

  const extractUniqueBrands = () => {
    const uniqueBrandsSet = new Set();

    data?.forEach((product) => {
      uniqueBrandsSet.add(product.brand);
    });

    setUniqueBrands(Array.from(uniqueBrandsSet));
  };

  const filteredProducts = data?.filter((product) => {
    const originalPriceInRupees = product.price * exchangeRate;
    const priceInRupees = originalPriceInRupees;
    const priceFilter =
      !selectedPrice ||
      (selectedPrice.includes("-")
        ? priceInRupees >= parseFloat(selectedPrice.split("-")[0]) &&
          priceInRupees <= parseFloat(selectedPrice.split("-")[1])
        : (selectedPrice === "0" && priceInRupees === 0) ||
          priceInRupees >= parseFloat(selectedPrice));

    const brandFilter = !selectedBrand || product.brand === selectedBrand;
    const categoryFilter =
      !selectedCategory || product.category === selectedCategory;

    return priceFilter && brandFilter && categoryFilter;
  });
  const [viewMode, setViewMode] = useState("grid");

  const switchViewMode = (mode) => {
    setViewMode(mode);
  };
  const handleSortChange = (value) => {
    if (value) {
      const [criteria, order] = value.split("-");
      setSortCriteria(criteria);
      setSortOrder(order);
    } else {
      setSortCriteria("");
      setSortOrder("");
    }
  };

  const sortProducts = (products) => {
    if (!sortCriteria) {
      return products;
    }

    return products?.sort((a, b) => {
      const aValue = a[sortCriteria];
      const bValue = b[sortCriteria];

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    });
  };

  const sortedProducts = sortProducts(filteredProducts);
  // console.log(uniqueBrands);
  const handleSearch = async (query) => {
    await dispatch(searchProducts(query));
  };
  return (
    <>
      <Navbar />
      <div className="category_div">
        <Row justify="center">
          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="category">Category</div>
            <Select
              mode="single"
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "90%" }}
              onChange={(value) => setSelectedCategory(value)}
            >
              {category && category.length > 0
                ? category.map((categoryItem, index) => (
                    <Select.Option key={index} value={categoryItem}>
                      {categoryItem}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="brand">Brand</div>
            <Select
              mode="single"
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "90%" }}
              onChange={(value) => setSelectedBrand(value)}
            >
              {uniqueBrands && uniqueBrands.length > 0
                ? uniqueBrands.map((categoryItem, index) => {
                    {
                      /* console.log(categoryItem); */
                    }
                    return (
                      <Select.Option key={index} value={categoryItem}>
                        {categoryItem}
                      </Select.Option>
                    );
                  })
                : null}
            </Select>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <div className="brand">Price Range</div>
            <Select
              mode="single"
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "90%" }}
              onChange={(value) => setSelectedPrice(value)}
            >
              <Select.Option key="0-15000" value="0-15000">
                ₹0 - ₹15,000
              </Select.Option>
              <Select.Option key="15000-75000" value="15000-75000">
                ₹15,000 - ₹75,000
              </Select.Option>
              <Select.Option key="75000-200000" value="75000-200000">
                ₹75,000 - ₹2,00,000
              </Select.Option>
              <Select.Option key="200000+" value="200000+">
                ₹2,00,000+
              </Select.Option>
            </Select>
          </Col>
          {getItems.Email == "admin@gmail.com" ? (
            <Col lg={6} md={12} sm={24} xs={24}>
              {" "}
              <div className="add_btn">
                <Button
                  key="1"
                  className="custom_btn"
                  size="large"
                  onClick={showModal}
                >
                  <PlusOutlined /> Add Product
                </Button>
              </div>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>

      <div>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={form.submit}
          closable={true}
          okText={"Submit"}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            labelCol={{ span: 9 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            {/* <Form.Item
              label="Upload Image"
              name="image"
              rules={[{ required: true, message: "Please Upload Image " }]}
            >
              <Input
                size="large"
                type="file"
                placeholder="Choose image"
                title=""
                accept="image/*"
                onChange={changeHandler}
              />
              {previewMedia}
            </Form.Item> */}

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please Enter Title  " }]}
            >
              <Input size="large" placeholder="Enter Title  " />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please Enter Price  " }]}
            >
              <Input
                size="large"
                type="tel"
                onKeyDown={blockInvalidChar}
                placeholder="Enter Price  "
              />
            </Form.Item>

            <Form.Item
              label="DiscountPrice"
              name="discountPrice"
              value={value}
              rules={[
                { required: true, message: "Please Enter DiscountPrice  " },
              ]}
            >
              <Input
                size="large"
                type="tel"
                onKeyDown={blockInvalidChar}
                placeholder="Enter DiscountPrice  "
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="view-switch">
        <Tooltip title="Grid View">
          <AppstoreOutlined
            className={`view-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => switchViewMode("grid")}
          />
        </Tooltip>
        <Tooltip title="List View">
          <UnorderedListOutlined
            className={`view-icon1 ${viewMode === "list" ? "active" : ""}`}
            onClick={() => switchViewMode("list")}
          />
        </Tooltip>
        <div className="sort">
          <Select
            defaultValue="title-asc"
            style={{ width: "100%" }}
            onChange={handleSortChange}
            allowClear
          >
            <Select.Option value="title-asc">Sort by Title (A-Z)</Select.Option>
            <Select.Option value="title-desc">
              Sort by Title (Z-A)
            </Select.Option>
            <Select.Option value="price-asc">
              Sort by Price (Low to High)
            </Select.Option>
            <Select.Option value="price-desc">
              Sort by Price (High to Low)
            </Select.Option>
          </Select>
        </div>
        <div className="search_product">
          <Search
            placeholder="Search products..."
            onSearch={handleSearch}
            allowClear
            style={{
              width: 200,
            }}
          />
        </div>
      </div>

      <div className={`product_container ${viewMode}`}>
        <Row
          justify={viewMode === "grid" ? "center" : "start"}
          gutter={[24, 24]}
        >
          {sortedProducts && sortedProducts.length > 0
            ? sortedProducts.slice(0, displayedProductCount).map((product) => {
                const originalPriceInRupees = product.price * exchangeRate;
                const discountedPrice =
                  originalPriceInRupees -
                  (originalPriceInRupees * product.discountPercentage) / 100;
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

                const starRating = generateStars(product.rating);
                return (
                  <Fragment key={product.id}>
                    {viewMode == "grid" ? (
                      <Col lg={6} md={12} sm={24} xs={24}>
                        <Card
                          hoverable
                          className="card"
                          cover={
                            <img
                              alt={product.title}
                              src={product.images[0]}
                              className="card_img"
                            />
                          }
                          onClick={() => {
                            navigate("/productdetail", {
                              state: {
                                id: product.id,
                              },
                            });
                          }}
                        >
                          {getItems.Email == "admin@gmail.com" ? (
                            <Tooltip
                              placement="Bottom"
                              className="edit-tooltip"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Popover
                                placement="leftTop"
                                trigger="click"
                                content={
                                  <>
                                    <div className="icon_container">
                                      <div
                                        className="align-center-v edit "
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          editProduct(product);
                                        }}
                                      >
                                        <FeatherIcon
                                          className="feather_icon mr-10"
                                          icon="edit-3"
                                          width="17"
                                        />
                                        <div>Edit</div>
                                      </div>

                                      <div
                                        className="align-center-v delete mt-10"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteProduct(product);
                                        }}
                                      >
                                        <FeatherIcon
                                          className="feather_icon mr-10"
                                          icon="trash-2"
                                          width="17"
                                        />
                                        <div>Delete</div>
                                      </div>
                                    </div>
                                  </>
                                }
                              >
                                <FeatherIcon
                                  icon="more-vertical"
                                  className="feather_icon"
                                  onClick={() => setVisible()}
                                />
                              </Popover>
                            </Tooltip>
                          ) : (
                            ""
                          )}

                          <h3 className="card-title">{product.title}</h3>
                          <section className="card-reviews">
                            {starRating}{" "}
                            <span className="total-reviews">
                              ({product.rating})
                            </span>
                          </section>
                          <section className="card-price">
                            <div className="price">
                              <del>
                                &#x20B9;
                                {Math.round(originalPriceInRupees.toFixed(2))}
                              </del>{" "}
                              {Math.round(discountedPrice.toFixed(2))}
                            </div>
                          </section>
                        </Card>
                      </Col>
                    ) : (
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <Card
                          hoverable
                          className="card1"
                          cover={
                            <img
                              alt={product.title}
                              src={product.images[0]}
                              className="card_img"
                            />
                          }
                          onClick={() => {
                            navigate("/productdetail", {
                              state: {
                                id: product.id,
                              },
                            });
                          }}
                        >
                          {getItems.Email == "admin@gmail.com" ? (
                            <Tooltip
                              placement="Bottom"
                              className="edit-tooltip"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Popover
                                placement="leftTop"
                                trigger="click"
                                content={
                                  <>
                                    <div className="icon_container">
                                      <div
                                        className="align-center-v edit "
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          editProduct(product);
                                        }}
                                      >
                                        <FeatherIcon
                                          className="feather_icon mr-10"
                                          icon="edit-3"
                                          width="17"
                                        />
                                        <div>Edit</div>
                                      </div>

                                      <div
                                        className="align-center-v delete mt-10"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteProduct(product);
                                        }}
                                      >
                                        <FeatherIcon
                                          className="feather_icon mr-10"
                                          icon="trash-2"
                                          width="17"
                                        />
                                        <div>Delete</div>
                                      </div>
                                    </div>
                                  </>
                                }
                              >
                                <FeatherIcon
                                  icon="more-vertical"
                                  className="feather_icon"
                                  onClick={() => setVisible()}
                                />
                              </Popover>
                            </Tooltip>
                          ) : (
                            ""
                          )}

                          <h3 className="card-title">{product.title}</h3>
                          <section className="card-reviews">
                            {starRating}{" "}
                            <span className="total-reviews">
                              ({product.rating})
                            </span>
                          </section>
                          <section className="card-price">
                            <div className="price">
                              <del>
                                &#x20B9;
                                {Math.round(originalPriceInRupees.toFixed(2))}
                              </del>{" "}
                              {Math.round(discountedPrice.toFixed(2))}
                            </div>
                          </section>
                        </Card>
                      </Col>
                    )}
                  </Fragment>
                );
              })
            : "No Data "}
        </Row>
      </div>

      <Footer />
    </>
  );
};

export default Product;
