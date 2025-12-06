import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "request",
    initialState : [],
    reducers:{
        addRequests : (state, action) => action.payload,
        removeRequest : () => null,
    }
});

export const {addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;