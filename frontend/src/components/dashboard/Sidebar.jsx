import {
  LayoutDashboard,
  GitBranch,
  BrainCircuit,
  Ticket,
  FileText,
} from "lucide-react";

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
  return (
    <aside
      className="
        w-72
        min-h-screen
        bg-panel
        border-r
        border-border
        p-6
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-blue
          "
        >
          ContextDrop
        </h1>

        <p
          className="
            text-sm
            text-gray-400
            mt-2
          "
        >
          AI repository intelligence
        </p>
      </div>

      <div className="mt-10">
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

        <div
          className="
            bg-navy
            border
            border-border
            rounded-xl
            p-4
          "
        >
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
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-navy
                transition
                text-left
              "
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}