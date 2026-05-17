import { Search } from "lucide-react";

import useAppStore from "../../stores/useAppStore";

export default function ExplorerSearch() {

  const {
    searchQuery,
    setSearchQuery,
  } = useAppStore();

  return (
    <div
      className="
        relative
        mb-5
      "
    >

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-ice/60
        "
      />

      <input
        type="text"

        placeholder="
          Search repository...
        "

        value={searchQuery}

        onChange={(e) =>
          setSearchQuery(
            e.target.value
          )
        }

        className="
          w-full

          bg-white/5

          border
          border-border

          rounded-2xl

          py-3
          pl-11
          pr-4

          outline-none

          focus:border-blue/40

          text-sm
        "
      />

    </div>
  );
}
