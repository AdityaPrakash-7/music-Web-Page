import React, { useState } from "react";

function SettingsModal({
  show,
  onClose,
  savedAccounts,
  onLogin,
  onLogout,
  showNotification,
}) {
  const [showAccounts, setShowAccounts] = useState(false);

  if (!show) return null;

  return (
    <div id="settingsModal">
      <div className="settings-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>
            <i className="fas fa-cog"></i> Settings
          </h2>
          <i
            className="fas fa-times"
            onClick={onClose}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "var(--muted)",
              padding: "8px",
              borderRadius: "50%",
              transition: "var(--transition)",
            }}
          ></i>
        </div>

        <div className="settings-option">
          <div>
            <div style={{ fontWeight: "600", marginBottom: "5px" }}>
              Audio Quality
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              High quality audio streaming
            </div>
          </div>
          <select
            className="settings-btn"
            id="audioQuality"
            onChange={(e) =>
              showNotification(
                `Audio quality set to: ${e.target.value}`,
                "info",
              )
            }
          >
            <option>High (320kbps)</option>
            <option>Normal (192kbps)</option>
            <option>Low (128kbps)</option>
          </select>
        </div>

        <div className="settings-option">
          <div>
            <div style={{ fontWeight: "600", marginBottom: "5px" }}>Theme</div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Interface appearance
            </div>
          </div>
          <select
            className="settings-btn"
            id="themeSelect"
            onChange={(e) =>
              showNotification(`Theme set to: ${e.target.value}`, "info")
            }
          >
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>

        <div className="settings-option">
          <div>
            <div style={{ fontWeight: "600", marginBottom: "5px" }}>
              Streaming Region
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Content availability
            </div>
          </div>
          <select
            className="settings-btn"
            id="regionSelect"
            onChange={(e) =>
              showNotification(`Region set to: ${e.target.value}`, "info")
            }
          >
            <option>Global</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>

        <div style={{ marginTop: "30px" }}>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
              color: "var(--muted)",
            }}
          >
            Account Management
          </p>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              className="settings-btn"
              onClick={() => setShowAccounts(!showAccounts)}
              style={{
                flex: "1",
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                color: "black",
                fontWeight: "600",
              }}
            >
              Switch Account
            </button>
            <button
              className="settings-btn"
              onClick={() => onLogout(false)}
              style={{ flex: "1" }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {showAccounts && (
          <div
            id="existingAccountsSection"
            style={{ display: "block", marginTop: "20px" }}
          >
            <div id="accountsList">
              {savedAccounts.length === 0 ? (
                <p
                  style={{
                    color: "var(--muted)",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No accounts found.
                </p>
              ) : (
                savedAccounts.map((acc, index) => (
                  <div
                    key={index}
                    className="account-item"
                    onClick={() => {
                      onLogin(acc.name, acc.handle);
                      onClose();
                    }}
                  >
                    <div
                      className="user-avatar"
                      style={{
                        width: "28px",
                        height: "28px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {acc.name.charAt(0)}
                    </div>
                    <span style={{ flex: "1" }}>{acc.name}</span>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsModal;
