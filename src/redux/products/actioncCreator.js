import actions from "./actions";
import { DataService } from "../../config/dataservice/Dataservice";
import { API } from "../../config/api";
import { message } from "antd";

const {
  getProductData,
  addProduct,
  editProduct,
  deleteProduct,
  getProductCategoryData,
  getProfileById,
} = actions;
export const getProducts = () => {
  return async (dispatch) => {
    const resp = await DataService.get(`${API.products.get}?limit=100`);
    // console.log('resp profile: ', resp)
    if (!resp.data.error) {
      dispatch(getProductData(resp.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
export const searchProducts = (query) => {
  return async (dispatch) => {
    const resp = await DataService.get(
      `${API.products.search}/search?q=${query}`
    );

    if (!resp.data.error) {
      dispatch(getProductData(resp.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
export const addProductData = (payload) => {
  // console.log(payload);
  return async (dispatch) => {
    const resp = await DataService.postFormData(API.products.add, payload);
    if (!resp.data.error) {
      dispatch(addProduct(resp.data.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
export const editProductData = (payload, id) => {
  // console.log("payload : ", id);
  return async (dispatch) => {
    const resp = await DataService.patch(
      API.products.update + "/" + id,
      payload
    );

    if (!resp.data.error) {
      dispatch(editProduct(resp.data.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

export const deleteDepartmentData = (id) => {
  return async (dispatch) => {
    const resp = await DataService.delete(API.products.delete + "/" + id);

    if (!resp.data.error) {
      dispatch(deleteProduct(resp.data.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
export const getProductCategory = () => {
  return async (dispatch) => {
    const resp = await DataService.get(API.products.getCategory);
    // console.log('resp profile: ', resp)
    if (!resp.data.error) {
      dispatch(getProductCategoryData(resp.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
export const getProfileByIdData = (id) => {
  return async (dispatch) => {
    const resp = await DataService.get(API.getProfile.getId + "/" + id);
    // console.log('getProfileByIdData : ', resp)

    if (!resp.data.error) {
      dispatch(getProfileById(resp.data));
      return true;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};
