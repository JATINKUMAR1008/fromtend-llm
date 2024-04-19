export const getHistory = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/loadHistory`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data
        }
    )
    return res
}
export const createNewChat = async (token: string, input: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/create_new_chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label: input })
    }).then(
        res => res.json()
    ).then(
        data => {
            return data
        }
    )
    return res
}
export const updateChatLabel = async (chatId: string, input: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/update_label/${chatId}`, {
        method: 'POST',
        body: JSON.stringify({ label: input }),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(res => res.json()).then(data => { return data })
    return res
}

export const deleteChat = async (chatId: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/delete_chat/${chatId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data 
        }
    )
    console.log("deleted successfully 2")
    return res
}

export const shareChat = async (chatId: string,token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/share/${chatId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data
        }
    )
    return res
}

export const resetChat = async (chatId: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reset_chat/${chatId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data 
        }
    )
    console.log("chat reset successfully 2")
    return res
}