import { useState } from "react";

import useAppStore from "../../stores/useAppStore";

import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileCode2,
} from "lucide-react";

export default function ExplorerNode({
  node,
  level = 0,
}) {
  const [open, setOpen] =
    useState(false);

  const isFolder =
    node.type === "folder";

  const {
    activeFile,
    setActiveFile,
  } = useAppStore();

  return (
    <div>

      <button
        onClick={() => {

          if (isFolder) {
            setOpen(!open);
          } else {
            setActiveFile(node.name);
          }
        }}

        className="
          w-full
          flex
          items-center
          gap-3

          px-3
          py-2

          rounded-xl

          hover:bg-white/5

          text-sm
        "

        style={{
          paddingLeft:
            `${level * 16 + 12}px`,
        }}
      >

        {isFolder ? (
          open ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <div className="w-4" />
        )}

        {isFolder ? (
          <Folder
            size={18}
            className="
              text-yellow-400
            "
          />
        ) : (
          <FileCode2
            size={18}
            className="
              text-blue
            "
          />
        )}

        <span
          className="
            truncate
          "
        >
          {node.name}
        </span>

      </button>

      {open &&
        isFolder &&
        node.children?.map((child) => (
          <ExplorerNode
            key={child.id}
            node={child}
            level={level + 1}
          />
        ))}

    </div>
  );
}