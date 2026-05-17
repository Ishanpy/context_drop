import { AlertTriangle } from "lucide-react";

export default function ErrorState({

  title = "Something went wrong",

  description =
    "An unexpected error occurred.",

  actionLabel = "Retry",

  onAction,

}) {

  return (

    <div
      className="
        bg-panel/70
        backdrop-blur-xl

        border
        border-red-500/20

        rounded-3xl

        p-10

        shadow-2xl

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

            bg-red-500/10

            flex
            items-center
            justify-center
          "
        >

          <AlertTriangle
            size={30}
            className="
              text-red-400
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

          text-ice/70

          max-w-md
          mx-auto
        "
      >
        {description}
      </p>

      {onAction && (

        <button
          onClick={onAction}

          className="
            mt-6

            px-5
            py-3

            rounded-xl

            bg-primary

            hover:opacity-90

            transition
          "
        >
          {actionLabel}
        </button>

      )}

    </div>

  );

}