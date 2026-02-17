import React from "react";

function UserHeader({
  currentUser,
  showUserMenu,
  setShowUserMenu,
  onLogout,
  onOpenSettings,
  onNavigate,
  showNotification,
}) {
  const initial = currentUser?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="user-header" id="userHeader">
      <div className="user-pill" onClick={() => setShowUserMenu(!showUserMenu)}>
        <div className="user-avatar" id="pillInitial">
          {initial}
        </div>
        <span
          id="displayUserName"
          style={{ fontSize: "0.95rem", fontWeight: "600" }}
        >
          {currentUser?.name || "User"}
        </span>
        <i
          className="fas fa-chevron-down"
          style={{ fontSize: "0.9rem", color: "var(--muted)" }}
        ></i>
      </div>

      {showUserMenu && (
        <div className="user-dropdown" id="userDropdown">
          <div className="dropdown-info">
            <div
              className="user-avatar"
              id="dropdownInitial"
              style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}
            >
              {initial}
            </div>
            <div className="info-text">
              <h4 id="fullUserName">{currentUser?.name || "User Name"}</h4>
              <p id="userHandle" style={{ color: "var(--muted)" }}>
                {currentUser?.handle || "@userhandle"}
              </p>
              <a
                href="#"
                className="manage-link"
                onClick={(e) => {
                  e.preventDefault();
                  showNotification("Account management coming soon!", "info");
                }}
              >
                <i className="fas fa-user-edit"></i> Manage Account
              </a>
            </div>
          </div>
          <button onClick={() => onNavigate("home")}>
            <i className="far fa-user-circle"></i> Your Profile
          </button>
          <button onClick={() => onNavigate("liked")}>
            <i className="fas fa-heart"></i> Liked Songs
          </button>
          <button onClick={onOpenSettings}>
            <i className="fas fa-cog"></i> Settings
          </button>
          <button onClick={() => onLogout(true)}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserHeader;
