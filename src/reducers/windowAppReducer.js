export default (state = {}, action) => {
    switch (action.type) {
      case "appName":
        return {
          action: action.type,
          appType: action.appType
        };
      case "windowNav":
        return {
          action: action.type,
          windowNav: action.windowNav
        };
      default:
        return state;
    }
  };