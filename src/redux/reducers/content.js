const initialState = {
  blogCategories: [],
  blogTypes: [],
  blogList: [],
  sliderList: [],
  forms:{
    cooperationQuestions: [],
    cooperationAnswers: [],
    surveyQuestions: [],
    surveyAnswers: [],
    sellerTestQuestions: [],
    sellerTestAnswers: [],
    sellerNormalQuestions: [],
  },
  ourCustomers: [],
  faq: [],
  notice: [],

  // INFO
  blogInfo: {},
  blogCategoryInfo: {},
  blogTypeInfo: {},
};

export default function contentState(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "cms/sliderItem":
      return {
        ...state,
        sliderList: payload.result,
      };
      case "cms/sellerDemandTestQuestion":
      return {
        ...state,
        forms: {
          ...state.forms,
          sellerTestQuestions: payload.result
        },
      };
      case "cms/sellerDemandDescriptiveQuestion":
      return {
        ...state,
        forms: {
          ...state.forms,
          sellerNormalQuestions: payload.result
        },
      };
      case "cms/sellerDemandTestQuestionAnswer":
      return {
        ...state,
        forms: {
          ...state.forms,
          sellerTestAnswers: payload.result
        },
      };
      case "cms/cooperationQuestion":
      return {
        ...state,
        forms: {
          ...state.forms,
          cooperationQuestions: payload.result
        },
      };
      case "cms/surveyQuestion":
      return {
        ...state,
        forms: {
          ...state.forms,
          surveyQuestions: payload.result
        },
      };
      case "cms/surveyAnswer":
      return {
        ...state,
        forms: {
          ...state.forms,
          surveyAnswers: payload.result
        },
      };
      case "cms/cooperationAnswer":
      return {
        ...state,
        forms: {
          ...state.forms,
          cooperationAnswers: payload.result
        },
      };
    case "cms/blogpost":
      return {
        ...state,
        blogList: payload.result,
      };

    case "cms/blogcategory":
      return {
        ...state,
        blogCategories: payload.result,
      };

    case "cms/blogtype":
      return {
        ...state,
        blogTypes: payload.result,
      };

      case `cms/ourcustomer`:
        return{
          ...state,
          ourCustomers: payload.result
        }
        case `cms/faq`:
        return{
          ...state,
          faq: payload.result
        }
        case `cms/notice`:
        return{
          ...state,
          notice: payload.result
        }

    // GET INFO

    case `cms/blogpost/${payload?.result?.id}`:
      return {
        ...state,
        blogInfo: payload.result,
      };
    case `cms/blogcategory/${payload?.result?.id}`:
      return {
        ...state,
        blogCategoryInfo: payload.result,
      };
    case `cms/blogtype/${payload?.result?.id}`:
      return {
        ...state,
        blogTypeInfo: payload.result,
      };
    default:
      return state;
  }
}
