import ExplorerTree from "./ExplorerTree";

import { repositoryTree } from "../../mock/repositoryTree";

import ExplorerSearch from "./ExplorerSearch";

export default function RepoExplorer() {
  return (
    <div
      className="
        bg-panel/80
        backdrop-blur-xl

        border
        border-white/5

        rounded-3xl

        p-6

        shadow-glow

        h-[420px]

        flex
        flex-col
    "
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Repository Explorer
        </h2>

      </div>

      <div
        className="
        overflow-y-auto
        pr-2
        flex-1
    "
    >
        <ExplorerSearch />
        <div
  className="
    overflow-y-auto
    pr-2
    flex-1
  "
>

  <ExplorerTree
    tree={repositoryTree}
  />

</div>

    

</div>

    </div>
  );
}