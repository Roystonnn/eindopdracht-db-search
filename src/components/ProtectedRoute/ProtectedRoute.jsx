import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  if (status === "pending") {
    return (
      <main style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Laden…</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
