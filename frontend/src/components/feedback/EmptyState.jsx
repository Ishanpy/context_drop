import { Inbox } from "lucide-react";

export default function EmptyState({

  title = "No data available",

  description =
    "Nothing to display yet.",

}) {

  return (

    <div
      className="
        bg-panel

        border
        border-border

        rounded-3xl

        p-10

        text-center
      "
    >

      <div
        className="
          flex
          justify-center
        "
      >

        <div
          className="
            w-16
            h-16

            rounded-2xl

            bg-white/5

            flex
            items-center
            justify-center
          "
        >

          <Inbox
            size={30}
            className="
              text-gray-400
            "
          />

        </div>

      </div>

      <h2
        className="
          mt-6

          text-2xl
          font-semibold
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3

          text-gray-400

          max-w-md
          mx-auto
        "
      >
        {description}
      </p>

    </div>

  );

}