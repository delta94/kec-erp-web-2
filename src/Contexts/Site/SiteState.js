import React from "react";
import siteContext from './SiteContext';
import SiteReducer from './SiteReducer';


const SiteState = (props) => {
    const initialState = {
       isFetching:false,
       sites:[]
      };
  const [state, dispatch] = React.useReducer(SiteReducer, initialState);
  return (
    <siteContext.Provider value={{ state, dispatch }}>
      <>{props.children}</>
    </siteContext.Provider>
  );
};

export default SiteState;
