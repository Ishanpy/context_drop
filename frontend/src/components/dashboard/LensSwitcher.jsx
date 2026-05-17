import useAppStore from "../../stores/useAppStore";

const lenses = [
  "developer",
  "architect",
  "manager",
  "qa",
];

export default function LensSwitcher() {
  const {
    selectedLens,
    setSelectedLens,
  } = useAppStore();

  return (
    <div className="flex gap-3 flex-wrap">
      {lenses.map((lens) => (
        <button
          key={lens}
          onClick={() =>
            setSelectedLens(lens)
          }
          className={`
            px-5
            py-2
            rounded-xl
            capitalize
            transition-all
            duration-300
            border

            ${
              selectedLens === lens
                ? "bg-primary hover:bg-accent text-cream border-primary"
                : "bg-white/5 hover:bg-white/10 text-ice/80 border-border"
            }
          `}
        >
          {lens}
        </button>
      ))}
    </div>
  );
}