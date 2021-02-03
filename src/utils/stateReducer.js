export default (state, action) => {
  switch (action.type) {
    case "setLoggedUserDetails": {
        return {
            ...state,
            loggedUserDetails: action.data
        };
    };
    default:
        return state;
  };
};