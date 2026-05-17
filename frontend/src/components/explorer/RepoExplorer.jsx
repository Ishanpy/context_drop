import ExplorerTree from "./ExplorerTree";

import ExplorerSearch from "./ExplorerSearch";

import {
  repositoryTree,
} from "../../mock/repositoryData";

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

      {/* HEADER */}

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

      {/* SEARCH */}

      <ExplorerSearch />

      {/* TREE */}

      <div
        className="
          flex-1

          overflow-y-auto

          pr-2
          mt-4
        "
      >

        <ExplorerTree
          tree={repositoryTree}
        />

      </div>

    </div>

  );

}