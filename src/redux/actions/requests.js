import axios from "axios"
import { toast } from "react-toastify"
import { ApiConfig } from "../constants"
import _dataManager from "../dataManager"

const requestsActions = {
    // GET LIST
    getShippingPrice: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/shippingprice', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getInventoryPrice: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/inventoryPrice', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getSellerDemand: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/sellerDemand', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getAccountingRequests: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/accountingReport', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getCooperationList: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/cooperationRequestItem', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },


    // GET BY ID

    getShippingPriceInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/shippingprice/${id}`, id, {dispatch})
    },
    getInventoryPriceInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/inventoryPrice/${id}`, id, {dispatch})
    },
    getSellerDemandInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/sellerDemand/${id}`, id, {dispatch})
    },
    getAccountingRequestInfo:(id = null) => async dispatch => {
        await _dataManager.get(`cms/accountingReport/${id}`, id, {dispatch})
    },
    getCooperationInfo:(id = null) => async dispatch => {
        await _dataManager.get(`cms/cooperationRequestItem/${id}`, id, {dispatch})
    },



    // POSTS AND PUTS

    postShippingPrice: (data = {}, id = null) => async dispatch => {
        if(id) {
            await _dataManager.put(`cms/shippingprice/${id}`, data, {}, {}, true)
        }else{
            await _dataManager.post('cms/shippingprice', data, {}, {}, true)
        }
    },
    postInventoryPrice: (data = {}, id = null) => async dispatch => {
        if(id) {
            await _dataManager.put(`cms/inventoryPrice/${id}`, data, {}, {}, true)
        }else{
            await _dataManager.post('cms/inventoryPrice', data, {}, {}, true)
        }
    },
    postSellerDemand: (data = {}, id = null) => async dispatch => {
        if(id) {
            await _dataManager.put(`cms/sellerDemand/${id}`, data, {}, {}, true)
        }else{
            await _dataManager.post('cms/sellerDemand', data, {}, {}, true)
        }
    },

    putAccountingReq:  (file = null, data = {}, id = null) => async dispatch => {
        try {
            let formData = new FormData();
            formData.append('FormFile', file)
            let res = await axios.post(ApiConfig.baseUrl + '/cms/customfile/file', formData, { headers: {Authorization: `Bearer ${localStorage.getItem('access')}`}  });

            if(res.data){
                await _dataManager.put(`cms/accountingReport/${id}`, {...data, customFileId: res.data.result}, {}, {})
                toast.success('با موفقیت انجام شد')
            }
        } catch (error) {
            console.error(error)
        }
    } ,

    // DELETES
    deleteShippingPrice: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/shippingprice/${data}`,  {}, {}, {}, true)
    },
    deleteInventoryPrice: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/inventoryPrice/${data}`,  {}, {}, {}, true)
    },
    deleteSellerDemand: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/sellerDemand/${data}`,  {}, {}, {}, true);
         window.location.pathname = '/sellerdemand'
    },
    deleteAccountingReq: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/accountingReport/${data}`,  {}, {}, {}, true)
    },
    deleteCooperationReq: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/cooperationRequestItem/${data}`,  {}, {}, {}, true)
    },
}
export default requestsActions;
