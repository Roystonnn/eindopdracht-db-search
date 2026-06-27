import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import hero from "../../assets/login-goku.jpg";
import "../Auth.css";

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }
    setBusy(true);
    try {
      await register({ email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <aside className="auth-visual">
        <img src={hero} alt="afbeelding van goku" />
        <div className="auth-visual-text">
          <p className="discover-kicker">// Bedankt voor het joinen</p>
          <h2>
            Verken het universum met{" "}
            <span className="text-energy">DB search</span>
          </h2>
        </div>
      </aside>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Link to="/" className="nav-logo" style={{ marginBottom: 16 }}>
            <span className="nav-logo-mark">⚡</span>
            DB <span className="text-energy">Search</span>
          </Link>

          <h1 className="auth-title">Sign up</h1>
          <p className="auth-sub">
            Maak een account aan om favorieten op te slaan.
          </p>

          <div className="auth-tabs">
            <Link to="/signin" className="auth-tab">
              Log In
            </Link>
            <Link to="/signup" className="auth-tab auth-tab-active">
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
            <label htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="pw2">Confirm password</label>
            <input
              id="pw2"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && (
            <p className="profile-msg profile-msg-err">{error}</p>
          )}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? "Bezig…" : "sign up"}
          </button>

          <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            Al een account?{" "}
            <Link to="/signin" className="text-energy">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
