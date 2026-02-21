import React, { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import AuthOverlay from "./components/AuthOverlay";
import Sidebar from "./components/Slidebar";
import MainContent from "./components/MainContent";
import PlayerBar from "./components/PlayerBar";
import UserHeader from "./components/UserHeader";
import SettingModal from "./components/SettingModal";
import Notifications from "./components/Notifications";

// Original tracks data
const localTracks = [
  {
    id: "l1",
    title: "Hamdard",
    artist: "Arijit Singh",
    url: "/music/hamdard.mp3",
    art: "💔",
    isLocal: true,
  },
  {
    id: "l2",
    title: "Bombay Dreams",
    artist: "Kavita Seth",
    url: "/music/bombay_dreams.mp3",
    art: "🌆",
    isLocal: true,
  },
  {
    id: "l3",
    title: "Tu Jhoom",
    artist: "Naseebo Lal x Abida Parveen",
    url: "/music/tu_jhoom.mp3",
    art: "✨",
    isLocal: true,
  },
  {
    id: "l4",
    title: "Hamari Adhuri Kahani",
    artist: "Arijit Singh",
    url: "/music/hamari_adhuri_kahani.mp3",
    art: "🌧️",
    isLocal: true,
  },
  {
    id: "l5",
    title: "Aaj Bhi",
    artist: "Vishal Mishra",
    url: "/music/aaj_bhi.mp3",
    art: "🕯️",
    isLocal: true,
  },
  {
    id: "l6",
    title: "Aaoge Tum Kabhi",
    artist: "The Local Train",
    url: "/music/aaoge_tum_kabhi.mp3",
    art: "🎸",
    isLocal: true,
  },
  {
    id: "l7",
    title: "Banjara",
    artist: "Ankit Tiwari",
    url: "/music/banjara.mp3",
    art: "👣",
    isLocal: true,
  },
  {
    id: "l8",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    url: "/music/pal_pal_dil_ke_paas.mp3",
    art: "📻",
    isLocal: true,
  },
  {
    id: "l9",
    title: "Kun Faaya Kun",
    artist: "A.R. Rahman",
    url: "/music/kun_faaya_kun.mp3",
    art: "🕌",
    isLocal: true,
  },
];

function App() {
  // State management
  const [activePlaylist, setActivePlaylist] = useState([...localTracks]);
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });
  const [repeatMode, setRepeatMode] = useState(0);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedAccounts, setSavedAccounts] = useState(() => {
    const saved = localStorage.getItem("savedAccounts");
    return saved ? JSON.parse(saved) : [];
  });
  const [showAuth, setShowAuth] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notification, setNotification] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const errorCountRef = useRef(0); // To prevent infinite skipping loops

  // Notification function
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Music functions - playTrack helper
  const playTrack = useCallback((idx) => {
    if (!activePlaylist[idx] || !activePlaylist[idx].url) {
      showNotification("This track is not available for playback", "warning");
      return;
    }

    errorCountRef.current = 0; // Reset error count on successful play attempt
    setCurrentIndex(idx);
    const track = activePlaylist[idx];

    console.log(`🎵 Attempting to play: ${track.title}`, track.url);

    // Set audio source and play
    audioRef.current.src = track.url;
    audioRef.current.load(); // Ensure the new source is loaded
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        if (error.name !== 'AbortError') {
          console.error("Playback failed:", error);
        }
        setIsPlaying(false);
      });
    }

    // Add to recently played
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((t) => t.id !== track.id);
      return [track, ...filtered].slice(0, 20);
    });

    showNotification(`Now playing: ${track.title}`, "info");
  }, [activePlaylist, showNotification]);

  const handlePlayToggle = useCallback(() => {
    if (!audioRef.current.src) {
      if (activePlaylist.length > 0) {
        playTrack(0);
      }
      return;
    }

    if (audioRef.current.paused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Playback failed:", error);
          }
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [activePlaylist, playTrack]);

  const nextTrack = useCallback(() => {
    if (activePlaylist.length === 0) {
      showNotification("No tracks in playlist", "warning");
      return;
    }

    let newIndex;
    if (shuffleOn) {
      do {
        newIndex = Math.floor(Math.random() * activePlaylist.length);
      } while (newIndex === currentIndex && activePlaylist.length > 1);
    } else {
      newIndex = (currentIndex + 1) % activePlaylist.length;
    }
    playTrack(newIndex);
  }, [activePlaylist, shuffleOn, currentIndex, playTrack, showNotification]);

  const prevTrack = useCallback(() => {
    if (activePlaylist.length === 0) {
      showNotification("No tracks in playlist", "warning");
      return;
    }

    let newIndex;
    if (shuffleOn) {
      do {
        newIndex = Math.floor(Math.random() * activePlaylist.length);
      } while (newIndex === currentIndex && activePlaylist.length > 1);
    } else {
      newIndex =
        (currentIndex - 1 + activePlaylist.length) % activePlaylist.length;
    }
    playTrack(newIndex);
  }, [activePlaylist, shuffleOn, currentIndex, playTrack, showNotification]);

  // Save liked songs to localStorage
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Save saved accounts to localStorage
  useEffect(() => {
    localStorage.setItem("savedAccounts", JSON.stringify(savedAccounts));
  }, [savedAccounts]);

  // Save recently played to localStorage
  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      // Will be handled in PlayerBar component
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (repeatMode === 2) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch(error => {
            console.error("Repeat playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else if (repeatMode === 1 || shuffleOn) {
        nextTrack();
      } else if (currentIndex < activePlaylist.length - 1) {
        nextTrack();
      } else {
        showNotification("Playlist ended", "info");
      }
    };

    const handleError = () => {
      setIsPlaying(false);
      
      // Log detailed error for debugging
      console.error("Audio Error:", audio.error);
      console.error("Failed Source:", audio.src);

      const errorCode = audio.error?.code;
      let message = "Playback error.";

      if (errorCode === 4) {
        const fileName = audio.src.split('/').pop(); // Get just the filename
        message = `Missing file: "${decodeURIComponent(fileName)}". Check public/music/ folder.`;
        
        // Auto-skip logic
        if (errorCountRef.current < 3 && activePlaylist.length > 1) {
          errorCountRef.current += 1;
          showNotification(`Skipping missing track: ${activePlaylist[currentIndex].title}`, "warning");
          setTimeout(() => nextTrack(), 1000);
          return;
        }
      }
      
      showNotification(message, "error");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [repeatMode, shuffleOn, currentIndex, activePlaylist, nextTrack, showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && !e.target.matches("input, textarea, button")) {
        e.preventDefault();
        handlePlayToggle();
      }
      if (e.key === "ArrowRight" && e.ctrlKey) {
        e.preventDefault();
        nextTrack();
      }
      if (e.key === "ArrowLeft" && e.ctrlKey) {
        e.preventDefault();
        prevTrack();
      }
      if (e.key === "Escape") {
        setShowSettings(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlePlayToggle, nextTrack, prevTrack]);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".user-header") &&
        !e.target.closest("#userDropdown")
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Auth functions
  const handleLogin = (name, handle) => {
    setCurrentUser({ name, handle });
    setIsAuthenticated(true);
    setShowAuth(false);
    showNotification(`Welcome, ${name}!`);
  };

  const handleLogout = (withConfirm = false) => {
    if (!withConfirm || window.confirm("Sign out of Back In 90s?")) {
      setCurrentUser(null);
      setIsAuthenticated(false);
      setShowAuth(true);
      setShowSettings(false);
      showNotification("Signed out successfully");
    }
  };

  const handleSocialLogin = (provider) => {
    showNotification(`Connecting with ${provider}...`, "info");
    const name =
      provider === "google"
        ? "Google User"
        : provider === "spotify"
          ? "Spotify User"
          : "Apple User";
    const handle = `@${provider}user`;

    if (!savedAccounts.find((a) => a.name === name)) {
      setSavedAccounts([...savedAccounts, { name, handle }]);
    }
    handleLogin(name, handle);
  };

  // Navigation
  const navigate = (view) => {
    setCurrentView(view);
    if (view === "home") {
      setActivePlaylist([...localTracks]);
    } else if (view === "liked") {
      setActivePlaylist(likedSongs);
    }
  };

  // Music functions - other helpers
  const toggleLike = (idx) => {
    const song = activePlaylist[idx];
    const existing = likedSongs.findIndex((s) => s.id === song.id);

    if (existing > -1) {
      setLikedSongs(likedSongs.filter((_, i) => i !== existing));
      showNotification(`Removed "${song.title}" from Liked`, "success");
    } else {
      setLikedSongs([...likedSongs, song]);
      showNotification(`Added "${song.title}" to Liked`, "success");
    }
  };

  const cycleRepeat = () => {
    const newMode = (repeatMode + 1) % 3;
    setRepeatMode(newMode);
    const modes = ["Off", "All", "One"];
    showNotification(`Repeat: ${modes[newMode]}`, "info");
  };

  const toggleShuffle = () => {
    setShuffleOn(!shuffleOn);
    showNotification(`Shuffle ${!shuffleOn ? "On" : "Off"}`, "info");
  };

  const setVolume = (v) => {
    audioRef.current.volume = v / 100;
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  // Search function
  const apiSearch = async () => {
    if (!searchQuery) {
      showNotification("Please enter a search term", "warning");
      return;
    }

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&limit=25`,
      );
      const data = await res.json();
      const results = data.results
        .filter((t) => t.previewUrl) // Only include tracks with valid preview URLs
        .map((t) => ({
          id: t.trackId,
          title: t.trackName,
          artist: t.artistName,
          url: t.previewUrl,
          art: t.artworkUrl100.replace("100x100", "500x500"),
          isLocal: false,
        }));
      setActivePlaylist(results);
      showNotification(`Found ${results.length} tracks for "${searchQuery}"`);
    } catch (e) {
      showNotification("Search failed. Please try again.", "error");
      console.error(e);
    }
  };

  // Playlist functions
  const loadPlaylist = (type) => {
    showNotification(`Loading ${type.replace("-", " ")}...`, "info");

    setTimeout(() => {
      if (type === "recently-played") {
        setActivePlaylist(
          recentlyPlayed.length > 0 ? recentlyPlayed : localTracks.slice(0, 5),
        );
      } else if (type === "top-charts") {
        setActivePlaylist(
          [...localTracks].sort(() => Math.random() - 0.5).slice(0, 8),
        );
      } else if (type === "90s-retro") {
        setActivePlaylist(localTracks.slice(0, 6));
      }
      showNotification(`Loaded ${activePlaylist.length} tracks`);
    }, 500);
  };

  const createNewPlaylist = () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
      showNotification(`Created playlist: ${playlistName}`, "success");
    }
  };

  const upgradeToPremium = () => {
    showNotification("Premium upgrade coming soon!", "info");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
    showNotification(
      `Switched to ${viewMode === "grid" ? "list" : "grid"} view`,
      "info",
    );
  };

  const playAllTracks = () => {
    if (activePlaylist.length > 0) {
      playTrack(0);
      showNotification("Playing all tracks", "success");
    }
  };

  const shufflePlayAll = () => {
    if (activePlaylist.length > 0) {
      const randomIndex = Math.floor(Math.random() * activePlaylist.length);
      playTrack(randomIndex);
      showNotification("Shuffle playing all tracks", "success");
    }
  };

  return (
    <div className="app">
      <audio ref={audioRef} preload="auto" loop={false} />
      {showAuth && (
        <AuthOverlay
          onLogin={handleLogin}
          onSocialLogin={handleSocialLogin}
          savedAccounts={savedAccounts}
          showNotification={showNotification}
        />
      )}

      {isAuthenticated && (
        <>
          <UserHeader
            currentUser={currentUser}
            showUserMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
            onLogout={handleLogout}
            onOpenSettings={() => setShowSettings(true)}
            onNavigate={navigate}
            showNotification={showNotification}
          />

          <Sidebar
            currentView={currentView}
            onNavigate={navigate}
            onLoadPlaylist={loadPlaylist}
            onCreatePlaylist={createNewPlaylist}
            onUpgrade={upgradeToPremium}
          />

          <MainContent
            currentView={currentView}
            activePlaylist={activePlaylist}
            currentIndex={currentIndex}
            likedSongs={likedSongs}
            onPlayTrack={playTrack}
            onToggleLike={toggleLike}
            onSearch={apiSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            onToggleViewMode={toggleViewMode}
            onShufflePlayAll={shufflePlayAll}
            onPlayAll={playAllTracks}
          />

          <PlayerBar
            currentTrack={activePlaylist[currentIndex]}
            audioRef={audioRef}
            isPlaying={isPlaying}
            onPlayToggle={handlePlayToggle}
            onNext={nextTrack}
            onPrev={prevTrack}
            onShuffle={toggleShuffle}
            onRepeat={cycleRepeat}
            onVolumeChange={setVolume}
            onSeek={seek}
            shuffleOn={shuffleOn}
            repeatMode={repeatMode}
          />

          <SettingModal
            show={showSettings}
            onClose={() => setShowSettings(false)}
            savedAccounts={savedAccounts}
            onLogin={handleLogin}
            onLogout={handleLogout}
            showNotification={showNotification}
          />
        </>
      )}

      {notification && (
        <Notifications
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default App;
