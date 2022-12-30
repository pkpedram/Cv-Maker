const initialState = {
    userList: [],
    userInfo: {},
  };
  
  export default function userControlState(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "security/user": 
      return {
        ...state,   
        userList: payload.result
      }

      case `security/user/${payload?.result?.id}`:
        return{
            ...state,
            userInfo: payload.result
        }
  
      default:
        return state;
    }
  }
  