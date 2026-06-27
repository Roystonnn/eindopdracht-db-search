import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import goku from "../../assets/login-goku.jpg";
import "./Nav.css";

function Nav() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-mark">⚡</span>
          <span>
            DB <span className="text-energy">search</span>
          </span>
        </Link>

        <nav aria-label="Hoofdnavigatie">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span className="nav-username">{user.username}</span>
              <Link to="/profile" className="nav-avatar" aria-label="Profiel">
                <img src={goku} alt="" />
              </Link>
              <button className="btn-ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-ghost">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
