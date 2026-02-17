import React from "react";
import MusicCard from "./MusicCard";

function MainContent({
  currentView,
  activePlaylist,
  currentIndex,
  likedSongs,
  onPlayTrack,
  onToggleLike,
  onSearch,
  searchQuery,
  setSearchQuery,
  viewMode,
  onToggleViewMode,
  onShufflePlayAll,
  onPlayAll,
}) {
  const getViewTitle = () => {
    switch (currentView) {
      case "home":
        return { icon: "fas fa-compact-disc", text: "The Classics" };
      case "search":
        return { icon: "fas fa-search", text: "Global Results" };
      case "liked":
        return { icon: "fas fa-heart", text: "Your Favorites" };
      default:
        return { icon: "fas fa-compact-disc", text: "The Classics" };
    }
  };

  const { icon, text } = getViewTitle();

  return (
    <div className="main">
      {currentView === "home" && (
        <div className="hero" id="hero">
          <span className="hero-badge">
            <i className="fas fa-crown"></i> Premium Retro Experience
          </span>
          <h1>Back In 90s & Beyond</h1>
          <p className="hero-subtitle">
            Your favorite 90s tracks • Millions of global hits
          </p>
          <div className="hero-actions">
            <button onClick={onPlayAll} className="hero-btn primary">
              <i className="fas fa-play" style={{ marginRight: "10px" }}></i>{" "}
              Play All
            </button>
            <button onClick={onShufflePlayAll} className="hero-btn secondary">
              <i className="fas fa-random" style={{ marginRight: "10px" }}></i>{" "}
              Shuffle
            </button>
            <button
              onClick={() => { onShufflePlayAll?.() || onPlayAll?.() }}
              className="hero-btn secondary"
            >
              <i className="fas fa-heart" style={{ marginRight: "10px" }}></i>{" "}
              Shuffle All
            </button>
          </div>
        </div>
      )}

      {currentView === "search" && (
        <div className="search-wrapper" id="searchBar">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search songs, artists, albums…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
          <button className="search-btn" onClick={onSearch}>
            <i className="fas fa-search" style={{ marginRight: "8px" }}></i>{" "}
            Search
          </button>
        </div>
      )}

      <div className="view-header">
        <h2 id="viewTitle">
          <i className={icon}></i> {text}
        </h2>
        <div className="view-actions">
          <button className="view-btn" onClick={onToggleViewMode}>
            <i
              className={
                viewMode === "grid" ? "fas fa-th-large" : "fas fa-list"
              }
            ></i>
            {viewMode === "grid" ? " Grid" : " List"}
          </button>
          <button className="view-btn" onClick={onShufflePlayAll}>
            <i className="fas fa-random"></i> Shuffle
          </button>
        </div>
      </div>

      <div
        className="grid"
        style={viewMode === "list" ? { gridTemplateColumns: "1fr" } : {}}
      >
        {activePlaylist.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-music"></i>
            <h3>No tracks found</h3>
            <p>
              {text === "Your Favorites"
                ? "You haven't liked any songs yet"
                : "Try searching for something"}
            </p>
          </div>
        ) : (
          activePlaylist.map((song, idx) => {
            const isLiked = likedSongs.some((s) => s.id === song.id);
            const isCurrent =
              activePlaylist[currentIndex] &&
              activePlaylist[currentIndex].id === song.id;

            return (
              <MusicCard
                key={song.id}
                song={song}
                index={idx}
                isLiked={isLiked}
                isCurrent={isCurrent}
                onPlay={() => onPlayTrack(idx)}
                onToggleLike={() => onToggleLike(idx)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default MainContent;
