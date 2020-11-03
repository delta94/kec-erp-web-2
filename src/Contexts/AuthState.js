import React from "react";
import authContext from './AuthContext';
import AuthReducer from './AuthReducer';
import Dashboard from "../Components/Dashboard";
import SignIn from '../signIn';

const users = (type) =>{
  switch(type){
    case 'SiteAssistent':{
      return <Dashboard/>
    }
    default:
      return <SignIn/>
  }
}
const AuthState = () => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: null,
        userType: null,
      };
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  return (
    <authContext.Provider value={{ state, dispatch }}>
      <>{!state.isAuthenticated ? <SignIn/> : users(state.userType)}</>
    </authContext.Provider>
  );
};

export default AuthState;
