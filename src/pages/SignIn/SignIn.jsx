import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import hero from "../../assets/login-goku.jpg";
import "../Auth.css";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <aside className="auth-visual">
        <img src={hero} alt="" />
        <div className="auth-visual-text">
          <p className="discover-kicker">// DB search</p>
          <h2>
            Welkom terug, <br />
            <span className="text-energy">warrior</span>
          </h2>
        </div>
      </aside>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Link to="/" className="nav-logo" style={{ marginBottom: 16 }}>
            <span className="nav-logo-mark">⚡</span>
            DB <span className="text-energy">Search</span>
          </Link>

          <h1 className="auth-title">Sign In</h1>
          <p className="auth-sub">
            Vul je gegevens in om door te gaan.{" "}
            <span className="text-energy">Kamehameha!</span>
          </p>

          <div className="auth-tabs">
            <Link to="/signin" className="auth-tab auth-tab-active">
              Sign In
            </Link>
            <Link to="/signup" className="auth-tab">
              Sign Up
            </Link>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="pw">Wachtwoord</label>
            <input
              id="pw"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="profile-msg profile-msg-err">{error}</p>
          )}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? "Bezig…" : "Enter DB Search"}
          </button>

          <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            Nog geen account?{" "}
            <Link to="/signup" className="text-energy">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default SignIn;
