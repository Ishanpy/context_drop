import ExplorerNode from "./ExplorerNode";

export default function ExplorerTree({
  tree,
}) {
  return (
    <div className="space-y-1">

      {tree.map((node) => (
        <ExplorerNode
          key={node.id}
          node={node}
        />
      ))}

    </div>
  );
}