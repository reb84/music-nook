import { Music, Plus, Trash2 } from "lucide-react";
import "./TrackItem.css";

const TrackItem = ({
  track,
  onAdd,
  onRemove,
  showAddButton = true,
  showRemoveButton = false,
}) => {
  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="track">
      <div className="track-info">
        <div className="track-art">
          {track.image ? (
            <img
              src={track.image}
              alt={`${track.album} cover`}
              className="cover-art"
            />
          ) : (
            <div className="placeholder-art">
              <Music size={24} color="white" />
            </div>
          )}
        </div>

        <div>
          <h3 className="track-title">{track.name}</h3>
          <p className="track-artist">{track.artist}</p>
          <p className="track-album">{track.album}</p>
          <p className="duration">{formatDuration(track.duration_ms)}</p>
        </div>
      </div>

      <div className="track-actions">
        {showAddButton && (
          <button className="add-button" onClick={() => onAdd(track)}>
            <Plus size={16} color="white" />
          </button>
        )}
        {showRemoveButton && (
          <button className="remove-button" onClick={() => onRemove(track.id)}>
            <Trash2 size={16} color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackItem;
