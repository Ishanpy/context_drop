import { useEffect, useState } from "react";

import CapsuleCard from "./CapsuleCard";
import LoadingSkeleton from "../common/LoadingSkeleton";

const capsules = [
  {
    title: "Architecture Overview",

    tag: "system",

    description:
      "Repository follows a modular architecture using React frontend, FastAPI backend, and AI summarization pipelines.",
  },

  {
    title: "Risk Detection",

    tag: "risk",

    description:
      "Potential coupling detected between repository parsing and summarization pipelines.",
  },

  {
    title: "Suggested Refactor",

    tag: "improvement",

    description:
      "Separate AI orchestration layer from ingestion services to improve maintainability.",
  },

  {
    title: "Onboarding Insight",

    tag: "developer",

    description:
      "New developers should begin from API orchestration and repository ingestion flow.",
  },
];

export default function CapsuleGrid() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
      {loading
        ? Array.from({ length: 4 }).map(
            (_, index) => (
              <LoadingSkeleton
                key={index}
              />
            )
          )
        : capsules.map((capsule) => (
            <CapsuleCard
              key={capsule.title}
              title={capsule.title}
              tag={capsule.tag}
              description={
                capsule.description
              }
            />
          ))}
    </div>
  );
}