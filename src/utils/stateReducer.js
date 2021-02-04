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
      case "setInitialCafeData":
      return {
        ...state,
        initialCafeData: action.data
      };
      case "setInitialCoffeeData":
      return {
        ...state,
        setInitialCoffeeData: action.data
      };
    default:
      return state;
  };
};

export default stateReducer;
