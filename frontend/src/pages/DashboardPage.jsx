import LensSwitcher from "../components/dashboard/LensSwitcher";
import QuestionBar from "../components/dashboard/QuestionBar";
import CapsuleGrid from "../components/capsule/CapsuleGrid";
import RepoAnalytics from "../components/dashboard/RepoAnalytics";
import ArchitectureHeatmap from "../components/dashboard/ArchitectureHeatmap";
import TicketAnalyzer from "../components/ticket/TicketAnalyzer";
import MobileTopbar from "../components/dashboard/MobileTopbar";
import RepoExplorer from "../components/explorer/RepoExplorer";
import CodePreview from "../components/explorer/CodePreview";
import ChatThread from "../components/dashboard/ChatThread";
import ErrorState from "../components/feedback/ErrorState";
import useAppStore from "../stores/useAppStore";
import ArchitectureGraph from "../components/dashboard/ArchitectureGraph";
import BusFactorDashboard from "../components/dashboard/BusFactorDashboard";
import HealthMonitor from "../components/common/HealthMonitor";

export default function DashboardPage() {

  const { error } = useAppStore();

  return (

    <div
      className="
        relative
        w-full
        min-h-screen
        bg-[#020617]
        overflow-x-hidden
      "
    >

      {/* MAIN CONTENT */}

      <main
        className="
          relative
          z-10
          w-full
          min-h-screen
          overflow-y-auto
          overflow-x-hidden
        "
      >

        <MobileTopbar />

        <div
          className="
            w-full

            pl-4
            sm:pl-6
            lg:pl-10

            pr-4
            sm:pr-6
            lg:pr-10

            py-10
          "
        >

          {/* HERO */}

          <section>

            <div className="flex items-start justify-between mb-4">
              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-6xl

                  font-black
                  tracking-tight
                  text-cream

                  leading-tight

                  max-w-5xl
                "
              >
                AI Repository Intelligence
              </h1>
              
              <HealthMonitor />
            </div>

            <p
              className="
                mt-6

                text-ice/70

                text-base
                lg:text-lg

                leading-relaxed

                max-w-3xl
              "
            >
              Understand repositories,
              architecture, onboarding paths,
              risks, and engineering workflows
              using AI-powered repository analysis.
            </p>

          </section>

          {/* LENS SWITCHER */}

          <section className="mt-10">

            <LensSwitcher />

          </section>

          {/* AI CHAT SYSTEM */}

          <section className="mt-8">

            <div
              className="
                bg-panel/70
                backdrop-blur-xl

                border
                border-border

                rounded-3xl

                p-6

                shadow-2xl

                space-y-6
              "
            >

              <ChatThread />

              <QuestionBar />

            </div>

          </section>

          {/* ERROR STATE */}

          {error && (

            <section className="mt-12">

              <ErrorState
                title="Repository Analysis Failed"
                description={error}
              />

            </section>

          )}

          {/* CAPSULE GRID */}

          <section className="mt-12">

            <CapsuleGrid />

          </section>

          {/* ANALYTICS */}

          <section className="mt-12">

            <RepoAnalytics />

          </section>

          {/* ARCHITECTURE GRAPH */}

          <section className="mt-12">

            <ArchitectureGraph />

          </section>

          {/* BUS FACTOR DASHBOARD */}

          <section className="mt-12">

            <BusFactorDashboard />

          </section>

          {/* LOWER DASHBOARD */}

          <section
            className="
              grid
              grid-cols-1
              xl:grid-cols-2

              gap-8

              mt-12
            "
          >

            <ArchitectureHeatmap />

            <TicketAnalyzer />

            <RepoExplorer />

            <CodePreview />

          </section>

        </div>

      </main>

    </div>

  );
}