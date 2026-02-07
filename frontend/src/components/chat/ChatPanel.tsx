"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { DEFAULT_USER_GUIDE } from "@/lib/chat/prompts";
import type { ChatMessage as ChatMessageType, ChatRequest, ChatResponse } from "@/lib/chat/types";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export function ChatPanel() {
  const { messages, locale } = useLanguage();
  const guide = DEFAULT_USER_GUIDE[locale];

  const createId = React.useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<ChatMessageType[]>([]);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setChatMessages((current) => {
      if (current.length === 0) {
        return [
          {
            id: "welcome",
            role: "assistant",
            content: messages.chat.initialAssistant
          }
        ];
      }
      if (current.length === 1 && current[0].id === "welcome") {
        return [
          {
            ...current[0],
            content: messages.chat.initialAssistant
          }
        ];
      }
      return current;
    });
  }, [messages.chat.initialAssistant]);

  React.useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }
    requestAnimationFrame(() => {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages, isSending]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) {
      return;
    }

    const history = chatMessages.map((message) => ({
      role: message.role,
      content: message.content
    }));

    const nextMessage: ChatMessageType = {
      id: createId(),
      role: "user",
      content: trimmed
    };

    setChatMessages((current) => [...current, nextMessage]);
    setInput("");
    setIsSending(true);

    try {
      const payload: ChatRequest = {
        message: trimmed,
        history
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = (await response.json()) as ChatResponse;
      setChatMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: data.answer
        }
      ]);
    } catch (error) {
      setChatMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: messages.chat.error
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex items-start justify-between gap-4 pb-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {messages.chat.label}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {messages.chat.title}
          </h1>
          <p className="text-sm text-muted-foreground">{messages.chat.description}</p>
        </div>
        <LanguageToggle />
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden border-border/60 bg-card/60">
        <motion.div
          {...fadeIn}
          ref={listRef}
          className="flex-1 space-y-6 overflow-y-auto px-6 py-6"
        >
          {chatMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">{messages.chat.empty}</p>
          ) : (
            chatMessages.map((message) => <ChatMessage key={message.id} message={message} />)
          )}

          {chatMessages.length <= 1 ? (
            <div className="space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{guide.title}</p>
              <p>{guide.description}</p>
              <div className="flex flex-wrap gap-2">
                {guide.suggestions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>

        <div className="border-t border-border/60 bg-background/80 p-4">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={isSending}
            isSending={isSending}
            placeholder={messages.chat.placeholder}
            hint={messages.chat.hint}
            sendLabel={messages.chat.send}
            sendingLabel={messages.chat.sending}
          />
        </div>
      </Card>
    </div>
  );
}
