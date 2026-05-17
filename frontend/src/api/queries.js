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

        description: `
# Architecture Insight

The repository uses:

- React frontend
- Zustand global state
- React Query orchestration
- Tailwind dashboard UI

## Recommendation

Refactor API orchestration into modular services.

\`\`\`js
export async function analyzeRepo() {
  return insights;
}
\`\`\`
`,
      },

      {
        title: "Risk Detection",

        tag: "risk",

        description: `
# Risk Detection

Potential scalability concerns detected.

## Findings

- API retries missing
- No request cancellation
- Missing optimistic updates

\`\`\`js
const mutation = useMutation({
  mutationFn: askRepositoryQuestion,
});
\`\`\`
`,
      },

      {
        title: "Developer Onboarding",

        tag: "developer",

        description: `
# Developer Onboarding

Suggested onboarding sequence:

1. Review frontend architecture
2. Understand Zustand store
3. Learn API orchestration
4. Study dashboard layout system

## Important Files

- \`DashboardPage.jsx\`
- \`useAppStore.js\`
- \`queries.js\`
`,
      },
    ],
  };
}