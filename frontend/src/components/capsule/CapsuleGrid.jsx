import CapsuleCard from "./CapsuleCard";
import LoadingSkeleton from "../common/LoadingSkeleton";
import useAppStore from "../../stores/useAppStore";
import TypingIndicator from "../common/TypingIndicator";

export default function CapsuleGrid() {
  const {
    messages,
    isStreaming,
  } = useAppStore();

  // Get the latest assistant message with capsule data
  const latestCapsuleMessage = messages
    .filter(m => m.role === "assistant" && m.capsuleData)
    .pop();

  const capsuleData = latestCapsuleMessage?.capsuleData;

  if (isStreaming) {

    return (

      <div
        className="
          mt-10

          bg-panel/70
          backdrop-blur-xl

          border
          border-border

          rounded-3xl

          p-8

          shadow-2xl
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          AI is analyzing repository...
        </h2>

        <p
          className="
            text-ice/70
            mt-3
          "
        >
          Generating contextual engineering insights.
        </p>

        <TypingIndicator />

      </div>

    );

  }

  if (!messages.length) {

    return (

      <div
        className="
          mt-10

          bg-panel/70
          backdrop-blur-xl

          border
          border-border

          rounded-3xl

          p-10

          shadow-2xl

          text-center
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Ask your first repository question
        </h2>

        <p
          className="
            text-ice/70
            mt-4
          "
        >
          ContextDrop will generate
          AI-powered repository insights.
        </p>

      </div>

    );

  }

  // If we have capsule data, show detailed insights
  if (capsuleData) {
    return (
      <div className="space-y-6 mt-10">
        {/* Main Answer */}
        <CapsuleCard
          title="AI Analysis"
          tag="answer"
          description={capsuleData.answer}
        />

        {/* Context Files */}
        {capsuleData.context_files && capsuleData.context_files.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Context Files ({capsuleData.context_files.length})
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {capsuleData.context_files.map((file, idx) => (
                <CapsuleCard
                  key={idx}
                  title={file.path}
                  tag={`${(file.relevance_score * 100).toFixed(0)}% relevant`}
                  description={`\`\`\`\n${file.content.substring(0, 500)}${file.content.length > 500 ? '...' : ''}\n\`\`\``}
                />
              ))}
            </div>
          </div>
        )}

        {/* Architecture Insights */}
        {capsuleData.architecture_insights && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Architecture Insights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CapsuleCard
                title="Key Components"
                tag="architecture"
                description={capsuleData.architecture_insights.key_components?.join(', ') || 'N/A'}
              />
              <CapsuleCard
                title="Data Flow"
                tag="architecture"
                description={capsuleData.architecture_insights.data_flow || 'N/A'}
              />
              <CapsuleCard
                title="Dependencies"
                tag="architecture"
                description={capsuleData.architecture_insights.dependencies?.join(', ') || 'N/A'}
              />
            </div>
          </div>
        )}

        {/* Processing Time */}
        <div className="text-center text-ice/60 text-sm">
          Processing time: {capsuleData.processing_time?.toFixed(2)}s
        </div>
      </div>
    );
  }

  return null;
}