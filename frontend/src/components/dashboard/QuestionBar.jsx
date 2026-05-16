import { Send } from "lucide-react";

export default function QuestionBar() {
  return (
    <div
      className="
        mt-8
        flex
        items-center
        gap-4
      "
    >
      <input
        type="text"
        placeholder="Ask ContextDrop about the repository..."
        className="
          flex-1
          bg-panel
          border
          border-border
          rounded-2xl
          px-5
          py-4
          outline-none
        "
      />

      <button
        className="
          bg-blue
          p-4
          rounded-2xl
          hover:opacity-90
          transition
        "
      >
        <Send size={20} />
      </button>
    </div>
  );
}
