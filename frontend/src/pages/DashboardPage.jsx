import LensSwitcher from "../components/dashboard/LensSwitcher";

import QuestionBar from "../components/dashboard/QuestionBar";

import CapsuleGrid from "../components/capsule/CapsuleGrid";

import RepoAnalytics from "../components/dashboard/RepoAnalytics";

import ArchitectureHeatmap from "../components/dashboard/ArchitectureHeatmap";

import TicketPanel from "../components/ticket/TicketPanel";

import MobileTopbar from "../components/dashboard/MobileTopbar";

import RepoExplorer from "../components/explorer/RepoExplorer";

import CodePreview from "../components/explorer/CodePreview";

import ChatThread from "../components/dashboard/ChatThread";

export default function DashboardPage() {

  return (

    <main
      className="
        flex-1
        h-screen
        overflow-y-auto
      "
    >

      <MobileTopbar />

      <div
        className="
          max-w-7xl
          mx-auto

          px-6
          lg:px-10

          py-10
        "
      >

        {/* HERO */}

        <section>

          <h1
            className="
              text-4xl
              lg:text-6xl

              font-bold

              leading-tight

              max-w-5xl
            "
          >
            AI Repository Intelligence
          </h1>

          <p
            className="
              mt-6

              text-gray-400

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
              bg-panel/80
              backdrop-blur-xl

              border
              border-white/5

              rounded-3xl

              p-6

              shadow-glow

              space-y-6
            "
          >

            <ChatThread />

            <QuestionBar />

          </div>

        </section>

        {/* CAPSULE GRID */}

        <section className="mt-12">

          <CapsuleGrid />

        </section>

        {/* ANALYTICS */}

        <section className="mt-12">

          <RepoAnalytics />

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

          <TicketPanel />

          <RepoExplorer />

          <CodePreview />

        </section>

      </div>

    </main>

  );
}