import { createSlice } from "@reduxjs/toolkit";
import moviesData from "../moviesData";

const initialState={
    movies:moviesData,
}
const movieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{
        addMovies:(state,{payload})=>{state.movies=payload;
    },},
})
export const {addMovies}=movieSlice.actions;
export const getAllMovies=(state)=>state.movies.movies;
export  default movieSlice.reducer;