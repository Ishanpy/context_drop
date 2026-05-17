import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { commands } from "../../data/commands";

export default function CommandPalette() {

  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  useEffect(() => {

    function handleKeyDown(event) {

      if (
        event.ctrlKey &&
        event.key === "k"
      ) {

        event.preventDefault();

        setOpen((prev) => !prev);

      }

    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, []);

  const filteredCommands =
    commands.filter((command) =>
      command.title
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
    );

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50

        bg-black/60

        flex
        items-start
        justify-center

        pt-32
      "
    >

      <div
        className="
          w-full
          max-w-2xl

          bg-panel

          border
          border-border

          rounded-3xl

          shadow-2xl

          overflow-hidden
        "
      >

        {/* SEARCH */}

        <div
          className="
            flex
            items-center

            gap-3

            px-5
            py-4

            border-b
            border-border
          "
        >

          <Search size={18} />

          <input
            type="text"

            placeholder="Search commands..."

            value={query}

            onChange={(e) =>
              setQuery(e.target.value)
            }

            autoFocus

            className="
              flex-1

              bg-transparent

              outline-none

              text-sm
            "
          />

        </div>

        {/* COMMANDS */}

        <div
          className="
            max-h-[400px]
            overflow-y-auto
          "
        >

          {filteredCommands.map(
            (command) => (

              <button
                key={command.id}

                className="
                  w-full

                  text-left

                  px-5
                  py-4

                  border-b
                  border-border

                  hover:bg-white/5

                  transition
                "
              >

                <h3
                  className="
                    font-medium
                  "
                >
                  {command.title}
                </h3>

                <p
                  className="
                    text-sm
                    text-ice/70
                    mt-1
                  "
                >
                  {command.description}
                </p>

              </button>

            )
          )}

        </div>

      </div>

    </div>

  );

}