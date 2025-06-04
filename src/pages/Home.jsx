// src/pages/Home.jsx
import React from "react";
import Player from "../components/Player";
import { useUser } from "../contexts/UserContext";

function Home() {
  const { searchQuery, setSearchQuery, handleSearchAudio, audioUrl, meta, loading } = useUser();

  return (
    <div style={{  margin: "20px auto",  }}>
      <h1>Welcome Vishal,</h1>
      {loading && <p>Loading...</p>}

      {meta && (
        <div style={{ marginTop: 20 }}>
          <img src={meta.thumbnail} alt={meta.title} width={200} />
          <h3>{meta.title}</h3>
        </div>
      )}

      {audioUrl && (
        <div style={{ marginTop: 30 }}>
          <Player url={audioUrl} />
          <br />
          <a href={audioUrl} download target="_blank" rel="noopener noreferrer">
            <button>⬇️ Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
