const stateReducer = (state, action) => {
  switch (action.type) {
    case "setFlashMessage":
      return {
        ...state,
        flashMessage: action.data
      };
    case "setLoggedInUser":
      return {
        ...state,
        loggedInUser: action.data
      };
    case "getAllCafes":
      return {
        ...state,
        allCafes: action.data
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
    case "setCafeData":
      return {
        ...state,
        cafeData: action.data
      };
      case "setCoffeeData":
      return {
        ...state,
        coffeeData: action.data
      };
    case "setButtonToggle":
      return {
        ...state,
        buttonToggle: action.data
      };
    default:
      return state;
  };
};

export default stateReducer;
