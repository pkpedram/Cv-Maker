const initialState = {
  isLogin: true,

  
};

export default function userState(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {

    case "USER_IS_LOGIN":
      return {
        ...state,
        isLogin: payload.isLogin,
      };


    default:
      return state;
  }
}
