import React, { useState, useEffect } from "react";

function PlayerBar({
  currentTrack,
  audioRef,
  isPlaying,
  onPlayToggle,
  onNext,
  onPrev,
  onShuffle,
  onRepeat,
  onVolumeChange,
  onSeek,
  shuffleOn,
  repeatMode,
}) {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);

        const m = Math.floor(audio.currentTime / 60);
        const s = Math.floor(audio.currentTime % 60);
        setCurrentTime(`${m}:${s < 10 ? "0" : ""}${s}`);

        if (!isNaN(audio.duration)) {
          const totalM = Math.floor(audio.duration / 60);
          const totalS = Math.floor(audio.duration % 60);
          setTotalTime(`${totalM}:${totalS < 10 ? "0" : ""}${totalS}`);
        }
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef]);

  const handleVolumeChange = (e) => {
    const val = e.target.value;
    setVolume(val);
    onVolumeChange(val);
  };

  const getVolumeIcon = () => {
    if (volume == 0) return "fa-volume-mute";
    if (volume < 50) return "fa-volume-down";
    return "fa-volume-up";
  };

  return (
    <div className="player-bar">
      <div className="song-details">
        <div className="mini-art" id="playerArt">
          {currentTrack ? (
            currentTrack.isLocal ? (
              <div
                style={{
                  fontSize: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {currentTrack.art}
              </div>
            ) : (
              <img
                src={currentTrack.art}
                alt={currentTrack.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/80/1a1a2a/60c0ff?text=🎵";
                }}
              />
            )
          ) : (
            "🎵"
          )}
        </div>
        <div className="player-text">
          <div className="player-title" id="playerTitle">
            {currentTrack ? currentTrack.title : "Ready to play"}
          </div>
          <div className="player-artist" id="playerArtist">
            {currentTrack ? currentTrack.artist : "Choose a track"}
          </div>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-btns">
          <button
            id="shuffleBtn"
            onClick={onShuffle}
            title="Shuffle"
            style={{ color: shuffleOn ? "var(--accent)" : "var(--muted)" }}
          >
            <i className="fas fa-random"></i>
          </button>
          <button onClick={onPrev} title="Previous">
            <i className="fas fa-step-backward"></i>
          </button>
          <button
            onClick={onPlayToggle}
            className="main-play"
            id="masterPlay"
            title={isPlaying ? "Pause" : "Play"}
          >
            <i
              className={`fas ${isPlaying ? "fa-pause-circle" : "fa-play-circle"}`}
            ></i>
          </button>
          <button onClick={onNext} title="Next">
            <i className="fas fa-step-forward"></i>
          </button>
          <button
            id="repeatBtn"
            onClick={onRepeat}
            title="Repeat"
            style={{
              color: repeatMode === 0 ? "var(--muted)" : "var(--accent)",
            }}
          >
            <i className="fas fa-redo-alt"></i>
            <div
              className="repeat-badge"
              id="repeatOneBadge"
              style={{ display: repeatMode === 2 ? "flex" : "none" }}
            >
              1
            </div>
          </button>
        </div>
        <div className="progress-wrap">
          <span id="currentTime">{currentTime}</span>
          <div className="seek-bar" id="seekBar" onClick={onSeek}>
            <div
              className="seek-fill"
              id="seekFill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span id="totalTime">{totalTime}</span>
        </div>
      </div>

      <div className="volume-box">
        <i className={`fas ${getVolumeIcon()}`} id="volumeIcon"></i>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          id="volumeSlider"
        />
      </div>
    </div>
  );
}

export default PlayerBar;
