import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { handleAPIError } from "../../lib/errorHandler";
import toast from "react-hot-toast";
import { Database, GitBranch, CheckCircle2, Clock, FileCode } from "lucide-react";

export default function RepoIngestForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [includePatterns, setIncludePatterns] = useState("*.js, *.jsx, *.ts, *.tsx, *.py");
  const [excludePatterns, setExcludePatterns] = useState("node_modules/**, dist/**, build/**");
  const [result, setResult] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await apiClient.ingestRepo(data);
    },

    onSuccess: (data) => {
      setResult(data);
      toast.success("Repository ingested successfully");
    },

    onError: (error) => {
      const errorMessage = handleAPIError(error);
      toast.error(errorMessage);
      console.error("Ingest Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim() || !branch.trim()) {
      toast.error("Please fill in repository URL and branch");
      return;
    }

    const include = includePatterns
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const exclude = excludePatterns
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    mutation.mutate({
      repo_url: repoUrl,
      branch: branch,
      include_patterns: include.length > 0 ? include : undefined,
      exclude_patterns: exclude.length > 0 ? exclude : undefined,
    });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
        <Database size={24} className="text-green-400" />
        <h2 className="text-2xl font-semibold">Repository Ingestion</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Repository URL
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
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
            Branch
          </label>
          <div className="relative">
            <GitBranch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ice/60" />
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              disabled={mutation.isPending}
              className="
                w-full
                bg-panel/50
                border
                border-border
                rounded-xl
                pl-10
                pr-4
                py-2
                outline-none
                disabled:opacity-50
              "
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Include Patterns (comma-separated)
          </label>
          <input
            type="text"
            value={includePatterns}
            onChange={(e) => setIncludePatterns(e.target.value)}
            placeholder="*.js, *.py, *.ts"
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
          <p className="text-xs text-ice/60 mt-1">
            File patterns to include (e.g., *.js, *.py)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Exclude Patterns (comma-separated)
          </label>
          <input
            type="text"
            value={excludePatterns}
            onChange={(e) => setExcludePatterns(e.target.value)}
            placeholder="node_modules/**, dist/**"
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
          <p className="text-xs text-ice/60 mt-1">
            Directories/files to exclude (e.g., node_modules/**)
          </p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || !repoUrl.trim() || !branch.trim()}
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
          {mutation.isPending ? "Ingesting Repository..." : "Ingest Repository"}
        </button>

        {mutation.isPending && (
          <div className="text-center text-sm text-ice/70">
            <Clock className="inline-block animate-spin mr-2" size={16} />
            This may take 1-2 minutes for large repositories...
          </div>
        )}
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              <span className="font-semibold">Ingestion Complete</span>
            </div>
            <span className="text-sm text-ice/60">
              ID: {result.ingestion_id}
            </span>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-border rounded-xl p-4 text-center">
              <FileCode size={24} className="mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">{result.files_processed}</p>
              <p className="text-xs text-ice/60">Files Processed</p>
            </div>
            <div className="border border-border rounded-xl p-4 text-center">
              <Database size={24} className="mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">{result.chunks_created}</p>
              <p className="text-xs text-ice/60">Chunks Created</p>
            </div>
            <div className="border border-border rounded-xl p-4 text-center">
              <Clock size={24} className="mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold">{result.processing_time.toFixed(1)}s</p>
              <p className="text-xs text-ice/60">Processing Time</p>
            </div>
            <div className="border border-border rounded-xl p-4 text-center">
              <FileCode size={24} className="mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold">{result.summary?.total_lines?.toLocaleString() || 0}</p>
              <p className="text-xs text-ice/60">Total Lines</p>
            </div>
          </div>

          {/* Language Statistics */}
          {result.summary?.languages && Object.keys(result.summary.languages).length > 0 && (
            <div className="border border-border rounded-xl p-4">
              <h4 className="font-semibold mb-3">Language Distribution</h4>
              <div className="space-y-2">
                {Object.entries(result.summary.languages)
                  .sort(([, a], [, b]) => b - a)
                  .map(([language, lines]) => {
                    const total = Object.values(result.summary.languages).reduce((a, b) => a + b, 0);
                    const percentage = ((lines / total) * 100).toFixed(1);
                    return (
                      <div key={language}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">{language}</span>
                          <span className="text-ice/60">{lines.toLocaleString()} lines ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-panel/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Success Message */}
          <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-4 text-center">
            <CheckCircle2 className="inline-block mr-2 text-green-400" size={20} />
            <span className="text-sm text-green-400">
              Repository successfully indexed and ready for analysis
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
