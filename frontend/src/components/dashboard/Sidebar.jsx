import {
  LayoutDashboard,
  GitBranch,
  BrainCircuit,
  Ticket,
  FileText,
  Menu,
} from "lucide-react";

import useAppStore from "../../stores/useAppStore";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Architecture",
    icon: GitBranch,
  },

  {
    label: "Capsules",
    icon: BrainCircuit,
  },

  {
    label: "Tickets",
    icon: Ticket,
  },

  {
    label: "Departure Brief",
    icon: FileText,
  },
];

export default function Sidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
  } = useAppStore();

  return (
    <aside
      className={`
        ${
          sidebarOpen
            ? "w-72"
            : "w-24"
        }

        min-h-screen
        bg-panel
        border-r
        border-border
        p-4
        transition-all
        duration-300
        overflow-hidden
      `}
    >

      {/* MENU BUTTON */}

      <button
        onClick={toggleSidebar}
        className="
          mb-8
          p-3
          rounded-xl
          hover:bg-navy
          transition
        "
      >
        <Menu size={24} />
      </button>

      {/* LOGO SECTION */}

      <div>
        <h1
          className={`
            text-3xl
            font-bold
            text-blue
            transition-all

            ${
              !sidebarOpen &&
              "hidden"
            }
          `}
        >
          ContextDrop
        </h1>

        {sidebarOpen && (
          <p
            className="
              text-sm
              text-gray-400
              mt-2
            "
          >
            AI repository intelligence
          </p>
        )}
      </div>

      {/* REPOSITORY SECTION */}

      <div className="mt-10">

        {sidebarOpen && (
          <p
            className="
              text-xs
              uppercase
              tracking-widest
              text-gray-500
              mb-4
            "
          >
            Repository
          </p>
        )}

        <div
          className={`
            bg-navy
            border
            border-border
            rounded-xl
            p-4

            ${
              !sidebarOpen &&
              "flex justify-center"
            }
          `}
        >

          {sidebarOpen ? (
            <div>
              <p className="font-medium">
                context_drop
              </p>

              <p
                className="
                  text-sm
                  text-gray-400
                  mt-1
                "
              >
                IBM Hackathon Project
              </p>
            </div>
          ) : (
            <GitBranch size={22} />
          )}

        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="mt-10 space-y-2">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                w-full
                flex
                items-center

                ${
                  sidebarOpen
                    ? "justify-start"
                    : "justify-center"
                }

                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-navy
                transition
              `}
            >

              <Icon size={20} />

              {sidebarOpen && (
                <span>
                  {item.label}
                </span>
              )}

            </button>
          );
        })}

      </nav>

    </aside>
  );
}