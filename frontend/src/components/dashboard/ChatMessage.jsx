import MarkdownRenderer from "../markdown/MarkdownRenderer";

export default function ChatMessage({
  message,
}) {

  const isUser =
    message.role === "user";

  return (
    <div
      className={`
        flex
        ${isUser
          ? "justify-end"
          : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl

          px-5
          py-4

          rounded-3xl

          ${
            isUser
              ? `
                bg-primary
                text-cream
              `
              : `
                bg-panel/70
                backdrop-blur-xl
                border
                border-border
              `
          }
        `}
      >

        {isUser ? (
          <p
            className="
              whitespace-pre-wrap
            "
          >
            {message.content}
          </p>
        ) : (
          <MarkdownRenderer
            content={message.content}
          />
        )}

      </div>

    </div>
  );
}