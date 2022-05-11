import axios from "axios";
import * as actionTypes from "./actionTypes";
import { searchURL } from "../../constants";
export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_START
    };
};

export const searchSuccess = dataSearch => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        dataSearch: dataSearch
    };
};

export const searchFail = error => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error: error
    };
};

export const handleSearchData = (searchKey) => {
    return dispatch => {
        dispatch(searchStart());
        axios
            .get(searchURL(searchKey))
            .then(res => {
                const dataSearch = res.data;
                dispatch(searchSuccess(dataSearch));
            })
            .catch(err => {
                dispatch(searchFail(err));
            });
    };
};