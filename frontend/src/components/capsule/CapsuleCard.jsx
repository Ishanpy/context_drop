import MarkdownRenderer from "../markdown/MarkdownRenderer";
export default function CapsuleCard({
  title,
  description,
  tag,
}) {
  return (
    <div
      className="
        bg-panel/70
        backdrop-blur-xl

        border
        border-border

        rounded-3xl
        p-6

        shadow-2xl

        hover:scale-[1.015]
        hover:border-blue/30
        hover:shadow-2xl

        transition-all
        duration-300
    "
    >

      <div className="flex items-center justify-between">

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          {title}
        </h2>

        <span
          className="
            text-xs
            uppercase
            bg-blue/20
            text-blue
            px-3
            py-1
            rounded-full
          "
        >
          {tag}
        </span>

      </div>

      <p
        className="
          text-ice/70
          mt-4
          leading-relaxed
        "
      >
        <MarkdownRenderer
            content={description}
        />
      </p>

    </div>
  );
}