const stats = [
  {
    label: "Files",
    value: "1,284",
  },

  {
    label: "Modules",
    value: "84",
  },

  {
    label: "Risk Score",
    value: "72%",
  },

  {
    label: "AI Insights",
    value: "341",
  },
];

export default function RepoAnalytics() {
  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-5
      "
    >

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            bg-panel
            border
            border-border
            rounded-3xl
            p-6
          "
        >

          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {stat.label}
          </p>

          <h2
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            {stat.value}
          </h2>

        </div>
      ))}

    </div>
  );
}