const actions = {
  GET_PRODUCTS: "GET_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  GET_PRODUCTCATEGORY: "GET_PRODUCTCATEGORY",
  GET_PROFILE_BY_ID: "GET_PROFILE_BY_ID",
  SEARCH_PRODUCTS: "SEARCH_PRODUCTS", 

  getProductData: (data) => {
    return {
      type: actions.GET_PRODUCTS,
      data,
    };
  },
  addProduct: (data) => {
    return {
      type: actions.ADD_PRODUCT,
      data,
    };
  },
  editProduct: (data) => {
    return {
      type: actions.EDIT_PRODUCT,
      data,
    };
  },
  deleteProduct: (data) => {
    return {
      type: actions.DELETE_PRODUCT,
      data,
    };
  },
  getProductCategoryData: (data) => {
    return {
      type: actions.GET_PRODUCTCATEGORY,
      data,
    };
  },
  getProfileById: (data) => {
    return {
      type: actions.GET_PROFILE_BY_ID,
      data,
    };
  },
  searchProducts: (data) => {
    return {
      type: actions.SEARCH_PRODUCTS,
      data,
    };
  },
};

export default actions;
