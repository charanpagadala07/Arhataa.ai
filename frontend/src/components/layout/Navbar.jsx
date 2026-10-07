import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getSession, logout } from "@/api/authApi";
import { cn } from "@/lib/utils";

const links = [
  {
    to: "/home",
    label: "Home",
  },
  {
    to: "/history",
    label: "History",
  },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/auth/callback";

  useEffect(() => {
    getSession().then((session) =>
      setAuthenticated(session.authenticated),
    );

    const updateSession = () =>
      getSession().then((session) =>
        setAuthenticated(session.authenticated),
      );

    window.addEventListener(
      "shortlistai:auth-change",
      updateSession,
    );

    return () =>
      window.removeEventListener(
        "shortlistai:auth-change",
        updateSession,
      );
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">

        {/* ------------------------------------------------
            BRAND
        ------------------------------------------------ */}
        <NavLink
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          
            <img
              src="../../public/logo.png"
              alt="arhataa.ai"
              className="h-9 w-9 object-contain"
            />


          {/* <div
            className="flex h-9 w-9 items-center justify-center rounded-lg
                       bg-[#0A2540] text-xs font-bold text-white
                       shadow-sm transition-transform
                       group-hover:scale-105"
          >
            A
          </div> */}

          <div className="flex flex-col leading-none">
            <span className="text-[23px] font-bold tracking-tight text-[#0A2540]">
              Arhataa<span className="text-[#0A66C2]">.ai</span>
            </span>

            <span className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
              Intelligent Hiring
            </span>
          </div>
        </NavLink>

        {/* ------------------------------------------------
            NAVIGATION
        ------------------------------------------------ */}
        <nav className="flex items-center gap-1">
          {authenticated && !isAuthPage ? (
            <>
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      // Base
                      "relative flex items-center px-3 py-2 text-sm font-medium",
                      "text-slate-500 transition-colors duration-200",
                      "hover:text-[#0A2540]",

                      // Underline animation
                      "after:absolute after:bottom-[-1px] after:left-3 after:right-3",
                      "after:h-0.5 after:rounded-full",
                      "after:bg-[#0A66C2]",
                      "after:origin-center after:transition-transform after:duration-200",

                      // Hidden underline
                      !isActive && "after:scale-x-0",

                      // Active state
                      isActive && "text-[#0A2540]",
                      isActive && "after:scale-x-100",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="mx-2 h-6 w-px bg-slate-200" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  rounded-lg px-3 py-2 text-sm font-medium
                  text-slate-500
                  transition-colors
                  hover:bg-slate-50
                  hover:text-[#0A2540]
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  cn(
                    "relative rounded-lg px-4 py-2 text-sm font-semibold",
                    "transition-colors duration-200",

                    isActive
                      ? "text-[#0A66C2]"
                      : "text-slate-600 hover:text-[#0A2540]",

                    // Active underline
                    "after:absolute after:bottom-0 after:left-4 after:right-4",
                    "after:h-0.5 after:rounded-full after:bg-[#0A66C2]",
                    "after:origin-center after:transition-transform",

                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0",
                  )
                }
              >
                Sign in
              </NavLink>

              {/* Get Started */}
              <NavLink
                to="/login"
                className="
                  ml-1 rounded-lg
                  bg-[#0A66C2]
                  px-4 py-2
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:bg-[#084E96]
                  hover:shadow-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#0A66C2]/30
                  focus:ring-offset-2
                "
              >
                Get Started
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
