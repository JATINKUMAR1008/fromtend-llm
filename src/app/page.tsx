import Chat from "@/components/chat/chat";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between ">
      <Sidebar />
      <Chat />
    </main>
  );
}
