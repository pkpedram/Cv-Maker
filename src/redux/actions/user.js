
import { toast } from "react-toastify";
import { ApiConfig } from "../constants";
import _dataManager from "../dataManager";
import axios from "axios";
const userActions = {
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

}
export default userActions;