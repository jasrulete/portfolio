// Shared FAQ-chat body — message list, suggestion chips, and input form —
// rendered by ChatbotApp, the desktop OS "Ask Me" app.

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
                  ? "bg-accent-fill text-on-accent"
                  : "bg-surface text-ink"
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
              className="rounded-full border border-muted px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
            >
              {s.question}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={chat.handleSubmit}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <input
          value={chat.input}
          onChange={(e) => chat.setInput(e.target.value)}
          aria-label="Ask a question"
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-muted bg-transparent px-3 py-2 text-sm outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus:border-accent"
        />
        <button
          type="submit"
          aria-label="Send"
          className="rounded-lg bg-accent-fill p-2 text-on-accent hover:opacity-90 disabled:opacity-40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
          disabled={!chat.input.trim()}
        >
          <Send size={16} aria-hidden />
        </button>
      </form>
    </>
  );
}
