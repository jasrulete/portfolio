// FaqChatbot.tsx
//
// A zero-backend FAQ chatbot for a static portfolio site.
// Uses Fuse.js for fuzzy client-side retrieval over faqData.ts — no API key,
// no server, no cost, and it can never hallucinate facts about you since it
// only ever surfaces text you wrote yourself.
//
// Install once: npm install fuse.js framer-motion lucide-react
//
// Usage: drop <FaqChatbot /> once near the root of your App (e.g. in App.tsx),
// it renders itself as a fixed floating widget.

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { faqData, FaqEntry } from "../data/faqData";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

const FALLBACK_ANSWER =
  "I don't have a canned answer for that one yet — try rephrasing, or pick one of the suggestions below. For anything specific, the contact section is the fastest way to reach Jeric directly.";

const SUGGESTED_IDS = [
  "who-are-you",
  "tech-stack",
  "ai-agent-project",
  "hire-you",
];

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "bot",
      text: "Hi! I'm a small FAQ bot trained on Jeric's background. Ask me about his skills, projects, experience, or anything else on this site.",
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
  }, [messages, open]);

  function answerFor(query: string): string {
    const trimmed = query.trim();
    if (!trimmed) return FALLBACK_ANSWER;
    const results = fuse.search(trimmed);
    if (results.length === 0) return FALLBACK_ANSWER;
    return results[0].item.answer;
  }

  function send(text: string) {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };
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

  const suggestions: FaqEntry[] = faqData.filter((f) =>
    SUGGESTED_IDS.includes(f.id),
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
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

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion chips (only before the user asks anything) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => send(s.question)}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-300"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-700"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:border-slate-600"
              />
              <button
                type="submit"
                aria-label="Send"
                className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open FAQ chatbot"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
