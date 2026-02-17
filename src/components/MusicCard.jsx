import React from "react";

function MusicCard({ song, index, isLiked, isCurrent, onPlay, onToggleLike }) {
  return (
    <div className="card" data-id={song.id}>
      <div
        className="now-playing-badge"
        style={{ display: isCurrent ? "flex" : "none" }}
      >
        <i
          className="fas fa-play"
          style={{ fontSize: "0.6rem", marginRight: "4px" }}
        ></i>{" "}
        NOW
      </div>
      <div className="art-wrap" onClick={onPlay}>
        {song.isLocal ? (
          <div
            style={{
              fontSize: "3.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {song.art}
          </div>
        ) : (
          <img
            src={song.art}
            alt={song.title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500/1a1a2a/60c0ff?text=🎵";
            }}
          />
        )}
        <div className="play-overlay">
          <i className="fas fa-play"></i>
        </div>
      </div>
      <div className="card-content">
        <div className="card-text">
          <div className="card-title">{song.title}</div>
          <div className="card-artist">{song.artist}</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className={`like-btn ${isLiked ? "liked" : ""}`}
          title={isLiked ? "Remove from Liked" : "Add to Liked"}
        >
          <i className={isLiked ? "fas" : "far"}></i>
        </button>
      </div>
    </div>
  );
}

export default MusicCard;
