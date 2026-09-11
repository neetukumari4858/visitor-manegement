import { View } from "./types";

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

export default function Sidebar({ view, setView, onLogout }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[244px] flex-col overflow-y-auto bg-[#10254a] p-[28px_18px_20px] text-[#dce7ff] max-[800px]:w-[68px] max-[800px]:p-[22px_10px]">
      <div className="flex items-center gap-2.5 px-2.5 pb-[52px] max-[800px]:px-2 max-[800px]:pb-[45px]">
        <span className="text-lg font-extrabold tracking-[-.8px] max-[800px]:hidden">
          Visit<span className="text-[#8fb5ff]">Tracker</span>
        </span>
      </div>
      <nav className="grid gap-[5px]">
        <button
          className={`flex items-center gap-3 rounded-[9px] border-0 p-3 text-left font-semibold ${view === "visitors" ? "bg-[#21467f] text-white" : "bg-transparent text-[#9eb1d2]"} max-[800px]:justify-center max-[800px]:px-0`}
          onClick={() => setView("visitors")}
        >
          <span className="text-lg">◈</span>
          <span className="max-[800px]:hidden">Visitors</span>
        </button>
        <button
          className={`flex items-center gap-3 rounded-[9px] border-0 p-3 text-left font-semibold ${view === "add" ? "bg-[#21467f] text-white" : "bg-transparent text-[#9eb1d2]"} max-[800px]:justify-center max-[800px]:px-0`}
          onClick={() => setView("add")}
        >
          <span className="text-lg">＋</span>
          <span className="max-[800px]:hidden">Add visitor</span>
        </button>
      </nav>
      <div className="mt-auto">
        <button
          className="flex w-full items-center gap-3 border-0 bg-transparent p-3 text-left font-semibold max-[800px]:justify-center max-[800px]:px-0"
          onClick={onLogout}
        >
          <span>↪</span>
          <span className="max-[800px]:hidden">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
