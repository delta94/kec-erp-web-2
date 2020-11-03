const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("userType", JSON.stringify(action.payload.usertype));
        console.log("login payload : ",action.payload);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
          userType: 'SiteAssistent',
        };
        
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };

  export default AuthReducer;