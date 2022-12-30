const initialState = {
  shippingPriceList: [],
  inventoryPriceList: [],
  charityList: [],
  consultant:[],
  //INFO
  shippingPriceInfo: {},
  inventoryPriceInfo: {},
  charityInfo: {},
};

export default function settingsState(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "cms/shippingprice":
      return {
        ...state,
        shippingPriceList: payload.result,
      };
    case "cms/inventoryPrice":
      return {
        ...state,
        inventoryPriceList: payload.result,
      };
    case "cms/charity":
      return {
        ...state,
        charityList: payload.result,
      };
      case 'cms/consultantPlan':
        return {
          ...state,
          consultant: payload.result
        }

    //INFO

    case `cms/shippingprice/${payload?.result?.id}`:
      return {
        ...state,
        shippingPriceInfo: payload.result,
      };

    case `cms/inventoryPrice/${payload?.result?.id}`:
      return {
        ...state,
        inventoryPriceInfo: payload.result,
      };
    case `cms/charity/${payload?.result?.id}`:
      return {
        ...state,
        charityInfo: payload.result,
      };

    default:
      return state;
  }
}
