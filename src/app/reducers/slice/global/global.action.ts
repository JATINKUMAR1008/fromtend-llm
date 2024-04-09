import { IMessage } from "@/app/types/global.types"
import { AppDispatch } from "../../store"
import { fetchChat } from "@/utils/auth"
import { setHistory } from "./global.slice"
interface IFetchHistoryPayload {
    chatId: string,
    token: string
}
export const fetchHistory = () =>
    async (dispatch: AppDispatch) => {
        try {
            const data = await fetch('/api/chat/fetch', {
                method: 'GET'
            }).then(res => res.json()).then(data => { return data })
            dispatch(setHistory(data))
        } catch (e) {
            console.error(e)
        }
    }
