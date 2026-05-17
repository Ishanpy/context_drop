import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { AlertTriangle, Users, TrendingUp } from "lucide-react";

export default function BusFactorDashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['busFactor'],
    queryFn: () => apiClient.getBusFactor(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false, // Don't retry on 422 errors
    enabled: false, // Don't fetch automatically - user must click "Load Analysis"
  });

  if (isLoading) {
    return (
      <div className="bg-panel/70 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6">Bus Factor Analysis</h2>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    const errorMessage = handleAPIError(error);
    const is422Error = error?.statusCode === 422 || errorMessage.includes('422') || errorMessage.includes('Validation');
    
    return (
      <div className="bg-panel/70 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6">Bus Factor Analysis</h2>
        <div className="text-center py-8">
          <AlertTriangle className="mx-auto mb-4 text-orange-400" size={48} />
          {is422Error ? (
            <>
              <p className="text-ice/70 mb-2">Repository Not Ingested</p>
              <p className="text-sm text-ice/60 mb-4">
                Please ingest a repository first using the Repository Ingest feature.
                <br />
                Bus factor analysis requires an indexed codebase.
              </p>
            </>
          ) : (
            <>
              <p className="text-ice/70 mb-2">{errorMessage}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-primary hover:bg-accent rounded-xl transition-colors"
              >
                Retry
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-panel/70 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6">Bus Factor Analysis</h2>
        <div className="text-center py-8">
          <TrendingUp className="mx-auto mb-4 text-blue-400" size={48} />
          <p className="text-ice/70 mb-2">Ready to Analyze Architecture</p>
          <p className="text-sm text-ice/60 mb-4">
            Click below to load bus factor analysis.
            <br />
            Note: Requires a repository to be ingested first.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-primary hover:bg-accent text-cream rounded-xl font-medium transition-all hover:scale-105"
          >
            Load Bus Factor Analysis
          </button>
        </div>
      </div>
    );
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-ice/70 bg-ice/10';
    }
  };

  return (
    <div className="bg-panel/70 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Bus Factor Analysis</h2>
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-400" />
          <span className="text-2xl font-bold text-blue-400">
            {data.bus_factor_score?.toFixed(1)}
          </span>
        </div>
      </div>

      {/* High Risk Components */}
      {data.high_risk_components && data.high_risk_components.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-400" />
            <h3 className="font-semibold">High Risk Components</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.high_risk_components.map((component, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-400/10 text-red-400 rounded-full text-sm"
              >
                {component}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Architecture Components */}
      {data.architecture_map?.components && data.architecture_map.components.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-blue-400" />
            <h3 className="font-semibold">Components</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.architecture_map.components.map((component, idx) => (
              <div
                key={idx}
                className="border border-border rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{component.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(component.risk_level)}`}>
                    {component.risk_level}
                  </span>
                </div>
                <p className="text-xs text-ice/60 mb-2">Type: {component.type}</p>
                <div className="flex items-center gap-2 text-xs text-ice/70">
                  <Users size={14} />
                  <span>{component.maintainers} maintainer{component.maintainers !== 1 ? 's' : ''}</span>
                </div>
                {component.dependencies && component.dependencies.length > 0 && (
                  <div className="mt-2 text-xs text-ice/60">
                    Dependencies: {component.dependencies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {data.recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-ice/70"
              >
                <span className="text-green-400 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Made with Bob
