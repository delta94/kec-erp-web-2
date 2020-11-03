const SiteReducer = (state, action) => {
    console.log("action :",action);
      switch (action.type) {
          case "FETCH_REQUEST":
            return {
              ...state,
              isFetching: true,
              hasError: false,
            };
          case "FETCH_SUCCESS":
            return {
              ...state,
              isFetching: false,
              sites: action.payload,
            };
      
          case "FETCH_FAILURE":
            return {
              ...state,
              hasError: true,
              isFetching: false,
            };
          default:
            return state;
        }
    }
export default SiteReducer;