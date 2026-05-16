import LensSwitcher from "../components/dashboard/LensSwitcher";
import QuestionBar from "../components/dashboard/QuestionBar";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-10">

      <div>
        <h1
          className="
            text-5xl
            font-bold
          "
        >
          AI Repository Intelligence
        </h1>

        <p
          className="
            text-gray-400
            mt-4
            max-w-2xl
          "
        >
          Understand repositories,
          architecture, risks,
          onboarding paths,
          and engineering insights.
        </p>
      </div>

      <div className="mt-10">
        <LensSwitcher />
      </div>

      <QuestionBar />

    </div>
  );
}