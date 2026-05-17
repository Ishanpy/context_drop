import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";
import toast from "react-hot-toast";
import { UserMinus, Briefcase, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function DepartureBriefGenerator() {
  const [developerName, setDeveloperName] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [result, setResult] = useState(null);

  const mutation = useMutation({
    mutationFn: async ({ developer_name, areas_of_responsibility }) => {
      return await apiClient.getDepartureBrief(developer_name, areas_of_responsibility);
    },

    onSuccess: (data) => {
      setResult(data);
      toast.success("Departure brief generated successfully");
    },

    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      console.error("Departure Brief Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!developerName.trim() || !responsibilities.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const areas = responsibilities
      .split(',')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    if (areas.length === 0) {
      toast.error("Please enter at least one area of responsibility");
      return;
    }

    mutation.mutate({
      developer_name: developerName,
      areas_of_responsibility: areas,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-yellow-400';
      case 'not_started': return 'text-ice/60';
      default: return 'text-ice/70';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} />;
      case 'in_progress': return <Clock size={16} />;
      case 'not_started': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div
      className="
        bg-panel/70
        backdrop-blur-xl
        border
        border-border
        rounded-3xl
        p-6
        shadow-2xl
      "
    >
      <div className="flex items-center gap-2 mb-6">
        <UserMinus size={24} className="text-blue-400" />
        <h2 className="text-2xl font-semibold">Departure Brief Generator</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Developer Name
          </label>
          <input
            type="text"
            value={developerName}
            onChange={(e) => setDeveloperName(e.target.value)}
            placeholder="e.g., John Doe"
            disabled={mutation.isPending}
            className="
              w-full
              bg-panel/50
              border
              border-border
              rounded-xl
              px-4
              py-2
              outline-none
              disabled:opacity-50
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Areas of Responsibility (comma-separated)
          </label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="e.g., Authentication, API Gateway, Database"
            rows={3}
            disabled={mutation.isPending}
            className="
              w-full
              bg-panel/50
              border
              border-border
              rounded-xl
              px-4
              py-2
              outline-none
              resize-none
              disabled:opacity-50
            "
          />
          <p className="text-xs text-ice/60 mt-1">
            Separate multiple areas with commas
          </p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || !developerName.trim() || !responsibilities.trim()}
          className="
            w-full
            bg-primary
            hover:bg-accent
            text-cream
            rounded-xl
            px-4
            py-2
            font-medium
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {mutation.isPending ? "Generating..." : "Generate Departure Brief"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Header */}
          <div className="border-b border-border pb-4">
            <h3 className="text-xl font-semibold">{result.developer_name}</h3>
            <p className="text-sm text-ice/60 mt-1">
              Generated: {new Date(result.generated_at).toLocaleString()}
            </p>
          </div>

          {/* Key Responsibilities */}
          {result.departure_brief?.key_responsibilities && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <Briefcase size={18} className="text-blue-400 mt-1" />
                <h4 className="font-semibold">Key Responsibilities</h4>
              </div>
              <ul className="space-y-2">
                {result.departure_brief.key_responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Critical Knowledge */}
          {result.departure_brief?.critical_knowledge && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle size={18} className="text-orange-400 mt-1" />
                <h4 className="font-semibold">Critical Knowledge</h4>
              </div>
              <ul className="space-y-2">
                {result.departure_brief.critical_knowledge.map((knowledge, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{knowledge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ongoing Tasks */}
          {result.departure_brief?.ongoing_tasks && result.departure_brief.ongoing_tasks.length > 0 && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <Clock size={18} className="text-yellow-400 mt-1" />
                <h4 className="font-semibold">Ongoing Tasks</h4>
              </div>
              <div className="space-y-3">
                {result.departure_brief.ongoing_tasks.map((task, idx) => (
                  <div key={idx} className="bg-panel/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={getStatusColor(task.status)}>
                        {getStatusIcon(task.status)}
                      </span>
                      <span className="font-medium text-sm">{task.task}</span>
                    </div>
                    <p className="text-xs text-ice/60 capitalize">
                      Status: {task.status.replace('_', ' ')}
                    </p>
                    {task.files && task.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-ice/60 mb-1">Related files:</p>
                        <div className="flex flex-wrap gap-1">
                          {task.files.map((file, fileIdx) => (
                            <span
                              key={fileIdx}
                              className="text-xs font-mono bg-panel/70 px-2 py-1 rounded"
                            >
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Handoff Recommendations */}
          {result.departure_brief?.handoff_recommendations && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <CheckCircle2 size={18} className="text-green-400 mt-1" />
                <h4 className="font-semibold">Handoff Recommendations</h4>
              </div>
              <ul className="space-y-2">
                {result.departure_brief.handoff_recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Made with Bob
