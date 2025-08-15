import TrackItem from "../TrackItem/TrackItem";
import { Play, Save } from "lucide-react";
import "./PlaylistSection.css";

const PlaylistSection = ({
  playlist,
  onRemoveTrack,
  playlistName,
  setPlaylistName,
  onSavePlaylist,
}) => {
  return (
    <div className="playlist">
      <div className="playlist-header">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="playlist-title"
          placeholder="My Playlist"
        />
      </div>

      <div className="track-list">
        {playlist.length > 0 ? (
          // maps through each track in playlist
          playlist.map((track, index) => (
            <div key={`${track.id}-${index}`} className="playlist-track">
              <div className="playlist-track-content">
                <TrackItem
                  track={track} // track data
                  onRemove={onRemoveTrack} // remove track
                  showAddButton={false}
                  showRemoveButton={true}
                />
              </div>
            </div>
          ))
        ) : (
          // empty playlist
          <div className="playlist-empty">
            <Play size={64} color="#4b5563" />
            <p className="empty-playlist-text">Your playlist is empty</p>
            <p className="empty-playlist-subtext">
              Search and add songs to get started!
            </p>
          </div>
        )}
      </div>

      <div className="save-section">
        {playlist.length > 0 && (
          <button onClick={onSavePlaylist} className="save-btn">
            <span>
              <Save className="save-icon" size={16} />
              Save to Spotify
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaylistSection;
