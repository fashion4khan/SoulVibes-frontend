import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice.js"
import requestReducer from "./requestSlice.js"

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connection : connectionsReducer,
        request : requestReducer,
    }
})

export default appStore;