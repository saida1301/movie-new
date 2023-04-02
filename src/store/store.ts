import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./redux/authSlice";
import reviewReducer from "./redux/reviewsSlice";

export const store = configureStore({
    reducer: {
   
        auth: authReducer,
        review: reviewReducer,
    }
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

