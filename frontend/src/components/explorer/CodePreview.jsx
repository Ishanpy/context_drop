import Editor from "@monaco-editor/react";

import useAppStore from "../../stores/useAppStore";

import { fileContents } from "../../mock/fileContents";

export default function CodePreview() {

  const { activeFile } =
    useAppStore();

  const content =
    fileContents[activeFile] ||
    "// Select a file";

  return (
    <div
      className="
        bg-panel/70
        backdrop-blur-xl

        border
        border-border

        rounded-3xl

        overflow-hidden

        shadow-2xl

        h-[420px]
      "
    >

      <div
        className="
          px-6
          py-4

          border-b
          border-border

          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            font-semibold
            text-lg
          "
        >
          {activeFile || "Code Preview"}
        </h2>

      </div>

      <Editor
        height="100%"

        defaultLanguage="javascript"

        theme="vs-dark"

        value={content}

        options={{
          minimap: {
            enabled: false,
          },

          fontSize: 14,

          readOnly: true,

          scrollBeyondLastLine: false,
        }}
      />

    </div>
  );
}