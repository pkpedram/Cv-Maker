import { ApiConfig } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
let { baseUrl } = ApiConfig;
baseUrl = baseUrl + "/";


const Axios = axios.create({
  // withCredentials: true,
  // validateStatus: null,
  // rejectUnauthorized: false,
  baseURL: baseUrl,
  // headers: access ? { Authorization: `Bearer ${access}` } : {},
});
class DataManager {
  
  get = async (url, params, opt, data, reload) => 
    
    await this.check(
      url,
      opt,
      async () => await Axios.get(url, { params, ...opt, headers: localStorage.getItem('access') && {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload,
      {}
    );

  patch =  async (url, params, opt, data, reload, notifTexts) =>
  await this.check(
    url,
    opt,
    async () => await Axios.patch(url, params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} } ),
    data || params,
    reload,
    notifTexts
  );
  post = async (url, params, opt, data, reload, notifTexts ) =>
    await this.check(
      url,
      opt,
      async () => await Axios.post(url,  params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload,
      notifTexts
    );
  put = async (url , params , opt , data, reload, notifTexts) =>
    await this.check(
      url,
      opt,
      async () => await Axios.put(url,  params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload,
      notifTexts
    );
  delete = async (url , params , opt , data, reload, notifTexts) => {
    await this.check(
      url,
      opt,
      async () => await Axios.delete(url, { ...opt, data: params, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload,
      notifTexts
    );
  };

  check = async (url , { dispatch } , fetch , params, reload, notifTexts  = {
    success: 'عملیات با موفقیت انجام شد',
    error: 'خطایی رخ داده است'
  }) => {
    dispatch = dispatch || (() => {});
    dispatch({ type: 'LOADING_START' });
   

    try {
      let response = await fetch();

      if(response.data){
        dispatch({ type: url, payload: response.data, params });
            dispatch({ type: 'LOADING_END' });
            if(notifTexts?.success){
              toast.success(notifTexts.success)
            }
            console.log('STATUS 200 RES:', response)
            if(typeof reload == 'string'){
              window.location.href = reload
            }
            if(typeof reload == 'boolean'){
              window.location.reload()
            }
            // return response.data;
      }else{
        // toast.error('خطا')
      }
    } catch (error) {
             dispatch({ type: 'LOADING_END' });
                
                  if(error?.response?.status == 400){

                    let keys = Object.keys(error?.response?.data)

                    keys.map(item => toast.error(`${item}: ${error?.response?.data[item]}`))
                    return null
                  
                  }
                  if(error?.response?.status == 401){
                    try {
                      let response = await fetch();
                
                      if(response.data){
                        dispatch({ type: url, payload: response.data, params });
                            dispatch({ type: 'LOADING_END' });
                            if(notifTexts?.success){
                              toast.success(notifTexts.success)
                            }
                            console.log('STATUS 200 RES:', response)
                            if(typeof reload == 'string'){
                              window.location.href = reload
                            }
                            if(typeof reload == 'boolean'){
                              window.location.reload()
                            }
                            // return response.data;
                      }else{
                        // toast.error('خطا')
                      }
                    } catch (error) {
                             dispatch({ type: 'LOADING_END' });
                                
                                  if(error?.response?.status == 400){
                
                                    let keys = Object.keys(error?.response?.data)
                
                                    keys.map(item => toast.error(`${item}: ${error?.response?.data[item]}`))
                                    return null
                                  
                                  }
                                  if(error?.response?.status == 401){
                                      localStorage.removeItem('access')
                                      localStorage.removeItem('refresh')
                                      window.location.reload()
                                  }
                
                                  if(error?.response?.data?.detail){
                                    toast.error(error?.response.data?.detail)
                                    return null
                                  }
                
                                  toast.error('خطایی رخ داده است')
                                  console.log(error?.response?.data)
                                  dispatch({
                                    type: url.split("/")[0] + "/" + "error",
                                    data: error.response.data,
                                    params,
                                  });
                              }
                  }

                  if(error?.response?.data?.detail){
                    toast.error(error?.response.data?.detail)
                    return null
                  }

                  toast.error('خطایی رخ داده است')
                  console.log(error?.response?.data)
                  dispatch({
                    type: url.split("/")[0] + "/" + "error",
                    data: error.response.data,
                    params,
                  });
              }

  };

  refresh = async () => {
    let refresh = localStorage.getItem("refresh");
    if (!refresh) window.location.href = "/";
    let login = await this.login(
      "token/verify",
      {},
      { headers: { Authorization: `Bearer ${refresh}` } }
    );
    return login ? true : false;
  };
  login = async (url , params , { dispatch } ) =>
    this.post(url, params, {
      dispatch: (obj ) => {
        let login = obj.payload;
        if (!login || !login.refresh){
          console.log('login',login)
          return false
        };
        localStorage.setItem("refresh", login.refresh);
        localStorage.setItem("access", login.access);
        delete login.refresh;
        delete login.access;
        localStorage.setItem("USER_DATA", JSON.stringify(login.profile));
        dispatch(obj);
      },
    });

  logout = async (url , params , { dispatch } ) => {
    this.post(url, params, {
      dispatch: (obj ) => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        localStorage.removeItem("USER_DATA");
        dispatch(obj);
      },
    });
  };
  status = () => {
    let refresh = localStorage.getItem("refresh");
    let userData = localStorage.getItem("USER_DATA");
    if (!refresh) return false;
    if (refresh == "undefined") {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("USER_DATA");
      return false;
    }

    return JSON.parse(userData || '');
  };
}
const _dataManager = new DataManager();

export default _dataManager;