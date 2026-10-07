import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { beginGoogleLogin, login, register } from "@/api/authApi";
import { Button } from "@/components/ui/button";

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    location.state?.error ??
      (new URLSearchParams(location.search).has("oauthError")
        ? "Google sign-in failed. Check the OAuth redirect URI and client configuration, then try again."
        : ""),
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "register") {
        await register({ name, email, password });
      }

      await login({ email, password });

      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to sign in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
  }

  const isLogin = mode === "login";

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">

          {/* =====================================================
              LEFT BRAND PANEL
          ====================================================== */}
          <section className="relative hidden overflow-hidden bg-[#0A2540] lg:flex lg:min-h-[650px]">
            {/* Decorative circles */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0A66C2]/30 blur-2xl" />

            <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14">

              {/* Brand */}
              <Link
                to="/"
                className="flex w-fit items-center gap-3"
              >
                {/* LOGO PLACEHOLDER */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#0A2540] shadow-sm">
                  A
                </div>

                <span className="text-2xl font-bold tracking-tight text-white">
                  Arhataa<span className="text-blue-300">.ai</span>
                </span>
              </Link>

              {/* Main message */}
              <div className="max-w-md">
                <div className="mb-5 inline-flex items-center rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Intelligent Hiring
                </div>

                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
                  Spend less time screening.
                  <span className="block text-blue-300">
                    Focus more on people.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  Arhataa.ai helps hiring teams analyze applicant
                  information, prioritize candidates, and build focused
                  shortlists faster.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "AI-assisted candidate screening",
                    "Explainable recommendations",
                    "Recruiter-controlled decisions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-400/20 text-[10px] font-bold text-blue-200">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <p className="text-xs text-slate-400">
                Smarter screening. Human decisions.
              </p>
            </div>
          </section>

          {/* =====================================================
              RIGHT AUTH PANEL
          ====================================================== */}
          <section className="flex min-h-[650px] flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14">

            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-8 flex items-center gap-2.5 lg:hidden"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A2540] text-xs font-bold text-white">
                A
              </div>

              <span className="text-lg font-bold tracking-tight text-[#0A2540]">
                Arhataa<span className="text-[#0A66C2]">.ai</span>
              </span>
            </Link>

            <div className="mx-auto w-full max-w-md">

              {/* Heading */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
                  {isLogin ? "Welcome back" : "Get started"}
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0A2540] sm:text-3xl">
                  {isLogin
                    ? "Sign in to your account"
                    : "Create your account"}
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {isLogin
                    ? "Continue to your applicant screening workspace."
                    : "Create an account to start screening candidates with Arhataa.ai."}
                </p>
              </div>

              {/* Login / Signup tabs */}
              <div className="mt-7 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`
                    rounded-md py-2 text-sm font-semibold
                    transition-all duration-200
                    ${
                      isLogin
                        ? "bg-white text-[#0A2540] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }
                  `}
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className={`
                    rounded-md py-2 text-sm font-semibold
                    transition-all duration-200
                    ${
                      !isLogin
                        ? "bg-white text-[#0A2540] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }
                  `}
                >
                  Sign up
                </button>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}
              <form
                className="mt-7 space-y-4"
                onSubmit={handleSubmit}
              >
                {mode === "register" && (
                  <label
                    className="block text-sm font-semibold text-[#0A2540]"
                    htmlFor="auth-name"
                  >
                    Full name

                    <input
                      id="auth-name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Enter your name"
                      className="
                        mt-1.5 h-11 w-full rounded-lg
                        border border-slate-300
                        bg-white px-3.5
                        text-sm font-normal text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        transition-all
                        focus:border-[#0A66C2]
                        focus:ring-4
                        focus:ring-[#0A66C2]/10
                      "
                    />
                  </label>
                )}

                <label
                  className="block text-sm font-semibold text-[#0A2540]"
                  htmlFor="auth-email"
                >
                  Email address

                  <input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@company.com"
                    className="
                      mt-1.5 h-11 w-full rounded-lg
                      border border-slate-300
                      bg-white px-3.5
                      text-sm font-normal text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:border-[#0A66C2]
                      focus:ring-4
                      focus:ring-[#0A66C2]/10
                    "
                  />
                </label>

                <label
                  className="block text-sm font-semibold text-[#0A2540]"
                  htmlFor="auth-password"
                >
                  Password

                  <input
                    id="auth-password"
                    type="password"
                    autoComplete={
                      isLogin
                        ? "current-password"
                        : "new-password"
                    }
                    minLength={
                      mode === "register" ? 8 : undefined
                    }
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder={
                      isLogin
                        ? "Enter your password"
                        : "Create a password"
                    }
                    className="
                      mt-1.5 h-11 w-full rounded-lg
                      border border-slate-300
                      bg-white px-3.5
                      text-sm font-normal text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:border-[#0A66C2]
                      focus:ring-4
                      focus:ring-[#0A66C2]/10
                    "
                  />

                  {mode === "register" && (
                    <span className="mt-1.5 block text-xs font-normal text-slate-500">
                      Use at least 8 characters.
                    </span>
                  )}
                </label>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <Button
                  className="
                    h-11 w-full rounded-lg
                    bg-[#0A66C2]
                    text-sm font-semibold text-white
                    shadow-sm
                    transition-all
                    hover:bg-[#084E96]
                    hover:shadow-md
                    focus:ring-4
                    focus:ring-[#0A66C2]/20
                  "
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Please wait…"
                    : isLogin
                      ? "Sign in"
                      : "Create account"}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  OR
                </span>

                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="
                  h-11 w-full rounded-lg
                  border-slate-300
                  bg-white
                  text-sm font-semibold text-[#0A2540]
                  transition-all
                  hover:bg-slate-50
                  hover:border-slate-400
                "
                onClick={beginGoogleLogin}
              >
                {/* Google G placeholder */}
                <span className="mr-2 text-base font-bold">
                  G
                </span>

                Continue with Google
              </Button>

              {/* Switch mode */}
              <p className="mt-6 text-center text-sm text-slate-500">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}

                <button
                  type="button"
                  className="font-semibold text-[#0A66C2] hover:underline"
                  onClick={() =>
                    switchMode(
                      isLogin ? "register" : "login",
                    )
                  }
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>

              {/* Back */}
              <Link
                to="/"
                className="
                  mt-7 block text-center
                  text-xs font-medium text-slate-400
                  transition-colors
                  hover:text-[#0A66C2]
                "
              >
                ← Back to Arhataa.ai
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
