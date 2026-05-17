export const fileContents = {
  "Sidebar.jsx": `
import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside>
      Sidebar Component
    </aside>
  );
}
`,

  "DashboardPage.jsx": `
import RepoExplorer from "../explorer/RepoExplorer";

export default function DashboardPage() {
  return (
    <main>
      Dashboard
    </main>
  );
}
`,

  "useAppStore.js": `
import { create } from "zustand";

const useAppStore = create((set) => ({
  responses: [],
}));

export default useAppStore;
`,

  "QuestionBar.jsx": `
export default function QuestionBar() {
  return (
    <div>
      Question Input
    </div>
  );
}
`,

  "README.md": `
# ContextDrop

AI-powered repository intelligence system.
`,

  "package.json": `
{
  "name": "context_drop",
  "version": "1.0.0"
}
`,
};