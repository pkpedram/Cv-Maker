import axios from "axios";
import { ApiConfig } from "../constants";
import _dataManager from "../dataManager";

const productActions = {
  // GET LISTS
  getCategories: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/productMainCategory", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getSubCategories: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/productSubCategory", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getProducts: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/product", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getInfo: (data = null) => async (dispatch) => {
    await _dataManager.get(`cms/product/${data}`, data, { dispatch });
  },
  getExperts: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/expert", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getCompanies: (data = {}, parmas = { pageIndex: 0, pageSize: 100 }) => async (
    dispatch
  ) => {
    await _dataManager.get("cms/productCompany", data, {
      dispatch,
      params: parmas,
    });
  },
  getTypes: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/productType", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getPriceHistory: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/productpricehistory", data, {
      dispatch,
      params: params,
    });
  },
  getAttributes: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/productAttribute", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 1000 },
    });
  },
  getBussinessMans: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/businessman", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 1000 },
    });
  },
  getPayConditions: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/payCondition", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 1000 },
    });
  },

  //GET BY IDS
  getCompanyInfo: (id = {}) => async (dispatch) => {
    await _dataManager.get(`cms/productCompany/${id}`, id, { dispatch });
  },
  getMainCategoryInfo: (id = {}) => async (dispatch) => {
    await _dataManager.get(`cms/productMainCategory/${id}`, id, { dispatch });
  },
  getSubCategoryInfo: (id = {}) => async (dispatch) => {
    await _dataManager.get(`cms/productSubCategory/${id}`, id, { dispatch });
  },
  getTypeInfo: (id = {}) => async (dispatch) => {
    await _dataManager.get(`cms/productType/${id}`, id, { dispatch });
  },
  getExpertInfo: (id = null) => async (dispatch) => {
    await _dataManager.get(`cms/expert/${id}`, id, { dispatch });
  },
  getbusinessmanInfo: (id = null) => async (dispatch) => {
    await _dataManager.get(`cms/businessman/${id}`, id, { dispatch });
  },
  getProductInfo: (id = null) => async dispatch => {
    await _dataManager.get(`cms/product/${id}`, id, {dispatch})
  },
  getPayConditionInfo: (id = null) => async dispatch =>{
    await _dataManager.get(`cms/payCondition/${id}`, id, {dispatch})
  },
  // POSTS
  postProduct: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/product/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/product", data, {}, {}, true);
    }
  },
  postMainCategories: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(
        `cms/productMainCategory/${id}`,
        data,
        {},
        {},
        true
      );
    } else {
      await _dataManager.post("cms/productMainCategory", data, {}, {}, true);
    }
  },
  postCompanies: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/productCompany/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/productCompany", data, {}, {}, true);
    }
  },
  postSubCategories: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(
        `cms/productSubCategory/${id}`,
        data,
        {},
        {},
        true
      );
    } else {
      await _dataManager.post("cms/productSubCategory", data, {}, {}, true);
    }
  },
  postTypes: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/productType/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/productType", data, {}, {}, true);
    }
  },
  postBussinessMans: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/businessman/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/businessman", data, {}, {}, true);
    }
  },
  postExperts: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/expert/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/expert", data, {}, {}, true);
    }
  },
  postPayCondition:  (data = {}, id = null) => async dispatch => {
    if(id) {
        await _dataManager.put(`cms/payCondition/${id}`, data, {}, {}, true)
    }else{
        await _dataManager.post('cms/payCondition', data, {}, {}, true)
    }
},

  //DELETES
  deleteCompanies: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/productCompany/${data}`, {}, {}, {}, true);
  },
  deleteBussinessMans: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/businessman/${data}`, {}, {}, {}, true);
  },
  deleteExperts: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/expert/${data}`, {}, {}, {}, true);
  },
  deleteProductTypes: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/productType/${data}`, {}, {}, {}, true);
  },
  deleteCategories: (data = {}) => async (dispatch) => {
    await _dataManager.delete(
      `cms/productMainCategory/${data}`,
      {},
      {},
      {},
      true
    );
  },
  deleteSubCategories: (data = {}) => async (dispatch) => {
    await _dataManager.delete(
      `cms/productSubCategory/${data}`,
      {},
      {},
      {},
      true
    );
  },
  deleteProduct: (data = {}) => async (dispatch) => {
    await _dataManager.delete(
      `cms/product/${data}`,
      {},
      {},
      {},
      true
    );
  },
  deletePayCondition:   (data = {}) => async dispatch => {
    await _dataManager.delete(`cms/payCondition/${data}`,  {}, {}, {}, true)
},
};
export default productActions;


   



