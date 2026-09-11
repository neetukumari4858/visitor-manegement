import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { addVisitor } from "../store";
import { VisitorPayload } from "../types";
import Spinner from "./Spinner";

interface AddVisitorProps {
  onSaved: () => void;
  onCancel: () => void;
}
const inputClass =
  "h-[43px] w-full rounded-md border border-[#d8e2f2] bg-white px-3 font-normal text-[#17233d] outline-none focus:border-[#5b8def] focus:ring-4 focus:ring-[#5b8def18]";

export default function AddVisitor({ onSaved, onCancel }: AddVisitorProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<VisitorPayload>({
    name: "",
    phone: "",
    unit: "",
    visitDate: "",
  });
  const [errors, setErrors] = useState<Record<keyof VisitorPayload, string>>({
    name: "",
    phone: "",
    unit: "",
    visitDate: "",
  });
  const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      name: /^[A-Za-z][A-Za-z '.-]*$/.test(form.name.trim())
        ? ""
        : "Enter a name using letters only.",
      phone: /^(?=(?:\D*\d){10,15}\D*$)[+0-9 ()-]+$/.test(form.phone.trim())
        ? ""
        : "Enter a valid phone number with 10 to 15 digits.",
      unit: form.unit.trim() ? "" : "Enter a unit number.",
      visitDate:
        form.visitDate &&
        form.visitDate >= new Date().toISOString().split("T")[0]
          ? ""
          : "Choose a visit date",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }
    setSaving(true);
    const result = await dispatch(addVisitor(form));
    setSaving(false);
    if (addVisitor.fulfilled.match(result)) onSaved();
    else
      setErrors((current) => ({
        ...current,
        name: "Unable to add this visitor. Please try again.",
      }));
  };
  const update = (key: keyof VisitorPayload, value: string) => {
    setForm({ ...form, [key]: value });
    setErrors((current) => ({ ...current, [key]: "" }));
  };
  return (
    <div className="mx-auto max-w-[1130px] px-[6%] py-[61px] max-[800px]:px-6 max-[800px]:py-[42px] max-[570px]:px-4 max-[570px]:py-[35px]">
      <button
        className="border-0 bg-transparent p-0 text-xs font-bold text-[#45689f]"
        onClick={onCancel}
      >
        ← Back to visitors
      </button>
      <div className="mt-[47px] mb-[42px] flex items-end justify-between gap-5 max-[570px]:mb-[30px] max-[570px]:items-start max-[570px]:flex-col">
        <div>
          <h1 className="m-0 text-[39px] font-bold leading-tight tracking-[-2px]">
            Add a visitor
          </h1>
        </div>
      </div>
      <form
        className="max-w-[760px] rounded-[9px] border border-[#d8e2f2] bg-white p-[33px_35px] max-[570px]:p-6"
        onSubmit={submit}
      >
        <div className="mb-[27px] flex items-start gap-[15px] border-b border-[#d8e2f2] pb-[25px]">
          <div>
            <h3 className="m-0 text-[15px]">Visitor details</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[21px] text-[11px] max-[570px]:grid-cols-1">
          {(
            [
              ["Full name", "name", "e.g. John Doe"],
              ["Phone number", "phone", "e.g. +91 98765 43210"],
              ["Unit number", "unit", "e.g. A-1204"],
            ] as const
          ).map(([label, key, placeholder]) => (
            <label key={key} className="grid gap-2 font-bold text-[#3f5274]">
              {label}
              <input
                value={form[key]}
                onChange={(event) => update(key, event.target.value)}
                aria-invalid={Boolean(errors[key])}
                className={`${inputClass} ${errors[key] ? "border-[#cf5e68]" : ""}`}
                placeholder={placeholder}
              />
              {errors[key] && (
                <span className="font-normal text-[#cf5e68]">
                  {errors[key]}
                </span>
              )}
            </label>
          ))}
          <label className="grid gap-2 font-bold text-[#3f5274]">
            Visit date
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={Boolean(errors.visitDate)}
              className={`${inputClass} ${errors.visitDate ? "border-[#cf5e68]" : ""}`}
              value={form.visitDate}
              onChange={(event) => update("visitDate", event.target.value)}
            />
            {errors.visitDate && (
              <span className="font-normal text-[#cf5e68]">
                {errors.visitDate}
              </span>
            )}
          </label>
        </div>
        {errors.name.startsWith("Unable") && (
          <p className="mt-3 text-[11px] text-[#cf5e68]">{errors.name}</p>
        )}
        <div className="mt-8 flex justify-end gap-2.5 border-t border-[#d8e2f2] pt-[23px]">
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center rounded-[7px] border border-[#d8e2f2] bg-white px-3 text-xs font-bold text-[#3f5274]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-[7px] bg-[#2861c7] px-3 text-xs font-bold text-white shadow-[0_5px_12px_#2861c733] disabled:cursor-wait disabled:opacity-65"
            disabled={saving}
          >
            {saving ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              <>
                Create visitor <span>↗</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
