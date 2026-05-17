import ExplorerNode from "./ExplorerNode";

import useAppStore from "../../stores/useAppStore";

function filterTree(nodes, query) {

  if (!query) return nodes;

  return nodes.reduce(
    (acc, node) => {

      const matches =
        node.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );

      if (node.type === "folder") {

        const filteredChildren =
          filterTree(
            node.children || [],
            query
          );

        if (
          matches ||
          filteredChildren.length
        ) {

          acc.push({
            ...node,

            children:
              filteredChildren,
          });

        }

      } else if (matches) {

        acc.push(node);

      }

      return acc;

    },

    []
  );
}

export default function ExplorerTree({
  tree,
}) {

  const { searchQuery } =
    useAppStore();

  const filteredTree =
    filterTree(
      tree,
      searchQuery
    );

  if (!filteredTree.length) {
    return (
      <div
        className="
          text-center
          text-ice/60
          py-10
        "
      >
        No matching files found.
      </div>
    );
  }

  return (
    <div className="space-y-1">

      {filteredTree.map((node) => (
        <ExplorerNode
          key={node.id}
          node={node}
        />
      ))}

    </div>
  );
}