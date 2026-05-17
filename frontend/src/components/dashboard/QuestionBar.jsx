import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useAppStore from "../../stores/useAppStore";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";

export default function QuestionBar() {
  const {
    question,
    setQuestion,
    addMessage,
    setStreaming,
    setError,
  } = useAppStore();

  const mutation = useMutation({
    mutationFn: async (query) => {
      return await apiClient.getCapsule(query);
    },

    onMutate: () => {
      setStreaming(true);
      setError(null);
    },

    onSuccess: async (data) => {
      // Add AI response message with full capsule data
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        capsuleData: data, // Store full response for CapsuleGrid
      };

      addMessage(aiMessage);

      toast.success(
        `Analysis complete in ${data.processing_time.toFixed(1)}s`
      );
    },

    onError: (error) => {
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      
      toast.error("Failed to analyze repository");
      
      console.error("Capsule API Error:", error);
    },

    onSettled: () => {
      setStreaming(false);
    },
  });

  const handleSubmit = async () => {
    if (!question.trim()) return;

    // Prevent duplicate submissions
    if (mutation.isPending) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    addMessage(userMessage);

    const currentQuestion = question;
    setQuestion("");

    // Call API
    mutation.mutate(currentQuestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
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
        onKeyPress={handleKeyPress}
        placeholder="Ask ContextDrop about the repository..."
        disabled={mutation.isPending}
        className="
          flex-1
          bg-panel/70
          backdrop-blur-xl
          border
          border-border
          rounded-2xl
          px-5
          py-3
          outline-none
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      />

      <button
        onClick={handleSubmit}
        disabled={mutation.isPending || !question.trim()}
        className="
            px-5
            py-3

            bg-primary
            hover:bg-accent
            text-cream

            rounded-2xl

            font-medium

            shadow-2xl

            hover:scale-105

            transition-all
            duration-300

            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
        "
      >
        {mutation.isPending ? (
          <div className="animate-spin">⏳</div>
        ) : (
          <Send size={20} />
        )}
      </button>
    </div>
  );
}