import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <DashboardLayout>

      <div className="p-10">

        <h1 className="text-5xl font-bold text-blue">
          ContextDrop
        </h1>

        <p className="mt-4 text-gray-400">
          AI-powered repository intelligence
        </p>

      </div>

    </DashboardLayout>
  );
}