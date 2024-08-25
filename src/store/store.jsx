import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import postReducer from './reducers/postSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    },
});