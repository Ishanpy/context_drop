import CapsuleCard from "./CapsuleCard";

import LoadingSkeleton from "../common/LoadingSkeleton";

import useAppStore from "../../stores/useAppStore";

export default function CapsuleGrid() {
  const {
    responses,
    isLoading,
  } = useAppStore();

  if (isLoading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mt-10
        "
      >
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <LoadingSkeleton
              key={index}
            />
          )
        )}
      </div>
    );
  }

  if (!responses.length) {
    return (
      <div
        className="
          mt-10
          bg-panel
          border
          border-border
          rounded-3xl
          p-10
          text-center
        "
      >
        <h2 className="text-2xl font-semibold">
          Ask your first repository question
        </h2>

        <p
          className="
            text-gray-400
            mt-4
          "
        >
          ContextDrop will generate
          AI-powered repository insights.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-10
      "
    >
      {responses.map((response) => (
        <CapsuleCard
          key={response.title}
          title={response.title}
          tag={response.tag}
          description={
            response.description
          }
        />
      ))}
    </div>
  );
}