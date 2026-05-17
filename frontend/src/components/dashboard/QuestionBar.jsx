import { Send } from "lucide-react";

import { useMutation } from "@tanstack/react-query";

import {
  askRepositoryQuestion,
} from "../../api/queries";

import useAppStore from "../../stores/useAppStore";

import toast from "react-hot-toast";




export default function QuestionBar() {
  const {
    question,
    setQuestion,
    setResponses,
    setIsLoading,
    selectedLens,
  } = useAppStore();

  const {
    addMessage,
        } = useAppStore();

  const mutation = useMutation({
    mutationFn: askRepositoryQuestion,

    onMutate: () => {
      setIsLoading(true);

      setIsStreaming(true);
    },

    onSuccess: async (data) => {

        await new Promise((resolve) =>
        setTimeout(resolve, 1200)
    );

    setResponses(data.responses || []);

        toast.success(
        "Repository insights generated"
        );
    },

    onError: (error) => {
        console.error(error);

        toast.error(
            "Failed to generate insights"
        );
    },

    onSettled: () => {
      setIsLoading(false);

      setIsStreaming(false);

    },
  });

  const handleSubmit = async () => {

  if (!question.trim()) return;

  const userMessage = {
    id: Date.now(),

    role: "user",

    content: question,
  };

  addMessage(userMessage);

  const currentQuestion =
    question;

  setQuestion("");

  setTimeout(() => {

    addMessage({
      id: Date.now() + 1,

      role: "assistant",

      content: `
# Repository Analysis

This repository contains:

- React frontend architecture
- Zustand state management
- Modular dashboard systems
- AI interaction patterns

## Suggested Improvements

\`\`\`js
const improvedArchitecture = true;
\`\`\`
      `,
    });

  }, 1000);

};

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
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask ContextDrop about the repository..."
        className="
          flex-1
          bg-panel
          border
          border-border
          rounded-2xl
          px-5
          py-3
          outline-none
        "
      />

      <button
        onClick={handleSubmit}
        className="
            px-5
            py-3

            bg-blue
            hover:bg-blue-600

            rounded-2xl

            font-medium

            shadow-glow

            hover:scale-105

            transition-all
        "
      >
        <Send size={20} />
      </button>
    </div>
  );
}