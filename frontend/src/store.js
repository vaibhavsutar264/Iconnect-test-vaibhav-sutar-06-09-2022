import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    //here combine reducers is taken because lots of product reducers will be there of different type of product
   user: userReducer,

   //here user reducers is attached which is link in app.js and useraction is attached components loginsignup and this is attached im app.js , store js is attached in index.js
    
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,   
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store