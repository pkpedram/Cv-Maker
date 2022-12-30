import _dataManager from "../dataManager"

const settingActions = {
    // GET LIST
    getShippingPrice: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/shippingprice', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getInventoryPrice: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/inventoryPrice', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getCharities: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/charity', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },
    getConsultantPlans:  (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('cms/consultantPlan', data, {dispatch, params: {...params, pageIndex: 0, pageSize: 1000}})
    },

    // GET BY ID

    getShippingPriceInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/shippingprice/${id}`, id, {dispatch})
    },
    getInventoryPriceInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/inventoryPrice/${id}`, id, {dispatch})
    },
    getCharityInfo: (id = null) => async dispatch => {
        await _dataManager.get(`cms/charity/${id}`, id, {dispatch})
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
    postCharity: (data = {}, id = null) => async dispatch => {
        if(id) {
            await _dataManager.put(`cms/charity/${id}`, data, {}, {}, true)
        }else{
            await _dataManager.post('cms/charity', data, {}, {}, true)
        }
    },
    postConsultantPlans: (data = {}, id = null) => async dispatch => {
        if(id) {
            await _dataManager.put(`cms/consultantPlan/${id}`, data, {}, {}, true)
        }else{
            await _dataManager.post('cms/consultantPlan', data, {}, {}, true)
        }
    },
    // DELETES
    deleteShippingPrice: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/shippingprice/${data}`,  {}, {}, {}, true)
    },
    deleteInventoryPrice: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/inventoryPrice/${data}`,  {}, {}, {}, true)
    },
    deleteCharity: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/charity/${data}`,  {}, {}, {}, true)
    },
    deleteConsultantPlans: (data = {}) => async dispatch => {
        await _dataManager.delete(`cms/consultantPlan/${data}`,  {}, {}, {}, true)
    },
}
export default settingActions