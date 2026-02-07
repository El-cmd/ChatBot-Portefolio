import { ChatPanel } from "@/components/chat/ChatPanel";

export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-col px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-1">
        <ChatPanel />
      </div>
    </section>
  );
}
