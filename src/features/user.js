import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        name: null,
        money: 0
    },
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload
        },
        changeId: (state, action) => {
            state.id = action.payload
        },
        changeMoney: (state, action) => {
            state.money = action.payload
        },
    }
})

export const {changeName, changeId, changeMoney} = userSlice.actions

export default userSlice.reducer;