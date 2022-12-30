import _dataManager from "../dataManager";
import axios from "axios";
import { ApiConfig } from "../constants";
const userControlActions = {
  getUserList:
    (data = {}, params = {}) =>
    async (dispatch) => {
      await _dataManager.get("security/user", data, {
        dispatch,
        params: { ...params, pageIndex: 0, pageSize: 100 },
      });
    },

  getUserInfo:
    (id = null) =>
    async (dispatch) => {
      await _dataManager.get(`security/user/${id}`, id, { dispatch });
    },

  postUser:
    (data = {}, id = null) =>
    async (dispatch) => {
      if (id) {
        await _dataManager.put(`security/user/${id}`, data, {});
      } else {
        let res = await axios.post(ApiConfig.authUrl + "/auth/signup", data);
        if (res.data) {
          window.location.href = "/";
        }
      }
    },
};
export default userControlActions;
