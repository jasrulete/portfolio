// FaqChatbot.tsx
//
// A zero-backend FAQ chatbot for a static portfolio site.
// Uses Fuse.js for fuzzy client-side retrieval over faqData.ts — no API key,
// no server, no cost, and it can never hallucinate facts about you since it
// only ever surfaces text you wrote yourself.
//
// Install once: npm install fuse.js lucide-react
//
// Usage: drop <FaqChatbot /> once near the root of your App (e.g. in App.tsx),
// it renders itself as a fixed floating widget.

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { useFaqChat } from "../hooks/use-faq-chat";
import { FaqChatBody } from "./chat-window";

const FALLBACK_ANSWER =
  "I don't have a canned answer for that one yet — try rephrasing, or pick one of the suggestions below. For anything specific, the contact section is the fastest way to reach Jeric directly.";

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const chat = useFaqChat(FALLBACK_ANSWER);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    chat.scrollRef.current?.scrollTo({
      top: chat.scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ask about Jeric"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200 motion-reduce:animate-none outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Ask about Jeric</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>

          <FaqChatBody chat={chat} />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open FAQ chatbot"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 hover:bg-indigo-700"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
