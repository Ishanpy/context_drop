import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";
import toast from "react-hot-toast";
import { AlertCircle, CheckCircle2, Clock, FileCode } from "lucide-react";

export default function TicketAnalyzer() {
  const [ticketId, setTicketId] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const mutation = useMutation({
    mutationFn: async ({ ticket_id, ticket_description }) => {
      return await apiClient.analyzeTicket(ticket_description, ticket_id);
    },

    onSuccess: (data) => {
      setResult(data);
      toast.success("Ticket analyzed successfully");
    },

    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      console.error("Ticket Analysis Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!ticketId.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    mutation.mutate({
      ticket_id: ticketId,
      ticket_description: description,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-ice/70';
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
      <h2 className="text-2xl font-semibold mb-6">
        Ticket Intelligence
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ticket ID
          </label>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="e.g., TICKET-123"
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
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
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
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || !ticketId.trim() || !description.trim()}
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
          {mutation.isPending ? "Analyzing..." : "Analyze Ticket"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Priority Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-ice/70">Priority:</span>
            <span className={`text-sm uppercase font-semibold ${getPriorityColor(result.priority)}`}>
              {result.priority}
            </span>
          </div>

          {/* Analysis */}
          <div className="border border-border rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle size={18} className="text-blue-400 mt-1" />
              <h3 className="font-semibold">Analysis</h3>
            </div>
            <p className="text-ice/70 text-sm">{result.analysis}</p>
          </div>

          {/* Root Cause */}
          <div className="border border-border rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle size={18} className="text-red-400 mt-1" />
              <h3 className="font-semibold">Root Cause</h3>
            </div>
            <p className="text-ice/70 text-sm">{result.root_cause}</p>
          </div>

          {/* Suggested Fix */}
          <div className="border border-border rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle2 size={18} className="text-green-400 mt-1" />
              <h3 className="font-semibold">Suggested Fix</h3>
            </div>
            <p className="text-ice/70 text-sm">{result.suggested_fix}</p>
          </div>

          {/* Estimated Fix Time */}
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-ice/70" />
            <span className="text-ice/70">Estimated fix time:</span>
            <span className="font-medium">{result.estimated_fix_time}</span>
          </div>

          {/* Relevant Files */}
          {result.relevant_files && result.relevant_files.length > 0 && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <FileCode size={18} className="text-purple-400 mt-1" />
                <h3 className="font-semibold">Relevant Files</h3>
              </div>
              <div className="space-y-2">
                {result.relevant_files.map((file, idx) => (
                  <div key={idx} className="bg-panel/50 rounded-lg p-3">
                    <p className="text-sm font-mono text-blue-400 mb-1">
                      {file.path}
                    </p>
                    <p className="text-xs text-ice/60 mb-2">
                      Lines: {file.line_numbers.join(', ')}
                    </p>
                    <pre className="text-xs text-ice/70 overflow-x-auto">
                      {file.snippet}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Made with Bob
