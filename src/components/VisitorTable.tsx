import { Visitor } from "../types";
import StatusPill from "./StatusPill";

interface VisitorTableProps {
  visitors: Visitor[];
  onAction: (id: string, action: "approve" | "reject") => void;
  onDelete: (id: string) => void;
}
const cell = "border-b border-[#edf2fa] px-[17px] py-4";

export default function VisitorTable({
  visitors,
  onAction,
  onDelete,
}: VisitorTableProps) {
  return (
    <div className="overflow-x-auto rounded-[9px] border border-[#d8e2f2] bg-white">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr>
            {["VISITOR", "PHONE", "UNIT", "VISIT DATE", "STATUS"].map(
              (heading) => (
                <th
                  key={heading}
                  className="border-b border-[#d8e2f2] px-[17px] py-[15px] text-left font-mono text-[10px] font-medium tracking-[1.2px] text-[#7f91af]"
                >
                  {heading}
                </th>
              ),
            )}
            <th className="border-b border-[#d8e2f2] px-[17px] py-[15px] text-right font-mono text-[10px] font-medium tracking-[1.2px] text-[#7f91af]">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id}>
              <td className={`${cell} text-xs`}>
                <div className="flex items-center gap-2.5">
                  <div className="grid h-[29px] w-[29px] place-items-center rounded-full bg-[#e4edff] text-[9px] font-extrabold text-[#2861c7]">
                    {visitor.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <strong className="text-xs">{visitor.name}</strong>
                </div>
              </td>
              <td className={`${cell} font-mono text-[11px] text-[#71809b]`}>
                {visitor.phone}
              </td>
              <td className={`${cell} text-xs`}>
                <span className="font-mono text-[10px] text-[#5c6f91]">
                  {visitor.unit}
                </span>
              </td>
              <td className={`${cell} font-mono text-[11px] text-[#71809b]`}>
                {new Date(`${visitor.visitDate}T12:00:00`).toLocaleDateString(
                  "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" },
                )}
              </td>
              <td className={`${cell} text-xs`}>
                <StatusPill status={visitor.status} />
              </td>
              <td className={`${cell} align-middle text-xs`}>
                <div className="flex min-w-[250px] flex-wrap justify-end gap-2">
                  {visitor.status === "Pending" && (
                    <>
                      <button
                        className="inline-flex min-w-[78px] items-center justify-center rounded-md border border-[#b9d0ff] bg-[#f1f6ff] px-3 py-2 text-[11px] font-bold text-[#2861c7] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#e1ebff] hover:shadow-md"
                        onClick={() => onAction(visitor.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="inline-flex min-w-[70px] items-center justify-center rounded-md border border-[#f2c7c0] bg-[#fff7f5] px-3 py-2 text-[11px] font-bold text-[#d47667] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ffebe7] hover:shadow-md"
                        onClick={() => onAction(visitor.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="inline-flex min-w-[70px] items-center justify-center rounded-md border border-[#d8e2f2] bg-white px-3 py-2 text-[11px] font-bold text-[#71809b] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#9eb7e5] hover:bg-[#f1f6ff] hover:text-[#2861c7] hover:shadow-md"
                    onClick={() => onDelete(visitor.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visitors.length === 0 && (
        <div className="p-[55px] text-center text-[13px] text-[#71809b]">
          <span className="text-[27px] text-[#9eb7e5]">○</span>
          <strong className="mt-2.5 block text-[#17233d]">
            No visitors yet
          </strong>
          <p className="my-1.5">Add your first visitor to get started.</p>
        </div>
      )}
    </div>
  );
}
