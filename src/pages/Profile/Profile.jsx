import Nav from "../../components/Nav/Nav.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import goku from "../../assets/login-goku.jpg";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const msg = {
    type: "info",
    text: "De NOVI backend API ondersteunt op dit moment geen profiel-updates. Je gegevens zijn read-only.",
  };

  return (
    <div className="profile">
      <Nav />
      <div className="container">
        <div className="profile-card">
          <section className="profile-hero">
            <p className="discover-kicker">// profiel</p>
            <h1>
              Hallo,
              <br />
              <span className="text-energy">{user?.username || "Warrior"}</span>
            </h1>
            <p style={{ marginTop: 16, maxWidth: "40ch" }}>
              Beheer je warrior identity. Pas je e-mailadres aan, ververs je credentials
              en houd je profile up-to-date.
            </p>
          </section>

          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <div className="profile-avatar">
              <img src={goku} alt="" />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div className="field">
              <label>Roles</label>
              <input
                  type="text"
                  value={(user?.roles || []).join(", ") || "user"}
                  readOnly
              />
            </div>
            <p className={`profile-msg profile-msg--${msg.type}`}>{msg.text}</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="btn-ghost" onClick={logout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
