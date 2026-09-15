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
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
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
              className="rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-600 hover:border-blue-600 hover:text-blue-600 dark:border-gray-500 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {s.question}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={chat.handleSubmit}
        className="flex items-center gap-2 border-t border-gray-200 p-3 dark:border-gray-700"
      >
        <input
          value={chat.input}
          onChange={(e) => chat.setInput(e.target.value)}
          aria-label="Ask a question"
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-gray-500 bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-blue-600 dark:border-gray-400"
        />
        <button
          type="submit"
          aria-label="Send"
          className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          disabled={!chat.input.trim()}
        >
          <Send size={16} aria-hidden />
        </button>
      </form>
    </>
  );
}
