const tickets = [
  {
    id: "CTX-142",
    priority: "high",
    title:
      "Repository parsing latency issue",
  },

  {
    id: "CTX-201",
    priority: "medium",
    title:
      "Improve AI orchestration caching",
  },
];

export default function TicketPanel() {
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

      <h2
        className="
          text-2xl
          font-semibold
        "
      >
        Ticket Intelligence
      </h2>

      <div className="mt-6 space-y-4">

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="
              border
              border-border
              rounded-2xl
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <p className="font-medium">
                {ticket.id}
              </p>

              <span
                className="
                  text-xs
                  uppercase
                  text-yellow-400
                "
              >
                {ticket.priority}
              </span>

            </div>

            <p
              className="
                text-gray-400
                mt-3
              "
            >
              {ticket.title}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}