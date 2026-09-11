interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex min-w-[270px] items-center gap-3 rounded-lg border-l-[3px] bg-[#17233d] p-3.5 text-white shadow-2xl animate-[rise_.25s_ease-out] ${type === "error" ? "border-[#e56b6f]" : "border-[#5b8def]"}`}
      role="alert"
    >
      <strong className="whitespace-nowrap text-xs">
        {type === "success" ? "Done" : "Action needed"}
      </strong>
      <span className="flex-1 text-[11px] text-[#c4d0e6]">{message}</span>
      <button
        className="border-0 bg-transparent p-0 text-lg leading-none text-[#9db0d0] transition-colors hover:text-white"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
