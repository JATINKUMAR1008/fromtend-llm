import { IHistory, IMessage } from "@/app/types/global.types";
import { createSlice, current } from "@reduxjs/toolkit";
import { log } from "console";
const initialState = {
    isLoggedIn: false,
    chatHistory: [] as IHistory[],
    currentChat: {
        id:"",
        label:""
    },
    sidebarOpen: false,
    isFetching: false,
    messages: [] as IMessage[],
    isLoading: false,
    shareLink: "" as string,
    buttonLoader: false as boolean
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
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setLoading: (state) => {
            state.isLoading = !state.isLoading
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload
        },
        deleteChatSuccess: (state, action) => {
            state.chatHistory = state.chatHistory.filter(chat => chat.chat_id !== action.payload.chat_id);
        },
        deleteChatFailure: (state) => {
            // Handle delete chat failure if needed
        },
        setShareLink: (state, action) => {
            state.shareLink = action.payload
        },
        setButtonLoader: (state, action) => {
            state.buttonLoader = action.payload
        }
    }
})
export const { login, setHistory, changeSidebarState, changeFetchState, setMessages, setLoading, setCurrentChat,deleteChatFailure,deleteChatSuccess,setShareLink,setButtonLoader } = globalSlice.actions
export default globalSlice.reducer;