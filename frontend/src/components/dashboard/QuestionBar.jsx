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

  const mutation = useMutation({
    mutationFn: askRepositoryQuestion,

    onMutate: () => {
      setIsLoading(true);
    },

    onSuccess: (data) => {
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
    },
  });

  function handleSubmit() {
    if (!question.trim()) return;

    mutation.mutate({
      question,
      lens: selectedLens,
    });
  }

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
          bg-blue
          px-5 py-3
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