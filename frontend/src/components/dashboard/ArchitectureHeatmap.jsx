const blocks = Array.from({
  length: 24,
});

export default function ArchitectureHeatmap() {
  return (
    <div
      className="
        bg-panel
        border
        border-border
        rounded-3xl
        p-6
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Architecture Heatmap
        </h2>

        <p
          className="
            text-gray-400
            mt-2
          "
        >
          Complexity distribution across repository modules
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-6
          gap-3
          mt-8
        "
      >

        {blocks.map((_, index) => (
          <div
            key={index}
            className={`
              aspect-square
              rounded-xl

              ${
                index % 3 === 0
                  ? "bg-red-500/70"
                  : index % 2 === 0
                  ? "bg-yellow-500/70"
                  : "bg-green-500/70"
              }
            `}
          />
        ))}

      </div>

    </div>
  );
}