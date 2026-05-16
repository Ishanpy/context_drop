export default function LoadingSkeleton() {
  return (
    <div
      className="
        bg-panel
        border
        border-border
        rounded-3xl
        p-6
        animate-pulse
      "
    >
      <div
        className="
          h-5
          w-40
          bg-gray-700
          rounded
        "
      />

      <div
        className="
          h-4
          w-full
          bg-gray-700
          rounded
          mt-6
        "
      />

      <div
        className="
          h-4
          w-5/6
          bg-gray-700
          rounded
          mt-3
        "
      />

      <div
        className="
          h-4
          w-4/6
          bg-gray-700
          rounded
          mt-3
        "
      />
    </div>
  );
}