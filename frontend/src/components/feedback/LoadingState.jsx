export default function LoadingState({

  title = "Loading...",

  description =
    "Please wait while data is being processed.",

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
            w-14
            h-14

            border-4
            border-primary/20
            border-t-primary

            rounded-full

            animate-spin
          "
        />

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
        "
      >
        {description}
      </p>

    </div>

  );

}