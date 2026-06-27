import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav.jsx";

function NotFound() {
  return (
    <>
      <Nav />
      <main
        className="container"
        style={{
          padding: "var(--space-8) 0",
          textAlign: "center",
        }}
      >
        <p className="discover-kicker">// Error 404</p>
        <h1 style={{ fontSize: 96, margin: "16px 0", color: "var(--color-energy)" }}>
          404
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: 24 }}>
          Deze warrior bestaat niet in onze database.
        </p>
        <Link to="/" className="btn-primary">
          Terug naar Discover
        </Link>
      </main>
    </>
  );
}

export default NotFound;
