import { IHistory } from "@/app/types/global.types";
import { createSlice, current } from "@reduxjs/toolkit";
import { log } from "console";
const initialState = {
    isLoggedIn: false,
    chatHistory: [] as IHistory[],
    currentChat: "",
    sidebarOpen: false,
    isFetching: false
}
const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        setHistory: (state, action) => {
            state.chatHistory = action.payload
        },
        changeSidebarState: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        changeFetchState: (state) => {
            state.isFetching = !state.isFetching
        }
    }
})
export const { login, setHistory, changeSidebarState, changeFetchState } = globalSlice.actions
export default globalSlice.reducer;