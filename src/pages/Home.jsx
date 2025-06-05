// src/pages/Home.jsx
import React, { useEffect } from "react";
import Player from "../components/Player";
import { useUser } from "../contexts/UserContext";

function Home() {
  const { searchQuery, setSearchQuery, handleSearchAudio, audioUrl, meta, loading, videos, fetchPlaylist, loadSong, setCurSongIndex, handleBufferedSong } = useUser();

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <>
      <div style={{ margin: "20px auto", }}>
        <h1>Welcome Vishal,</h1>
        {loading && <p>Loading...</p>}

        {/* {meta && (
          <div style={{ marginTop: 20 }}>
            <img src={meta.thumbnail} alt={meta.title} width={200} />
            <h3>{meta.title}</h3>
          </div>
        )} */}

        {/* {audioUrl && (
          <div style={{ marginTop: 30 }}>
            <a href={audioUrl} download target="_blank" rel="noopener noreferrer">
              <button>⬇️ Download</button>
            </a>
          </div>
        )} */}
      </div>


      <div style={{ margin: "30px auto", textAlign: "center" }}>
        {videos.length > 0 && (
          <div style={{ marginTop: 20, width: "100%", }}>
            {videos.map((video, index) => (
              <div onClick={async () => {
                await setCurSongIndex(video.playlist_index);
                console.log(video.playlist_index, "index in home page");
                await loadSong(video.title)
                handleBufferedSong(video.playlist_index);
              }} key={video.id || index} style={{ marginBottom: 20, textAlign: "left", display: "flex", cursor: "pointer", }}>
                <img src={video.thumbnails[3].url} alt={video.title} width={500} />
                <p><strong>{video.title}</strong></p>
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                  Watch on YouTube
                </a>
              </div>
            ))}
          </div>
        )}
      </div>


    </>
  );
}

export default Home;
