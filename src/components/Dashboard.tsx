import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeVisitorStatus, deleteVisitor, loadVisitors } from "../store";
import AddVisitor from "./AddVisitor";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import Toast from "./Toast";
import VisitorTable from "./VisitorTable";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.visitors);
  const [view, setView] = useState<"visitors" | "add">("visitors");
  const [notice, setNotice] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadVisitors());
  }, [dispatch]);
  const runAction = async (id: string, action: "approve" | "reject") => {
    const result = await dispatch(changeVisitorStatus({ id, status: action }));
    setNotice(
      changeVisitorStatus.fulfilled.match(result)
        ? {
            message: `Visitor ${action === "approve" ? "approved" : "rejected"}.`,
            type: "success",
          }
        : { message: "Could not update visitor.", type: "error" },
    );
  };
  const remove = async () => {
    if (!confirmId) return;
    const result = await dispatch(deleteVisitor(confirmId));
    setConfirmId(null);
    setNotice(
      deleteVisitor.fulfilled.match(result)
        ? { message: "Visitor deleted.", type: "success" }
        : { message: "Could not delete visitor.", type: "error" },
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-[#17233d]">
      <Sidebar view={view} setView={setView} onLogout={onLogout} />
      <main className="ml-[244px] min-w-0 max-[800px]:ml-[68px]">
        {view === "add" ? (
          <AddVisitor
            onCancel={() => setView("visitors")}
            onSaved={() => {
              setView("visitors");
              setNotice({
                message: "Visitor added successfully.",
                type: "success",
              });
            }}
          />
        ) : (
          <div className="mx-auto max-w-[1130px] px-[6%] py-[61px] max-[800px]:px-6 max-[800px]:py-[42px] max-[570px]:px-4 max-[570px]:py-[35px]">
            <div className="mb-[42px] flex items-end justify-between gap-5 max-[570px]:mb-[30px] max-[570px]:items-start max-[570px]:flex-col">
              <div>
                <h1 className="m-0 text-[39px] font-bold leading-tight tracking-[-2px]">
                  Visitors
                  <span className="px-2 py-1.5 align-middle font-mono text-[20px] font-normal tracking-normal text-[#2861c7]">
                    ({items.length})
                  </span>
                </h1>
              </div>
              <button
                className="inline-flex min-h-11 min-w-[146px] items-center justify-center gap-2 rounded-[7px] bg-[#2861c7] px-[18px] text-xs font-bold text-white shadow-[0_5px_12px_#2861c733] max-[570px]:w-full"
                onClick={() => setView("add")}
              >
                <span className="text-lg font-normal">＋</span> Add visitor
              </button>
            </div>
            <div className="mb-[18px] flex items-center justify-between">
              <div>
                <h2 className="m-0 text-[17px] font-bold tracking-[-.5px]">
                  All visitors
                </h2>
                <p className="mt-1 text-[11px] text-[#71809b]">
                  Review and manage upcoming visits.
                </p>
              </div>
            </div>
            {loading ? (
              <div className="p-[55px] text-center text-[13px] text-[#71809b]">
                <Spinner /> Loading visitors...
              </div>
            ) : error ? (
              <div className="p-[55px] text-center text-[13px] text-[#cf5e68]">
                {error}
                <button
                  className="mx-auto mt-3 block border-0 bg-transparent font-bold text-[#2861c7]"
                  onClick={() => dispatch(loadVisitors())}
                >
                  Try again
                </button>
              </div>
            ) : (
              <VisitorTable
                visitors={items}
                onAction={runAction}
                onDelete={setConfirmId}
              />
            )}
          </div>
        )}
        {notice && (
          <Toast
            message={notice.message}
            type={notice.type}
            onClose={() => setNotice(null)}
          />
        )}
        {confirmId && (
          <div className="fixed inset-0 z-40 grid place-items-center bg-[#10254a77] p-5">
            <div className="w-[min(410px,100%)] rounded-[10px] bg-white p-[30px] text-center shadow-2xl">
              <h2 className="m-0 text-[19px]">Delete this visitor?</h2>
              <p className="my-[10px] mb-6 text-xs leading-[1.6] text-[#71809b]">
                Their visit record will be permanently removed.
              </p>
              <div className="flex justify-center gap-2 max-[570px]:flex-col-reverse">
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-[7px] border border-[#d8e2f2] bg-white px-[18px] text-xs font-bold text-[#3f5274]"
                  onClick={() => setConfirmId(null)}
                >
                  Keep record
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-[7px] bg-[#d95f68] px-[18px] text-xs font-bold text-white"
                  onClick={remove}
                >
                  Delete visitor
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
