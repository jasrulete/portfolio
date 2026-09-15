// Shared FAQ-chat state/logic for the floating widget (FaqChatbot) and the
// desktop/mobile chatbot app (ChatbotApp) — previously duplicated by hand
// across both files, letting them drift out of sync.

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { faqData, type FaqEntry } from "../data/faqData";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

const SUGGESTED_IDS = ["who-are-you", "tech-stack", "ai-agent-project", "hire-you"];

export function useFaqChat(fallbackAnswer: string) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "bot",
      text: "Pick a question or type keywords — answers come from a short FAQ.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(faqData, {
        keys: [
          { name: "question", weight: 0.5 },
          { name: "keywords", weight: 0.35 },
          { name: "answer", weight: 0.15 },
        ],
        threshold: 0.4, // lower = stricter match
        ignoreLocation: true,
      }),
    [],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function answerFor(query: string): string {
    const trimmed = query.trim();
    if (!trimmed) return fallbackAnswer;
    const results = fuse.search(trimmed);
    if (results.length === 0) return fallbackAnswer;
    return results[0].item.answer;
  }

  function send(text: string) {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "bot",
      text: answerFor(text),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    send(input);
  }

  const suggestions: FaqEntry[] = faqData.filter((f) => SUGGESTED_IDS.includes(f.id));

  return { messages, input, setInput, scrollRef, send, handleSubmit, suggestions };
}

export type FaqChat = ReturnType<typeof useFaqChat>;
