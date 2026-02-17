import React from "react";

function Sidebar({
  currentView,
  onNavigate,
  onLoadPlaylist,
  onCreatePlaylist,
  onUpgrade,
}) {
  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fas fa-record-vinyl"></i> <span>Back In 90s</span>
      </div>

      <div className="nav-section">
        <div className="nav-label">Navigation</div>
        <div
          className={`nav-item ${currentView === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
        >
          <i className="fas fa-home"></i> <span>Home</span>
        </div>
        <div
          className={`nav-item ${currentView === "search" ? "active" : ""}`}
          onClick={() => onNavigate("search")}
        >
          <i className="fas fa-search"></i> <span>Search Library</span>
        </div>
        <div
          className={`nav-item ${currentView === "liked" ? "active" : ""}`}
          onClick={() => onNavigate("liked")}
        >
          <i className="fas fa-heart"></i> <span>Liked</span>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Playlists</div>
        <div
          className="playlist-item"
          onClick={() => onLoadPlaylist("recently-played")}
        >
          <i className="fas fa-list-music"></i> <span>Recently Played</span>
        </div>
        <div
          className="playlist-item"
          onClick={() => onLoadPlaylist("top-charts")}
        >
          <i className="fas fa-fire"></i> <span>Top Charts</span>
        </div>
        <div
          className="playlist-item"
          onClick={() => onLoadPlaylist("90s-retro")}
        >
          <i className="fas fa-clock"></i> <span>90s Retro Mix</span>
        </div>
        <div className="playlist-item" onClick={onCreatePlaylist}>
          <i
            className="fas fa-plus-circle"
            style={{ color: "var(--accent)" }}
          ></i>{" "}
          <span>Create Playlist</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="premium-card">
          <div className="premium-header">
            <i className="fas fa-crown"></i>
            <span>Premium</span>
          </div>
          <div className="premium-sub">Unlock all features</div>
          <button className="upgrade-btn" onClick={onUpgrade}>
            <i className="fas fa-arrow-up"></i> Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
