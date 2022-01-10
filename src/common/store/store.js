import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "../../common/store/MovieSlice";

export const store=configureStore({
    reducer:{
        movies:moviesReducer,
    },
});