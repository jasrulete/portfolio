// Shared FAQ-chat body — message list, suggestion chips, and input form —
// reused by both FaqChatbot's floating widget and ChatbotApp's embedded view.

import { Send } from "lucide-react";
import type { FaqChat } from "../hooks/use-faq-chat";

export function FaqChatBody({ chat }: { chat: FaqChat }) {
  return (
    <>
      <div
        ref={chat.scrollRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
      >
        {chat.messages.map((m) => (
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

      {chat.messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {chat.suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => chat.send(s.question)}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-300"
            >
              {s.question}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={chat.handleSubmit}
        className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-700"
      >
        <input
          value={chat.input}
          onChange={(e) => chat.setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:border-slate-600"
        />
        <button
          type="submit"
          aria-label="Send"
          className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-40"
          disabled={!chat.input.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </>
  );
}
