export default function DashboardLayout({
  children,
}) {
  return (
    <div
      className="
        h-screen
        flex
        overflow-hidden
        bg-navy
        text-white
      "
    >
      {children}
    </div>
  );
}