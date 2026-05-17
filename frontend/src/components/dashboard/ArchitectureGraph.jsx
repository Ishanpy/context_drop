import {
  Background,
  Controls,
  MiniMap,
} from "reactflow";

import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

const nodes = [

  {
    id: "frontend",

    position: {
      x: 100,
      y: 100,
    },

    data: {
      label: "Frontend UI",
    },

    style: {
      background: "#111827",
      color: "white",
      border:
        "1px solid #3b82f6",
      borderRadius: 16,
      padding: 10,
    },
  },

  {
    id: "backend",

    position: {
      x: 450,
      y: 100,
    },

    data: {
      label: "Backend API",
    },

    style: {
      background: "#111827",
      color: "white",
      border:
        "1px solid #10b981",
      borderRadius: 16,
      padding: 10,
    },
  },

  {
    id: "vector",

    position: {
      x: 800,
      y: 100,
    },

    data: {
      label: "Vector Database",
    },

    style: {
      background: "#111827",
      color: "white",
      border:
        "1px solid #f59e0b",
      borderRadius: 16,
      padding: 10,
    },
  },

  {
    id: "ai",

    position: {
      x: 450,
      y: 300,
    },

    data: {
      label: "AI Analysis Engine",
    },

    style: {
      background: "#111827",
      color: "white",
      border:
        "1px solid #8b5cf6",
      borderRadius: 16,
      padding: 10,
    },
  },

];

const edges = [

  {
    id: "e1",

    source: "frontend",

    target: "backend",

    animated: true,
  },

  {
    id: "e2",

    source: "backend",

    target: "vector",

    animated: true,
  },

  {
    id: "e3",

    source: "backend",

    target: "ai",

    animated: true,
  },

];

export default function ArchitectureGraph() {

  return (

    <div
      className="
        h-[500px]

        bg-panel/70
        backdrop-blur-xl

        border
        border-border

        rounded-3xl

        shadow-2xl

        overflow-hidden
      "
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <MiniMap />

        <Controls />

        <Background />

      </ReactFlow>

    </div>

  );

}