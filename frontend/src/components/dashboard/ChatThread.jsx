import useAppStore from "../../stores/useAppStore";

import ChatMessage from "./ChatMessage";

export default function ChatThread() {

  const { messages } =
    useAppStore();

  return (
    <div
      className="
        space-y-6

        h-[600px]

        overflow-y-auto

        pr-2
      "
    >

      {!messages.length && (
        <div
          className="
            text-center
            text-gray-500
            pt-20
          "
        >
          Start asking repository
          questions.
        </div>
      )}

      {messages.map((message) => (

        <ChatMessage
          key={message.id}
          message={message}
        />

      ))}

    </div>
  );
}