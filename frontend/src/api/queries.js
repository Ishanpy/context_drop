export async function askRepositoryQuestion(
  payload
) {
  console.log(payload);

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  return {
    responses: [
      {
        title: "Architecture Insight",

        tag: "system",

        description:
          "Repository uses modular React frontend with centralized AI orchestration.",
      },

      {
        title: "Risk Detection",

        tag: "risk",

        description:
          "Potential scalability issue detected in ingestion workflow.",
      },

      {
        title: "Developer Onboarding",

        tag: "developer",

        description:
          "Recommended onboarding begins from repository parser service.",
      },
    ],
  };
}