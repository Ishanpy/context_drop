import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";
import toast from "react-hot-toast";
import { GitPullRequest, Shield, TrendingUp, AlertTriangle, FileCode } from "lucide-react";

export default function PRBriefAnalyzer() {
  const [prUrl, setPrUrl] = useState("");
  const [prDescription, setPrDescription] = useState("");
  const [changedFiles, setChangedFiles] = useState("");
  const [result, setResult] = useState(null);

  const mutation = useMutation({
    mutationFn: async ({ pr_url, pr_description, changed_files }) => {
      return await apiClient.getPRBrief(pr_url, pr_description, changed_files);
    },

    onSuccess: (data) => {
      setResult(data);
      toast.success("PR analysis complete");
    },

    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      console.error("PR Brief Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!prUrl.trim() || !prDescription.trim() || !changedFiles.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const files = changedFiles
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    if (files.length === 0) {
      toast.error("Please enter at least one changed file");
      return;
    }

    mutation.mutate({
      pr_url: prUrl,
      pr_description: prDescription,
      changed_files: files,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-ice/70 bg-ice/10';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-ice/70';
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
      <div className="flex items-center gap-2 mb-6">
        <GitPullRequest size={24} className="text-purple-400" />
        <h2 className="text-2xl font-semibold">PR Brief Analyzer</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Pull Request URL
          </label>
          <input
            type="url"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            placeholder="https://github.com/org/repo/pull/123"
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
            PR Description
          </label>
          <textarea
            value={prDescription}
            onChange={(e) => setPrDescription(e.target.value)}
            placeholder="Brief description of the changes..."
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

        <div>
          <label className="block text-sm font-medium mb-2">
            Changed Files (comma-separated)
          </label>
          <textarea
            value={changedFiles}
            onChange={(e) => setChangedFiles(e.target.value)}
            placeholder="src/app.js, src/utils.js, tests/app.test.js"
            rows={2}
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
            Separate file paths with commas
          </p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || !prUrl.trim() || !prDescription.trim() || !changedFiles.trim()}
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
          {mutation.isPending ? "Analyzing..." : "Analyze PR"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <a
              href={result.pr_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              {result.pr_url}
            </a>
            <span className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(result.review_priority)}`}>
              {result.review_priority} priority
            </span>
          </div>

          {/* Summary */}
          <div className="border border-border rounded-xl p-4">
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-sm text-ice/70">{result.summary}</p>
          </div>

          {/* Impact Analysis */}
          {result.impact_analysis && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <TrendingUp size={18} className="text-blue-400 mt-1" />
                <h4 className="font-semibold">Impact Analysis</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ice/70">Performance Impact:</span>
                  <span className={`capitalize ${getImpactColor(result.impact_analysis.performance_impact)}`}>
                    {result.impact_analysis.performance_impact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ice/70">Breaking Changes:</span>
                  <span className={result.impact_analysis.breaking_changes ? 'text-red-400' : 'text-green-400'}>
                    {result.impact_analysis.breaking_changes ? 'Yes' : 'No'}
                  </span>
                </div>
                {result.impact_analysis.affected_components && result.impact_analysis.affected_components.length > 0 && (
                  <div>
                    <p className="text-ice/70 mb-2">Affected Components:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.impact_analysis.affected_components.map((comp, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Code Quality */}
          {result.code_quality && (
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileCode size={18} className="text-green-400" />
                  <h4 className="font-semibold">Code Quality</h4>
                </div>
                <span className="text-2xl font-bold text-green-400">
                  {result.code_quality.score}/10
                </span>
              </div>
              {result.code_quality.issues && result.code_quality.issues.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Issues:</p>
                  <ul className="space-y-1">
                    {result.code_quality.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.code_quality.suggestions && result.code_quality.suggestions.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Suggestions:</p>
                  <ul className="space-y-1">
                    {result.code_quality.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Security Concerns */}
          {result.security_concerns && result.security_concerns.length > 0 && (
            <div className="border border-red-400/20 bg-red-400/5 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <Shield size={18} className="text-red-400 mt-1" />
                <h4 className="font-semibold text-red-400">Security Concerns</h4>
              </div>
              <ul className="space-y-2">
                {result.security_concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ice/70">
                    <AlertTriangle size={16} className="text-red-400 mt-1" />
                    <span>{concern}</span>
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
