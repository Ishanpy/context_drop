import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";

export default function HealthMonitor() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.healthCheck(),
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-ice/60">
        <Activity size={16} className="animate-pulse" />
        <span>Checking backend...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400">
        <AlertCircle size={16} />
        <span>Backend offline</span>
      </div>
    );
  }

  if (data?.status === 'healthy' || data?.status === 'ok') {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <CheckCircle2 size={16} />
        <span>Backend online</span>
      </div>
    );
  }

  return null;
}

// Made with Bob
