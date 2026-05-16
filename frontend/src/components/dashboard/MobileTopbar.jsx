import { Menu } from "lucide-react";

import useAppStore from "../../stores/useAppStore";

export default function MobileTopbar() {
  const {
    toggleMobileSidebar,
  } = useAppStore();

  return (
    <div
      className="
        lg:hidden
        sticky
        top-0
        z-40
        bg-navy/90
        backdrop-blur-xl
        border-b
        border-border
        px-6
        py-4
        flex
        items-center
        justify-between
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          text-blue
        "
      >
        ContextDrop
      </h1>

      <button
        onClick={toggleMobileSidebar}
        className="
          p-2
          rounded-xl
          hover:bg-panel
          transition
        "
      >
        <Menu size={24} />
      </button>

    </div>
  );
}