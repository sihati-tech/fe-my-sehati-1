export default (state = {}, action) => {
    switch (action.type) {
      case "rotate":
        return {
          rotating: action.payload
        };
      case "navBar":
        return {
          rotating: action.payload
        };
      default:
        return state;
    }
  };