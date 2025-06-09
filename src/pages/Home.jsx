// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

function Home() {
  const {
    searchQuery,
    setSearchQuery,
    handleSearchAudio,
    audioUrl,
    meta,
    loading,
    videos,
    fetchPlaylist,
    loadSong,
    setCurSongIndex,
  } = useUser();

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const handlePlay = async (video, fallbackIndex) => {
    const index = video.playlist_index ?? fallbackIndex;
    await loadSong(index, video.title);
  };


  return (
    <>
      <div style={{ margin: "20px auto" }}>
        <h1>Welcome Vishal,</h1>
        {loading && <p>Loading...</p>}
      </div>

      <div style={{ margin: "30px auto", textAlign: "center" }}>
        {videos.map((video, index) => {
          const playlistIndex = video.playlist_index ?? index;
          const thumbnailUrl =
            video.thumbnails?.[3]?.url || video.thumbnails?.[0]?.url || "";

          return (
            <div
              key={video.id || index}
              role="button"
              tabIndex={0}
              onClick={() => {
                const playlistIndex = video.playlist_index-1 ?? index;
                setCurSongIndex(video.playlist_index-1 ?? index);
                loadSong(video.original_url);
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
              <img src={thumbnailUrl} alt={video.title} width={500} />
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

      </div>

    </>
  );
}

export default Home;

// 0
// : 
// audioUrl
// : 
// "https://rr5---sn-gwpa-o5be6.googlevideo.com/videoplayback?expire=1749230646&ei=1s9CaLnLEO-l9fwPv8j66As&ip=2405%3A201%3A1000%3A50ae%3A9c0d%3Acc02%3Abf77%3Ace0d&id=o-AFWbSKN_D1PtHk3EsZ-j4WGZy01hlqCdg8nnzyuBn1Ec&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749209046%2C&mh=oP&mm=31%2C29&mn=sn-gwpa-o5be6%2Csn-gwpa-cvhy&ms=au%2Crdu&mv=m&mvi=5&pl=46&rms=au%2Cau&initcwndbps=563750&bui=AY1jyLO1ULgmE1J6OqMNt4vgnvW4cnl5vF3z7Wu5Ap4zSM777AB6DddKJwep7vM1IxuqviuvnDkqpMiz&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=fmOugv9Nm-1Uw0MHPY7LafUQ&rqh=1&gir=yes&clen=6972498&dur=411.321&lmt=1742640758021142&mt=1749208642&fvip=2&keepalive=yes&lmw=1&c=TVHTML5&sefc=1&txp=5532534&n=CY7HT-xoZM8XZA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgXIx-1t2ODudyJndnEO68zumoLA0m3c8QfbV6Bu0YfOICIQDYuBLFUh-byNqzrL-BxDEFuwqlXLVXQ0z-SCLHRHAUqg%3D%3D&sig=AJfQdSswRgIhAP5YfQBstRWfAnbTpc0WR4_XZWEp6GsCzhv04kgOXc7LAiEAp4NekNLS5j1MUg4DNPE5EAJ2_Y86O1u1T5lVov7DIzA%3D"
// duration
// : 
// 411
// id
// : 
// "IjUYIhQDpRw"
// thumbnail
// : 
// "https://i.ytimg.com/vi_webp/IjUYIhQDpRw/maxresdefault.webp"
// title
// : 
// "Humnava Mere (Slowed + Reverb) | Jubin Nautiyal"
// webpage_url
// : 
// "https://www.youtube.com/watch?v=IjUYIhQDpRw"