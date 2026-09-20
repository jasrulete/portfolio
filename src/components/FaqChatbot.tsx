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
import { MessageCircle, X, MessageCircleQuestion } from "lucide-react";
import { useFaqChat } from "../hooks/use-faq-chat";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import { FaqChatBody } from "./chat-window";

const FALLBACK_ANSWER =
  "I don't have a canned answer for that one yet — try rephrasing, or pick one of the suggestions below. For anything specific, the contact section is the fastest way to reach Jeric directly.";

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const chat = useFaqChat(FALLBACK_ANSWER);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
      chat.scrollRef.current?.scrollTo({
        top: chat.scrollRef.current.scrollHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    } else if (wasOpen.current) {
      // Escape or the close button must not drop focus onto <body>.
      openerRef.current?.focus?.();
      openerRef.current = null;
    }
    wasOpen.current = open;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = () => {
    if (!open) openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(!open);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        // Not aria-modal: the panel doesn't trap focus and the page behind it
        // stays interactive, so claiming modality would lie to screen readers.
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Quick answers"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200 motion-reduce:animate-none outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion size={16} aria-hidden />
              <span className="text-sm font-medium">Quick answers</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={16} aria-hidden />
            </button>
          </div>

          <FaqChatBody chat={chat} />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggle}
        aria-label={open ? "Close quick answers" : "Open quick answers"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        {open ? <X size={22} aria-hidden /> : <MessageCircle size={22} aria-hidden />}
      </button>
    </div>
  );
}
