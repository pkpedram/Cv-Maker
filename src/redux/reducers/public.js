

const initialState = {
  menuItems: [],
  overAllData: [],
  states: [],
  cities: [],
  loading: false,
  isMobile: false,
  
  // INFO
  stateInfo: {},
  cityInfo: {},
};


export default function publicState(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "SET_MOBILE":
      return {
        ...state,
        isMobile: payload,
      };
    case 'GET_MENU_ITEM':
      return{
        ...state,
        menuItems: payload
      }

      case 'GET_OVER_ALL_DATA':
        return {
          ...state,
          overAllData: payload
        }


      case 'LOADING_END':
        return{
          ...state,
          loading: false
        }  

      case 'LOADING_START':
        return{
          ...state,
          loading:true
        } 
        
      case 'basicdata/state':
        return{
          ...state,
          states: payload.result
        }  

      case 'basicdata/city':
        return{
          ...state,
          cities: payload.result
        } 
        
        // INFOS

        case `basicdata/state/${payload?.result?.id}`:
          return{
            ...state,
            stateInfo: payload.result
          }
          case `basicdata/city/${payload?.result?.id}`:
          return{
            ...state,
            cityInfo: payload.result
          }
    default:
      return state;
  }
}
