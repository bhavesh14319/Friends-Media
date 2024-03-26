import { createSlice } from "@reduxjs/toolkit";


const commentModalSlice = createSlice({
    name : "commentModalStates",
    initialState:{
        open : false
    },
    reducers: {
        openCommentModal : (state,action)=>{
            state.open = true;
        },
        closeCommentModal : (state,action)=>{
            state.open = false;
        }
    }
})


export const  {closeCommentModal,openCommentModal}  = commentModalSlice.actions


export default commentModalSlice.reducer