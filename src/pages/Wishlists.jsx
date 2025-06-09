import React, { useEffect } from 'react'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useUser } from '../contexts/UserContext';

const Wishlists = () => {
  const { loadLocalPlaylist,setCurSongIndex } = useUser();
  const storedPlaylist = localStorage.getItem("Playlist");
  const parsedPlaylist = JSON.parse(storedPlaylist);


  return (
    <div style={{ margin: "20px auto" }}>
      <h1>Wishlists</h1>
      {parsedPlaylist && (
        <>
          {parsedPlaylist.map((video, index) => {
            const thumbnailUrl =
              video.thumbnail;

            return (
              <div
                key={video.id || index}
                role="button"
                tabIndex={0}
                onClick={() => {
                  loadLocalPlaylist(video, index);
                  setCurSongIndex(index)
                }}

                onKeyDown={(e) => e.key === "Enter" && handlePlay(video, index)}
                style={{
                  marginBottom: 20,
                  textAlign: "left",
                  display: "flex",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <img src={thumbnailUrl} alt={video.id} width={500} />
                <p><strong>{video.title}</strong></p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </a>
              </div>
            );
          })}
        </>
      )}
    </div>
  )
}

export default Wishlists