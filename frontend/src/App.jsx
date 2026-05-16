import Sidebar from "./components/dashboard/Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <DashboardLayout>

      <Sidebar />

      <DashboardPage />

    </DashboardLayout>
  );
}