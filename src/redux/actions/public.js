import { publicData } from "../../data/public";
import _dataManager from "../dataManager";

const publicApi = {
  checkLayoutVersion: () => async (dispatch) => {
    if (window.innerWidth <= 900) {
      dispatch({ type: "SET_MOBILE", payload: true });
    } else {
      dispatch({ type: "SET_MOBILE", payload: false });
    }
    window.addEventListener(
      "resize",
      function() {
        if (window.innerWidth <= 900) {
          dispatch({ type: "SET_MOBILE", payload: true });
        } else {
          dispatch({ type: "SET_MOBILE", payload: false });
        }
      },
      true
    );
  },
  getMenuItems: (data = {}) => async (dispatch) => {
    dispatch({ type: "GET_MENU_ITEM", payload: data });
  },
  getOverAllData: (data = {}) => async (dispatch) => {
    dispatch({ type: "GET_OVER_ALL_DATA", payload: publicData });
  },
  getStates: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("basicdata/state", data, {
      dispatch,
      params: params,
    });
  },
  getCities: (data = {}) => async (dispatch) => {
    await _dataManager.get("basicdata/city", data, { dispatch });
  },

  // GET BY IDS

  getStateInfo: (id = null) => async dispatch => {
    await _dataManager.get(`basicdata/state/${id}`, id, {dispatch});
  },
  getCityInfo:  (id = null) => async dispatch => {
    await _dataManager.get(`basicdata/city/${id}`, id, {dispatch});
  },

  // POST AND PUTS

  postStates: (data = {}, id = null) => async (dispatch) => {
    if(id){
      await _dataManager.put(`basicdata/state/${id}`, data, {}, {}, true);
    }else{
      await _dataManager.post("basicdata/state", data, {}, {}, true);
    }
  },
  postCities: (data = {}, id = null) => async (dispatch) => {
    if(id){
      await _dataManager.put(`basicdata/city/${id}`, data, {}, {}, true);
    }else{
      await _dataManager.post("basicdata/city", data, {}, {}, true);
    }
  },

  // DELETES

  deleteState: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`basicdata/state/${data}`, {}, {}, {}, true);
  },
  deleteCity: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`basicdata/city/${data}`, {}, {}, {}, true);
  },
};

export default publicApi;
