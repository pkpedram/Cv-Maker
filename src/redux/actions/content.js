import axios from "axios";
import { toast } from "react-toastify";
import { ApiConfig } from "../constants";
import _dataManager from "../dataManager";

const contentActions = {
  getBlogList: (data = {}, params = {}) => async (dispatch) => {
    await _dataManager.get("cms/blogpost", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    });
  },
  getBlogCategories: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/blogcategory", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
  getBlogTypes: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/blogtype", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSliderItems: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/sliderItem", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getCooperationFormQuestions: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/cooperationQuestion", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getCooperationFormAnswers: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/cooperationAnswer", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSurveyQuestions: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/surveyQuestion", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSurveyAnswers: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/surveyAnswer", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSellerTestQuestions: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/sellerDemandTestQuestion", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSellerTestAnswers: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/sellerDemandTestQuestionAnswer", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getSellerNormalQuestions: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/sellerDemandDescriptiveQuestion", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getOurCustomers: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/ourcustomer", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getFaq: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/faq", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
    getNotice: (data = {}, params = {}) => async (dispatch) =>
    await _dataManager.get("cms/notice", data, {
      dispatch,
      params: { ...params, pageIndex: 0, pageSize: 100 },
    }),
  // GET INFO

  getBlogCategoryInfo: (id = null) => async (dispatch) => {
    await _dataManager.get(`cms/blogcategory/${id}`, id, { dispatch });
  },
  getBlogTypeInfo: (id = null) => async (dispatch) => {
    await _dataManager.get(`cms/blogtype/${id}`, id, { dispatch });
  },
  getBlogPostInfo: (id = null) => async (dispatch) => {
    await _dataManager.get(`cms/blogpost/${id}`, id, { dispatch });
  },

  // POSTS AND PUTS

  postBlogCategories: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/blogcategory/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/blogcategory", data, {}, {}, true);
    }
  },
  postBlogType: (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/blogtype/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/blogtype", data, {}, {}, true);
    }
  },
  postBlogPost: (img = null, data = {}, id = null) => async (dispatch) => {
    if (id) {
      try {
        let keys = Object.keys(data).filter((itm) => itm !== "last_login");
        let pictureId = keys.includes("PictureId");
        if (pictureId) {
          let formData = new FormData();
          keys.map((item, idx) => formData.append(keys[idx], data[keys[idx]]));
          const resp = await axios.put(
            ApiConfig.baseUrl + "/cms/blogpost/" + id,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          if (resp.data) {
            toast.success("پست با موفقیت تغییر پیدا کرد");
            window.location.pathname = "/blog";
          }
        } else {
          if (img) {
            const formData = new FormData();
            formData.append("FormFile", img);
            const res = await axios.post(
              ApiConfig.baseUrl + "/cms/customfile/image",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            );
            if (res.data) {
              let keys = Object.keys(data).filter(
                (itm) => itm !== "last_login"
              );
              let frmData = new FormData();

              keys.map((item, idx) =>
                frmData.append(keys[idx], data[keys[idx]])
              );
              frmData.append("PictureId", res.data.result);
              const resp = await axios.put(
                ApiConfig.baseUrl + "/cms/blogpost/" + id,
                frmData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                }
              );
              if (resp.data) {
                toast.success("با موفقیت افزوده شد");
                window.location.pathname = "/blog";
              }
            }
          } else {
            let keys = Object.keys(data).filter((itm) => itm !== "last_login");
            let frmData = new FormData();
            keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
            frmData.append("PictureId", null);
            const resp = await axios.put(
              ApiConfig.baseUrl + "/cms/blogpost/" + id,
              frmData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            );
            if (resp.data) {
              toast.success("با موفقیت افزوده شد");
              window.location.pathname = "/blog";
            }
          }
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.reload();
        } else if (error?.response?.status == 422) {
          console.log(error.response);
          let keys = Object.keys(error?.response?.data?.errors);
          console.log(keys);
          keys.map((itm) =>
            toast.error(`${itm} : ${error?.response?.data?.errors[itm]}`)
          );
        } else {
          toast.error("خطایی پیش آمده است");
        }
      }
    } else {
      try {
        if (img) {
          const formData = new FormData();
          formData.append("FormFile", img);
          const res = await axios.post(
            ApiConfig.baseUrl + "/cms/customfile/image",
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          if (res.data) {
            let keys = Object.keys(data).filter((itm) => itm !== "last_login");
            let frmData = new FormData();

            keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
            frmData.append("PictureId", res.data.result);
            const resp = await axios.post(
              ApiConfig.baseUrl + "/cms/blogpost",
              frmData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            );
            if (resp.data) {
              toast.success("با موفقیت افزوده شد");
              window.location.pathname = "/blog";
            }
          }
        } else {
          let keys = Object.keys(data).filter((itm) => itm !== "last_login");
          let frmData = new FormData();
          keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
          frmData.append("PictureId", null);
          const resp = await axios.post(
            ApiConfig.baseUrl + "/cms/blogpost",
            frmData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          if (resp.data) {
            toast.success("با موفقیت افزوده شد");
            window.location.pathname = "/blog";
          }
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.reload();
        } else if (error?.response?.status == 422) {
          console.log(error.response);
          let keys = Object.keys(error?.response?.data?.errors);
          console.log(keys);
          keys.map((itm) =>
            toast.error(`${itm} : ${error?.response?.data?.errors[itm]}`)
          );
        } else {
          toast.error("خطایی پیش آمده است");
        }
      }
    }
  },


  postSliderItem: (img = null, data = {}) => async dispatch => {
    try {
      let formData = new FormData();
      formData.append('FormFile', img)
      let res = await axios.post(ApiConfig.baseUrl + '/cms/customfile/image', formData,   {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })

      if(res.data){
        await _dataManager.post('cms/sliderItem', {...data, customFileId: res.data.result}, {}, {}, true)
      }
    } catch (error) {
      console.log(error)
      toast.error('خطایی پیش آمده است')
    }
  },
  postCooperationQuestion:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/cooperationQuestion/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/cooperationQuestion", data, {}, {}, true);
    }
  },
  postCooperationAnswer: (data = {}) => async dispatch => {
    await _dataManager.post("cms/cooperationAnswer", data, {}, {}, true)
  },
  postSurveyQuestion:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/surveyQuestion/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/surveyQuestion", data, {}, {}, true);
    }
  },
  postSurveyAnswer: (data = {}) => async dispatch => {
    await _dataManager.post("cms/surveyAnswer", data, {}, {}, true)
  },
  postSellerTestQuestion:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/sellerDemandTestQuestion/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/sellerDemandTestQuestion", data, {}, {}, true);
    }
  },
  postSellerTestAnswer: (data = {}) => async dispatch => {
    await _dataManager.post("cms/sellerDemandTestQuestionAnswer", data, {}, {}, true)
  },
  postSellerNormalQuestions:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/sellerDemandDescriptiveQuestion/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/sellerDemandDescriptiveQuestion", data, {}, {}, true);
    }
  },
  postFaq:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/faq/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/faq", data, {}, {}, true);
    }
  },
  postNotice:  (data = {}, id = null) => async (dispatch) => {
    if (id) {
      await _dataManager.put(`cms/notice/${id}`, data, {}, {}, true);
    } else {
      await _dataManager.post("cms/notice", data, {}, {}, true);
    }
  },


  postOurCustomer: (img = null, data = {}, id = null) => async dispatch =>{
    if(id){
      try {
        if(img !== null){
          let formData = new FormData();
        formData.append('FormFile', img)
        let res = await axios.post(ApiConfig.baseUrl + '/cms/customfile/image', formData,   {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
  
        if(res.data){
          let keys = Object.keys(data);
          let frmData = new FormData(); 
              keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
              frmData.append('PictureId', res.data.result)
          await _dataManager.put(`cms/ourcustomer/${id}`,frmData, {}, {}, true)
        }
        }else{
          let keys = Object.keys(data);
          let frmData = new FormData(); 
              keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
              
          await _dataManager.put(`cms/ourcustomer/${id}`, frmData, {}, {}, true)
        }
      } catch (error) {
        console.error(error)
      }
    }else{
      try {
        let formData = new FormData();
        formData.append('FormFile', img)
        let res = await axios.post(ApiConfig.baseUrl + '/cms/customfile/image', formData,   {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
  
        if(res.data){
          let keys = Object.keys(data);
          let frmData = new FormData(); 
              keys.map((item, idx) => frmData.append(keys[idx], data[keys[idx]]));
              frmData.append('PictureId', res.data.result)
          await _dataManager.post(`cms/ourcustomer`,frmData, {}, {}, true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },

  // DELETE

  deleteBlogCategory: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/blogcategory/${data}`, {}, {}, {}, true);
  },
  deleteBlogType: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/blogtype/${data}`, {}, {}, {}, true);
  },
  deleteBlogPost: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/blogpost/${data}`, {}, {}, {}, true);
  },
  deleteSliderItem: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/sliderItem/${data}`, {}, {}, {}, true);
  },
  deleteCooperationQuestion: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/cooperationQuestion/${data}`, {}, {}, {}, true);
  },
  deleteCooperationAnswer: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/cooperationAnswer/${data}`, {}, {}, {}, true);
  },
  deleteSurveyQuestion: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/surveyQuestion/${data}`, {}, {}, {}, true);
  },
  deleteSurveyAnswer: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/surveyAnswer/${data}`, {}, {}, {}, true);
  },
  deleteSellerTestQuestion: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/sellerDemandTestQuestion/${data}`, {}, {}, {}, true);
  },
  deleteSellerTestAnswer: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/sellerDemandTestQuestionAnswer/${data}`, {}, {}, {}, true);
  },
  deleteSellerNormalQuestions: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/sellerDemandDescriptiveQuestion/${data}`, {}, {}, {}, true);
  },
  deleteOurCustomer: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/ourcustomer/${data}`, {}, {}, {}, true);
  },
  deleteFaq: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/faq/${data}`, {}, {}, {}, true);
  },
  deleteNotice: (data = {}) => async (dispatch) => {
    await _dataManager.delete(`cms/notice/${data}`, {}, {}, {}, true);
  },
};
export default contentActions;
