import { useFaqChat } from "../../../hooks/use-faq-chat";
import { FaqChatBody } from "../../chat-window";

const FALLBACK_ANSWER =
  "I don't have a canned answer for that one yet. Try rephrasing, or pick one of the suggestions below. For anything specific, the Contact app is the fastest way to reach Jeric directly.";

export default function ChatbotApp() {
  const chat = useFaqChat(FALLBACK_ANSWER);

  return (
    <div className="h-full flex flex-col bg-canvas">
      <FaqChatBody chat={chat} />
    </div>
  );
}
