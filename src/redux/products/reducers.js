import actions from "./actions";

const {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTCATEGORY,
  GET_PROFILE_BY_ID,
  SEARCH_PRODUCTS
} = actions;

const initState = {
  product: {},
  addProduct: {},
  editProduct: {},
  deleteProduct: {},
  ProductCategory: {},
  profileId: {},
};

const ProductReducer = (state = initState, action) => {
  const { type, data } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        product: data,
      };
      case SEARCH_PRODUCTS:
        return {
          ...state,
          product: data,
        };
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: data,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        editProduct: data,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: data,
      };
    case GET_PRODUCTCATEGORY:
      return {
        ...state,
        ProductCategory: data,
      };
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profileId: data,
      };

    default:
      return state;
  }
};

export default ProductReducer;
