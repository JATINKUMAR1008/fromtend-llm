"use client"
import Chat from "@/components/chat/chat";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Header from "@/components/header/header";
import { useEffect, useState } from "react";
interface IChat {
  chat_id: string
  label: string
}
export default function Home() {
  const [chatHistory, setChatHistory] = useState<IChat[]>([])
  const [open, setOpen] = useState(false)
  const fetchHistory = async () => {
    const res = await fetch('/api/chat', {
      method: 'GET'
    });
    const data = await res.json();
    setChatHistory(data)
  }
  useEffect(() => {
    fetchHistory()
  }, [])
  return (
    <main className="flex min-h-screen w-full items-center justify-between ">
      <div className="max-w-[15%] h-full lg:w-full w-0">
        <Sidebar chatHistory={chatHistory} open={open} setOpen={setOpen}/>
      </div>
      <div className="lg:max-w-[85%] h-full max-w-[100%] w-full">
        <Header setOpen={setOpen} />
        <Chat />
      </div>
    </main>
  );
}
