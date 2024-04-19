import { IMessage } from "@/app/types/global.types"
import { AppDispatch } from "../../store"
import { fetchChat } from "@/utils/auth"
import { setHistory, setLoading, setMessages, deleteChatFailure, deleteChatSuccess, setShareLink, setButtonLoader } from "./global.slice"
import { toast } from "@/components/ui/use-toast"
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
        await fetch(`/api/chat?chatId=${chatId}`, {
            method: 'DELETE'
        });
        // dispatch(deleteChatSuccess({ chat_id: chatId }));
        console.log("successfully deleted")
    } catch (error) {
        console.error(error);
        dispatch(deleteChatFailure());
    }
};

export const shareChat = (chatId: string) =>
    async (dispatch: AppDispatch) => {
        try {
            const data = await fetch(`/api/chat/share?chatId=${chatId}`, {
                method: 'GET'
            }).then(res => res.json()).then(data => { return data })
            dispatch(setHistory(data))
        } catch (e) {
            console.error(e)
        }
    }

export const createShareLink = (chatId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setButtonLoader(true))
        const data = await fetch(`/api/chat/share?chatId=${chatId}`, {
            method: 'GET'
        }).then(res => res.json());
        // navigator.clipboard.writeText(data.link);
        toast({
            title: 'Link Copied',
            description: 'Share this link with your friends',
        })
        dispatch(setShareLink(data.link));
        dispatch(setButtonLoader(false))
        return data;
    } catch (e) {
        console.error(e);
        dispatch(setButtonLoader(false))
    }
}

export const resetChat = (chatId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading());
        const response = await fetch(`/api/chat/reset?chatId=${chatId}`, {
            method: 'DELETE',
        }).then(() => {
            toast({
                title: 'Chat: Reset',
                description: 'Messages are reset for the particular chat.',
                type: "background"
            })
        })
        dispatch(setLoading());
        dispatch(fetchMessages(chatId));
    } catch (e) {
        console.error(e);
        dispatch(setLoading());
    }
}
