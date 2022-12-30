const initialState = {
    sellerDemandList: [],
    accountingList: [],
    cooperationList: [],
    //INFO
    sellerDemandInfo: {},
    accountingInfo: {},
    cooperationInfo: {},
  };
  
  
  export default function requestsState(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {

        case 'cms/sellerDemand':
            return{
                ...state,
                sellerDemandList: payload.result
            }
            case 'cms/accountingReport':
              return {
                ...state,
                accountingList: payload.result,
              }
              case 'cms/cooperationRequestItem':
                return{
                  ...state,
                  cooperationList: payload.result
                }

        //INFO

        case `cms/sellerDemand/${payload?.result?.id}`:
            return {
              ...state,
              sellerDemandInfo: payload.result,
            };

            case `cms/accountingReport/${payload?.result?.id}`:
              return {
                ...state,
                accountingInfo:payload.result
              }
              case `cms/cooperationRequestItem/${payload?.result?.id}`:
                return {
                  ...state,
                  cooperationInfo:payload.result
                }

      default:
        return state;
    }
  }
  