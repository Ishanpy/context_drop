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
            transition
            border

            ${
              selectedLens === lens
                ? "bg-blue border-blue"
                : "bg-panel border-border"
            }
          `}
        >
          {lens}
        </button>
      ))}
    </div>
  );
}