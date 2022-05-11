import * as actionTypes from "./actionTypes";
import {authAxios} from "../../utils"
import {orderSummaryURL} from "../../apiURL"
import axios from 'axios'

export const cartStart = () => {
  return {
    type: actionTypes.CART_START
  };
};

export const cartSuccess = data => {
  return {
    type: actionTypes.CART_SUCCESS,
    data
  };
};

export const cartFail = error => {
  return {
    type: actionTypes.CART_FAIL,
    error: error
  };
};

export const fetchCart = () => {
    return dispatch => {
      dispatch(cartStart());
      axios
        .get(orderSummaryURL)
        .then(res => {
          dispatch(cartSuccess(res.data));
        })
        .catch(err => {
          dispatch(cartFail(err));
        });
    };
  };