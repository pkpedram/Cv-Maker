
import { toast } from "react-toastify";
import { ApiConfig } from "../constants";
import _dataManager from "../dataManager";
import axios from "axios";
const userActions = {
    requestLoginCode: (data) => async (dispatch) => {
        try {
            dispatch({type: "LOADING_START"})
          let res = await axios.post(ApiConfig.authUrl + "/auth/signin", data);
          if (res.data) {
            dispatch({type: "LOADING_END"})
            dispatch({ type: "/auth/signin", payload: res.data });
            toast.success( "کد ارسال شد" + res.data.split("login code sent")[1])    
          }
        } catch (error) {
            dispatch({type: "LOADING_START"})
        toast.error('مشکلی پیش آمده است')
        }
      },
    login: (data) => async (dispatch) => {
        try {
            dispatch({type: "LOADING_START"})
          let res = await axios.post(
            ApiConfig.authUrl + "/auth/signin/verify",
            data
          );
          if (res.data) {
            dispatch({type: "LOADING_END"})
            dispatch({ type: "/auth/signinsteptwo", payload: res.data });
            localStorage.setItem("access", res.data.accessToken.token);
            localStorage.setItem("refresh", res.data.refreshToken.token);
            toast.success('شما با موفقیت وارد شدید')
            dispatch({ type: "CLOSE_MODAL", payload: "login" });
            window.location.reload()
          }
        } catch (error) {
            dispatch({type: "LOADING_END"})
            toast.error('مشکلی پیش آمده است')
        }
      },
      loadUserData: () => async (dispatch) => {
        const access = localStorage.getItem("access");
    
        if (access) {
          dispatch({ type: "USER_IS_LOGIN", payload: { isLogin: true } });
        }
      },
      logOut: () => async (dispatch) => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = '/'
      },
      getUserData:
        (data = {}, params = {}) =>
        async (dispatch) => {
          await _dataManager.get("security/users/authenticated", data, {
            dispatch,
            params,
          });
        },
}
export default userActions;