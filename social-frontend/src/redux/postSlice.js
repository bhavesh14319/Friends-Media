import { createSlice  } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"postStates",
    initialState:{
        loading:false,
        post:null
    },

    reducers:{
        postRequest : (state,action)=>{
            state.loading=true
        },
        postSuccess : (state,action)=>{
            state.loading=false;
            state.post=action.payload;
        },
        postFailure: (state,action)=>{
            state.loading = false;
        }
    }
})


export const {postFailure,postRequest,postSuccess} = postSlice.actions
export default postSlice.reducer