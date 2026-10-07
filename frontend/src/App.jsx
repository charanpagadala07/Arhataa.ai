import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { LandingPage } from "@/pages/LandingPage";
import { HomePage } from "@/pages/HomePage";
import { HistoryPage } from "@/pages/HistoryPage";
import { AuthPage } from "@/pages/AuthPage";
import { isAuthenticated, saveAccessToken } from "@/api/authApi";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.slice(1));
    const queryParams = new URLSearchParams(location.search);
    const token = hashParams.get("token") ?? queryParams.get("token");
    const oauthError = queryParams.get("error") ?? queryParams.get("oauthError");

    if (token) {
      saveAccessToken(token);
      navigate("/home", { replace: true });
    } else {
      navigate("/login", {
        replace: true,
        state: {
          error: oauthError
            ? "Google sign-in failed. Please try again."
            : "Google sign-in completed without returning a token. Please try again.",
        },
      });
    }
  }, [location.hash, location.search, navigate]);

  return <main className="mx-auto max-w-6xl px-4 py-12 text-sm text-muted-foreground">Completing Google sign-in…</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
