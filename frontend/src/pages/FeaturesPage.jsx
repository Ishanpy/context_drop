import { useState } from "react";
import MobileTopbar from "../components/dashboard/MobileTopbar";
import BusFactorDashboard from "../components/dashboard/BusFactorDashboard";
import TicketAnalyzer from "../components/ticket/TicketAnalyzer";
import DepartureBriefGenerator from "../components/brief/DepartureBriefGenerator";
import PRBriefAnalyzer from "../components/brief/PRBriefAnalyzer";
import RepoIngestForm from "../components/ingest/RepoIngestForm";
import HealthMonitor from "../components/common/HealthMonitor";

const FEATURES = [
  { id: 'bus-factor', name: 'Bus Factor Analysis', icon: '📊' },
  { id: 'ticket', name: 'Ticket Intelligence', icon: '🎫' },
  { id: 'departure', name: 'Departure Brief', icon: '👋' },
  { id: 'pr-brief', name: 'PR Analysis', icon: '🔀' },
  { id: 'ingest', name: 'Repository Ingest', icon: '📥' },
];

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState('bus-factor');

  const renderFeature = () => {
    switch (activeFeature) {
      case 'bus-factor':
        return <BusFactorDashboard />;
      case 'ticket':
        return <TicketAnalyzer />;
      case 'departure':
        return <DepartureBriefGenerator />;
      case 'pr-brief':
        return <PRBriefAnalyzer />;
      case 'ingest':
        return <RepoIngestForm />;
      default:
        return <BusFactorDashboard />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020617] overflow-x-hidden">
      <main className="relative z-10 w-full min-h-screen overflow-y-auto overflow-x-hidden">
        <MobileTopbar />

        <div className="w-full pl-4 sm:pl-6 lg:pl-10 pr-4 sm:pr-6 lg:pr-10 py-10">
          {/* Header */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-cream">
                AI-Powered Features
              </h1>
              <HealthMonitor />
            </div>
            <p className="text-ice/70 text-base lg:text-lg leading-relaxed max-w-3xl">
              Explore powerful AI-driven repository analysis tools connected to the production backend.
            </p>
          </section>

          {/* Feature Tabs */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-3">
              {FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`
                    px-4 py-2 rounded-xl font-medium transition-all
                    ${activeFeature === feature.id
                      ? 'bg-primary text-cream shadow-lg'
                      : 'bg-panel/70 text-ice/70 hover:bg-panel border border-border'
                    }
                  `}
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.name}
                </button>
              ))}
            </div>
          </section>

          {/* Active Feature */}
          <section>
            {renderFeature()}
          </section>
        </div>
      </main>
    </div>
  );
}

// Made with Bob
