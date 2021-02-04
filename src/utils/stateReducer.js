const stateReducer = (state, action) => {
  switch (action.type) {
    case "setLoggedInUser":
      return {
        ...state,
        loggedInUser: action.data
      };
    case "setUserLocation":
      return {
        ...state,
        userLocation: action.data
      };
    case "getAllCoffees":
      return {
        ...state,
        allCoffees: action.data
      };
    case "setUserCoffee":
      return {
        ...state,
        userCoffee: action.data
      };
    case "setOrderCafe":
      return {
        ...state,
        orderCafe: action.data
      };
    default:
      return state;
  };
};

export default stateReducer;
