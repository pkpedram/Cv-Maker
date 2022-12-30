

const initialState = {

  loading: false,
  isMobile: false,
  
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
        

    default:
      return state;
  }
}
