import "./StatBar.css";

function StatBar({ label, value }) {
  const safe = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="stat-bar">
      <div className="stat-bar-head">
        <span>{label}</span>
        <span className="stat-bar-value">{safe}</span>
      </div>
      <div
        className="stat-bar-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="stat-bar-fill" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}

export default StatBar;
