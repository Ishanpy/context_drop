import Sidebar from "./components/dashboard/Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import CommandPalette from "./components/dashboard/CommandPalette";

export default function App() {
  return (
    <DashboardLayout>

     <CommandPalette />

      <Sidebar />

      <DashboardPage />

    </DashboardLayout>

    
  );
}