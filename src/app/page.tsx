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
    <>
      <Header />
      <Chat />
    </>
  );
}
