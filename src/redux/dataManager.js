import { ApiConfig } from "./constants";
import axios from "axios";
let { baseUrl } = ApiConfig;
baseUrl = baseUrl + "/";


const Axios = axios.create({
  // withCredentials: true,
  validateStatus: null,
  // rejectUnauthorized: false,
  baseURL: baseUrl,
  // headers: access ? { Authorization: `Bearer ${access}` } : {},
});
class DataManager {
  
  get = async (url, params, opt, data, reload) => 
    
    await this.check(
      url,
      opt,
      async () => await Axios.get(url, { params, ...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload
    );

  patch =  async (url, params, opt, data, reload ) =>
  await this.check(
    url,
    opt,
    async () => await Axios.patch(url, params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} } ),
    data || params,
    reload
  );
  post = async (url, params, opt, data, reload ) =>
    await this.check(
      url,
      opt,
      async () => await Axios.post(url,  params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload
    );
  put = async (url , params , opt , data, reload ) =>
    await this.check(
      url,
      opt,
      async () => await Axios.put(url,  params, {...opt, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload
    );
  delete = async (url , params , opt , data, reload ) => {
    await this.check(
      url,
      opt,
      async () => await Axios.delete(url, { ...opt, data: params, headers: {Authorization: `Bearer ${localStorage.getItem('access')}`} }),
      data || params,
      reload
    );
  };

  check = async (url , { dispatch } , fetch , params, reload ) => {
    dispatch = dispatch || (() => {});
    dispatch({ type: 'LOADING_START' });
    let response = await fetch();
    
    switch (response.status) {
      case 200:
        dispatch({ type: url, payload: response.data, params });
        dispatch({ type: 'LOADING_END' });
        console.log('STATUS 200 RES:', response)
        if(reload){
          window.location.reload()
        }
        return response.data;

      case 201:   
      dispatch({ type: url, payload: response.data, params });
      dispatch({ type: 'LOADING_END' });
        console.log('STATUS 201 RES:', response)
        if(reload){
          window.location.reload()
        }
        return response.data;
      case 401:
        // if (await this.refresh()) {
        //   let response = await fetch();
        //   dispatch({ type: url, payload: response.data, params });
        //   return response.data;
        // }
        console.error('status 401', response)
        try {
          let refresh = localStorage.getItem('refresh');
          let access = localStorage.getItem('access')
          let res = await axios.post(ApiConfig.authUrl + '/auth/refresh/', {
            accessToken: access,
            refreshToken: refresh
          })
          if(res){
            localStorage.setItem('access', res.data.accessToken.token);
            localStorage.setItem('refresh', res.data.refreshToken.token);
            setTimeout(async () => {let response = await fetch(); dispatch({type:'LOADING_END'}
            
            )
          
            switch (response.status) {
              case 200:
                dispatch({ type: url, payload: response.data, params });
                dispatch({ type: 'LOADING_END' });
                console.log('STATUS 200 RES:', response)
                if(reload){
                  window.location.reload()
                }
                return response.data;
                
        
              case 201:   
              dispatch({ type: url, payload: response.data, params });
              dispatch({ type: 'LOADING_END' });
                console.log('STATUS 201 RES:', response)
                if(reload){
                  window.location.reload()
                }
                return response.data;
              case 401:
                // if (await this.refresh()) {
                //   let response = await fetch();
                //   dispatch({ type: url, payload: response.data, params });
                //   return response.data;
                // }
                console.error('status 401', response)
                try {
                  let refresh = localStorage.getItem('refresh');
                  let resp = await axios.post(ApiConfig.authUrl + '/auth/refresh/', {
                    accessToken: access,
                    refreshToken: refresh
                  })
                  if(resp.data){
                    localStorage.setItem('access', resp.data.accessToken.token);
            localStorage.setItem('refresh', resp.data.refreshToken.token);
                    setTimeout(async () => { await fetch(); dispatch({type:'LOADING_END'}
                    
                    )}, 1000)
                    
                  }
                } catch (error) {
                  localStorage.removeItem('access')
                  localStorage.removeItem('refresh')
                  console.error(error)
                }
                
                break;
              default:
                dispatch({ type: 'LOADING_END' });
                // toast.error('خطا')
                dispatch({
                  type: url.split("/")[0] + "/" + "error",
                  data: response.data,
                  params,
                });
            }}, 1000)
            
          }
        } catch (error) {
          console.log(error.response.status)
          if(error.response.status == 401){

            let access = localStorage.getItem('access')
            try {
              let refresh = localStorage.getItem('refresh');
              let resp = await axios.post(ApiConfig.authUrl + '/auth/refresh/', {
                accessToken: access,
                refreshToken: refresh
              })
              if(resp.data){
                localStorage.setItem('access', resp.data.accessToken.token);
        localStorage.setItem('refresh', resp.data.refreshToken.token);
                setTimeout(async () => { await fetch(); dispatch({type:'LOADING_END'}
                
                )}, 1000)
                
              }
            } catch (error) {
              localStorage.removeItem('access')
              localStorage.removeItem('refresh')
              window.location.href = '/'
              console.error(error)
            }
            window.location.href = '/'
          }
          window.location.href = '/'
        }
        
        break;
      default:
        dispatch({ type: 'LOADING_END' });
        // toast.error('خطا')
        dispatch({
          type: url.split("/")[0] + "/" + "error",
          data: response.data,
          params,
        });
        if(reload){
          window.location.reload()
        }
    }
    
    return false;
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