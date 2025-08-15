import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import PlaylistSection from "./components/PlaylistSection/PlaylistSection";
import Footer from "./components/Footer/Footer";
import SpotifyAuth from "./utils/SpotifyAuth";
import { searchTracks, savePlaylistToSpotify } from "./utils/SpotifyAPI";
import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check if we're returning from Spotify authorization
    if (window.location.search.includes("code=")) {
      const getToken = async () => {
        const accessToken = await SpotifyAuth.getAccessToken();
        if (accessToken) {
          setToken(accessToken);
        }
      };
      getToken();
    }
  }, []);

  const handleLogin = async () => {
    await SpotifyAuth.getAccessToken();
  };

  const handleSearch = async (searchQuery) => {
    setSearchQuery(searchQuery);

    if (token && searchQuery.trim()) {
      setIsSearching(true); // Start loading immediately
      const results = await searchTracks(searchQuery, token);
      setSearchResults(results);
      setIsSearching(false); // Stop loading
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleAddTrack = (track) => {
    const alreadyAdded =
      playlist.filter((playlistTrack) => playlistTrack.id === track.id).length >
      0; // check if already added

    if (alreadyAdded) {
      alert("This song has already been added to your playlist");
    } else {
      setPlaylist((prev) => [...prev, track]); // add track to playlist state
    }
  };

  const handleRemoveTrack = (trackId) => {
    setPlaylist((prev) => prev.filter((track) => track.id !== trackId));
  };

  const handleSavePlaylist = async () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    try {
      const result = await savePlaylistToSpotify(playlistName, playlist, token);
      if (result.success) {
        alert(result.message);
        // clear the playlist after saving
        setPlaylist([]);
        setPlaylistName("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to save playlist. Please try again.");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="app-title">musicNook</h1>
          <p className="app-subtitle">Create your perfect playlist</p>

          <span>
            {!token ? (
              <button className="login-btn" onClick={handleLogin}>
                <span>Log in to Spotify</span>
              </button>
            ) : (
              <p className="logged">Logged in!</p>
            )}
          </span>
        </header>

        <div className="main-content">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} />

            <SearchResults
              searchResults={searchResults}
              searchQuery={searchQuery}
              onAddTrack={handleAddTrack}
              isSearching={isSearching} // Add this prop
            />
          </div>

          <div className="playlist-section">
            <PlaylistSection
              playlist={playlist}
              playlistName={playlistName} // playlist name
              setPlaylistName={setPlaylistName} // updated playlist name
              onRemoveTrack={handleRemoveTrack}
              onSavePlaylist={handleSavePlaylist} // save playlist
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
