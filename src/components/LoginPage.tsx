import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../store";
import Spinner from "./Spinner";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
        ? ""
        : "Enter a valid email address.",
      password:
        user.password.length >= 6
          ? ""
          : "Password must be at least 6 characters.",
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      return;
    }
    dispatch(login(user));
  };

  const updateUser = (field: "email" | "password", value: string) => {
    setUser((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f8ff] p-[35px] max-[570px]:p-[42px_25px]">
      <section className="w-[min(430px,100%)] rounded-[10px] border border-[#d8e2f2] bg-white p-[38px] shadow-[0_14px_35px_#183b6b12] max-[570px]:p-6">
        <div className="w-full">
          <h2 className="text-[31px]  font-bold tracking-[-1.5px] max-[570px]:text-[28px]">
            Login
          </h2>

          <form
            onSubmit={submit}
            className="mt-[31px] grid gap-[19px] text-[11px]"
          >
            <label className="grid gap-2 font-bold text-[#3f5274]">
              Email address
              <input
                type="email"
                value={user.email}
                onChange={(event) => updateUser("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={`h-[43px] w-full rounded-md border bg-white px-3 text-[13px] font-normal text-[#17233d] outline-none focus:border-[#5b8def] focus:ring-4 focus:ring-[#5b8def18] ${errors.email ? "border-[#cf5e68]" : "border-[#d8e2f2]"}`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="font-normal text-[#cf5e68]">
                  {errors.email}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-bold text-[#3f5274]">
              Password
              <span className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(event) =>
                    updateUser("password", event.target.value)
                  }
                  aria-invalid={Boolean(errors.password)}
                  className={`h-[43px] w-full rounded-md border bg-white px-3 pr-16 text-[13px] font-normal text-[#17233d] outline-none focus:border-[#5b8def] focus:ring-4 focus:ring-[#5b8def18] ${errors.password ? "border-[#cf5e68]" : "border-[#d8e2f2]"}`}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 border-0 bg-transparent p-2 text-[#45689f]"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.7 4 10 8a13.2 13.2 0 0 1-4 5.4" />
                      <path d="M6.6 6.6C4.8 7.8 3.5 9.7 2 12c1.3 4 5 8 10 8 1 0 2-.2 2.9-.5" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </span>
              {errors.password && (
                <span className="font-normal text-[#cf5e68]">
                  {errors.password}
                </span>
              )}
            </label>
            {error && <p className="m-0 text-[11px] text-[#cf5e68]">{error}</p>}
            <button
              className="mt-1 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-[7px] bg-[#2861c7] px-3 text-xs font-bold text-white shadow-[0_5px_12px_#2861c733] hover:bg-[#1e4fa9] disabled:cursor-wait disabled:opacity-65"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner /> Login...
                </>
              ) : (
                <>Login</>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
