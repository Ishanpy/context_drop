export default function TypingIndicator() {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        mt-6
      "
    >

      <div
        className="
          w-3
          h-3
          rounded-full
          bg-accent
          animate-bounce
        "
      />

      <div
        className="
          w-3
          h-3
          rounded-full
          bg-accent
          animate-bounce
          [animation-delay:200ms]
        "
      />

      <div
        className="
          w-3
          h-3
          rounded-full
          bg-accent
          animate-bounce
          [animation-delay:400ms]
        "
      />

    </div>
  );
}