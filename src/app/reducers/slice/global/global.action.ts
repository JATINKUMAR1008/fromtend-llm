import { IMessage } from "@/app/types/global.types"
import { AppDispatch } from "../../store"
import { fetchChat } from "@/utils/auth"
import { setHistory, setLoading, setMessages,deleteChatFailure,deleteChatSuccess } from "./global.slice"
interface IFetchHistoryPayload {
    chatId: string,
    token: string
}
export const fetchHistory = () =>
    async (dispatch: AppDispatch) => {
        try {
            const data = await fetch('/api/chat', {
                method: 'GET'
            }).then(res => res.json()).then(data => { return data })
            dispatch(setHistory(data))
        } catch (e) {
            console.error(e)
        }
    }
export const fetchMessages = (chatId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading())
        const res = await fetch(`/api/chat/fetch?chatId=${chatId}`, {
            method: 'GET'
        }).then(res => res.json()).then(data => { return data });
        dispatch(setMessages(res))
    } catch (e) {
        console.error(e)
    }
    dispatch(setLoading())
}
export const logOut = () => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'GET'
        }).then(res => res.json()).then(data => { return data })
        console.log(res)
    } catch (e) {
        console.error(e)
    }
}

export const removeChat = (chatId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading());
        await fetch(`/api/delete/${chatId}`, {
            method: 'GET'
        });
        dispatch(deleteChatSuccess({ chat_id: chatId }));
        console.log("successfully deleted")
    } catch (error) {
        console.error(error);
        dispatch(deleteChatFailure());
    }
};