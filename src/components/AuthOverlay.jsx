import React, { useState } from "react";

function AuthOverlay({
  onLogin,
  onSocialLogin,
  savedAccounts,
  showNotification,
}) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!isLoginMode && !name) {
      setError("Please enter your name");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const finalName = isLoginMode ? email.split("@")[0] : name;
    const handle = "@" + finalName.toLowerCase().replace(/\s/g, "");

    onLogin(finalName, handle);
  };

  return (
    <div id="authOverlay">
      <div className="auth-card">
        <h2 id="authTitle">
          {isLoginMode ? "Welcome Back " : "Create Account "}
          <i className="fas fa-heart"></i> <i className="fas fa-headphones"></i>
        </h2>
        <p className="subtitle" id="authSubtitle">
          {isLoginMode
            ? "Log in to continue your musical journey"
            : "Join us for the ultimate music experience"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  style={{ width: "16px", height: "16px" }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="rememberMe"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    cursor: "pointer",
                  }}
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  showNotification("Password reset coming soon!", "info");
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          {error && (
            <div style={{
              background: "rgba(255, 152, 0, 0.15)",
              border: "1px solid #FF9800",
              color: "#FF9800",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              marginBottom: "16px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <button type="submit" className="btn-login">
            {isLoginMode ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="social-btn" onClick={() => onSocialLogin("google")}>
          <i className="fab fa-google"></i> Continue with Google
        </button>
        <button className="social-btn" onClick={() => onSocialLogin("spotify")}>
          <i className="fab fa-spotify" style={{ color: "#1DB954" }}></i>{" "}
          Continue with Spotify
        </button>

        <div className="toggle-area">
          <span id="toggleText">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <span
            className="toggle-link"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError("");
            }}
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;
