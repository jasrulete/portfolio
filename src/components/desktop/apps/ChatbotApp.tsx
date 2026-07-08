import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Send } from "lucide-react";
import { faqData, type FaqEntry } from "../../../data/faqData";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

const FALLBACK_ANSWER =
  "I don't have a canned answer for that one yet — try rephrasing, or pick one of the suggestions below. For anything specific, the Contact app is the fastest way to reach Jeric directly.";

const SUGGESTED_IDS = ["who-are-you", "tech-stack", "ai-agent-project", "hire-you"];

export default function ChatbotApp() {
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
        threshold: 0.4,
        ignoreLocation: true,
      }),
    []
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function answerFor(query: string): string {
    const trimmed = query.trim();
    if (!trimmed) return FALLBACK_ANSWER;
    const results = fuse.search(trimmed);
    if (results.length === 0) return FALLBACK_ANSWER;
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

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
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
    </div>
  );
}
