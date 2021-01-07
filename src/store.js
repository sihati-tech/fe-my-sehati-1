import { createStore } from "redux";
import rootReducer from "./reducers/index";
function configureStore(state = { rotating: true }) {
  return createStore(rootReducer,state);
}
export default configureStore;