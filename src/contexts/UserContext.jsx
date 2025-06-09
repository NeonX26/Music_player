// src/contexts/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [curSongIndex, setCurSongIndex] = useState(0);
    const [videos, setVideos] = useState([]);
    const [songData, setSongData] = useState(null);
    const [loadedSongs, setLoadedSongs] = useState([]);



    const [songLoading, setSongLoading] = useState(false);

    const playlistUrl = "https://youtube.com/playlist?list=PLLlb2C74bLzdu9dUe9QiuCMq-cLJtIbDZ&si=5QkBWHzr4GDf3hyB";
    const tempVideoUrl = "https://www.youtube.com/watch?v=usvVGXFIpTM";

    useEffect(() => {
        setLoading(true);
        const storedPlaylist = localStorage.getItem("Playlist");
        if (storedPlaylist) {
            const parsedPlaylist = JSON.parse(storedPlaylist);
            setLoadedSongs(parsedPlaylist);
        } else {
            setLoadedSongs([]); // Optional: set empty array if nothing is stored
        }
        setLoading(false);
    }, [setLoadedSongs]);


    const loadLocalPlaylist = (data, index) => {
        if (loadedSongs) {
            setSongData(data);
            // setCurSongIndex(index);
            // console.log("Loaded local playlist Song:", data, index);
        } else {
            console.warn("No local playlist Song found");
        }
    }

    const loadSong = async (original_url) => {
        // console.log("Loading song:", original_url);
        setSongLoading(true);

        try {
            fetchVideoMeta(original_url);
        } catch (err) {
            console.error("Error loading song", err);
        } finally {
            setSongLoading(false);
        }
    };



    // const handleSearchAudio = async () => {
    //     if (!searchQuery) return;
    //     try {
    //         setLoading(true);
    //         const metaRes = await axios.get("http://192.168.29.144:4000/search-meta", {
    //             params: { q: searchQuery },
    //         });

    //         const audioRes = await axios.get("http://192.168.29.144:4000/search-audio", {
    //             params: { q: searchQuery },
    //         });

    //         setMeta(metaRes.data);
    //         setAudioUrl(audioRes.data.audioUrl);
    //     } catch (err) {
    //         alert("Failed to search and play song");
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    const fetchVideoMeta = async (videoUrl) => {
        setLoading(true);
        // console.log("Fetching video meta for URL:", videoUrl);
        try {
            const res = await axios.get("http://192.168.29.144:4000/api/getVideoMeta", {
                params: { videoUrl: videoUrl },
            });
            setSongData(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    const fetchPlaylist = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://192.168.29.144:4000/playlist-meta", {
                params: { playlistUrl },
            });
            setVideos(res.data);
            console.log(res.data);
        } catch (err) {
            alert("Failed to fetch playlist");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const changeSong = (value) => {
        // console.log("current Index - ", curSongIndex, "Updater - ", value)
        const newIndex = curSongIndex + value;
        if (newIndex < 0) {
            console.warn("Song index out of bounds");
            return;
        }
        setCurSongIndex(newIndex);
        const video = loadedSongs[newIndex];
        loadLocalPlaylist(video, newIndex);

    };

    // const changeSong = (value) => {
    //     console.log("current Index - ", curSongIndex, "Updater - ", value)
    //     const newIndex = curSongIndex + value;
    //     if (newIndex < 0 || newIndex >= videos.length) {
    //         console.warn("Song index out of bounds");
    //         return;
    //     }
    //     const title = videos[newIndex]?.title;
    //     if (!title) return;

    //     loadSong(newIndex, title);
    // };

    // const handleBufferedSong = async (index) => {
    //     if (!videos[index]) return;

    //     const title = videos[index].title;
    //     console.log("Buffering song:", title);

    //     try {
    //         const metaRes = await axios.get("http://192.168.29.144:4000/search-meta", {
    //             params: { q: title },
    //         });

    //         const audioRes = await axios.get("http://192.168.29.144:4000/search-audio", {
    //             params: { q: title },
    //         });

    //         setBufferedSong({
    //             index,
    //             audioUrl: audioRes.data.audioUrl,
    //             meta: metaRes.data
    //         });

    //         console.log("Buffered song:", {
    //             index,
    //             audioUrl: audioRes.data.audioUrl,
    //             meta: metaRes.data
    //         });

    //     } catch (err) {
    //         console.error("Error buffering song", err);
    //     }
    // };


    const value = {
        searchQuery,
        setSearchQuery,
        loading,
        videos,
        fetchPlaylist,
        setCurSongIndex,
        curSongIndex,
        setSongLoading,
        songLoading,
        fetchVideoMeta,
        songData,
        loadSong,
        setLoadedSongs,
        loadLocalPlaylist,
        changeSong
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
