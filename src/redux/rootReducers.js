import { combineReducers } from "redux";
import ProductReducer from "./products/reducers";

const rootReducers = combineReducers({
  ProductReducer,
});

export default rootReducers;
