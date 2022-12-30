const initialState = {
  isLogin: false,
  loginData: {
    data: {
      userNameOrEmail: "",
      password: "",
      loginCode: "",
    },
    step: 0,
    error: false,
  },
};

export default function userState(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "/auth/signin":
      return {
        ...state,
        loginData: {
          ...state.loginData,
          step: 2,
        },
      };
    case "/auth/signinsteptwo":
      return {
        ...state,
        loginData: initialState.loginData,
      };

    case "USER_IS_LOGIN":
      return {
        ...state,
        isLogin: payload.isLogin,
      };

    case "security/users/authenticated":
      return {
        ...state,
        userData: payload.result,
      };

    default:
      return state;
  }
}
