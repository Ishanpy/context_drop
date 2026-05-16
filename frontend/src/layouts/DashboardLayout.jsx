export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-navy text-white">

      <div className="flex">

        {children}

      </div>

    </div>
  );
}