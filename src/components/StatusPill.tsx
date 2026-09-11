export default function StatusPill({ status }: { status: string }) {
  const color =
    status === "Pending"
      ? "text-[#b8782f]"
      : status === "Rejected"
        ? "text-[#cf5e68]"
        : "text-[#2861c7]";
  const dot =
    status === "Pending"
      ? "bg-[#e0a354]"
      : status === "Rejected"
        ? "bg-[#df8189]"
        : "bg-[#5b8def]";
  return (
    <span className={`whitespace-nowrap text-[11px] ${color}`}>
      <i className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
