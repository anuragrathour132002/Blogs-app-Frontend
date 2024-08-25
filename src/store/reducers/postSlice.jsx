import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [], // To store multiple posts
    loading: false, // To track loading state
    error: null, // To track any errors
    comments:[]
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        savePosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        removePosts: (state) => {
            state.posts = [];
            state.loading = false;
            state.error = null;
        },
        saveComments:(state,action)=>{
            state.comments=action.payload
        }
    },
});

export const { savePosts,saveComments, setLoading, setError, removePosts } = postSlice.actions;
export default postSlice.reducer;
