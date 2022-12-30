const initialState = {
  list: [],
  info: {},
  mainCategories: [],
  subCategories: [],
  productTypes: [],
  companies: [],
  bussinessMans: [],
  related: [],
  experts: [],
  priceHistory: [],
  attributes: [],
  payCondition: [],

  // Infos
  info: {},
  companyInfo: {},
  mainCategoryInfo: {},
  subCategoryInfo: {},
  typeInfo: {},
  expertInfo: {},
  businessManInfo: {},
  payConditionInfo: {},
};

export default function productState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "cms/productMainCategory":
      return {
        ...state,
        mainCategories: payload.result,
      };
    case "cms/productSubCategory":
      return {
        ...state,
        subCategories: payload.result,
      };

    case "cms/product":
      return {
        ...state,
        list: payload.result,
      };

    case `cms/product/${payload?.result?.id}`:
      return {
        ...state,
        info: payload.result,
      };
    case "RELATED_LIST":
      return {
        ...state,
        related: payload,
      };
    case "cms/expert":
      return {
        ...state,
        experts: payload.result,
      };
    case "cms/productCompany":
      return {
        ...state,
        companies: payload.result,
      };

    case "cms/productType":
      return {
        ...state,
        productTypes: payload.result,
      };

    case "cms/productAttribute":
      return {
        ...state,
        attributes: payload.result,
      };
    case "cms/businessman":
      return {
        ...state,
        bussinessMans: payload.result,
      };

    case "cms/payCondition":
      return {
        ...state,
        payCondition: payload.result,
      };

    //INFOS

    case `cms/productCompany/${payload?.result?.id}`:
      return {
        ...state,
        companyInfo: payload.result,
      };
    case `cms/productMainCategory/${payload?.result?.id}`:
      return {
        ...state,
        mainCategoryInfo: payload.result,
      };
    case `cms/productSubCategory/${payload?.result?.id}`:
      return {
        ...state,
        subCategoryInfo: payload.result,
      };
    case `cms/productType/${payload?.result?.id}`:
      return {
        ...state,
        typeInfo: payload.result,
      };

    case `cms/expert/${payload?.result?.id}`:
      return {
        ...state,
        expertInfo: payload.result,
      };
    case `cms/businessman/${payload?.result?.id}`:
      return {
        ...state,
        businessManInfo: payload.result,
      };
    case `cms/payCondition/${payload?.result?.id}`:
      return {
        ...state,
        payConditionInfo: payload.result,
      };

    default:
      return state;
  }
}
