// src/pages/Playlist.jsx
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";


function Playlist() {
  const { setLoadedSongs,  } = useUser();
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPlaylist = async () => {
    if (!playlistUrl) return alert("Enter a playlist URL");

    setLoading(true);
    try {
      const res = await axios.get("http://192.168.29.144:4000/api/getPlaylistMetaUrl", {
        params: { playlistUrl },
      });
      // setVideos(res.data);
      localStorage.setItem("Playlist", JSON.stringify(res.data));
      await setLoadedSongs(res.data)
      alert("Playlist fetched successfully");
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "30px auto", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", }}>
        <h2>🎵 Fetch YouTube Playlist</h2>
        <input
          type="text"
          placeholder="Enter YouTube playlist URL"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={fetchPlaylist}>Fetch Playlist</button>
      </div>

      {loading && <p>Loading...</p>}
{/* 
      {videos.length > 0 && (
        <div style={{ marginTop: 20, width: "100%", }}>
          {videos.map((video, index) => (
            <div key={video.id || index} style={{ marginBottom: 20, textAlign: "left", display: "flex", cursor: "pointer",  }}>
              <img src={video.thumbnails[3].url} alt={video.title} width={500} />
              <p><strong>{video.title}</strong></p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default Playlist;
