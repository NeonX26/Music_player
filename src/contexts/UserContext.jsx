// src/contexts/UserContext.jsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [curSongIndex, setCurSongIndex] = useState(0);
    const [videos, setVideos] = useState([]);
    const [songLoading, setSongLoading] = useState(false);
    const [bufferedSong, setBufferedSong] = useState([]);
    const [bufferedMeta, setBufferedMeta] = useState([]);

    const playlistUrl = "https://youtube.com/playlist?list=PLGRwzouMbL7WKIZSklBlIKHxAQRqrNEI4&si=FXb8ZvrZ7ohzP-ZP";

    const loadSong = async (title) => {
        console.log("Loading song:", title);
        // if(title === bufferedMeta.title){
        //     console.log("Already loaded song, skipping loadSong");
        //     setAudioUrl(bufferedSong);
        //     setMeta(bufferedMeta);
        //     setBufferedSong([]);
        //     setBufferedMeta([]);
        //     return;
        // }


        setAudioUrl("");
        setSongLoading(true)

        const metaRes = await axios.get("http://192.168.29.144:4000/search-meta", {
            params: { q: title },
        });

        setMeta(metaRes.data);
        // console.log("Meta data:", metaRes.data);

        const response = await axios.get("http://192.168.29.144:4000/search-audio", {
            params: { q: title },
        });
        // setLoading(false);
        // console.log(response.data.audioUrl);
        setAudioUrl(response.data.audioUrl);
        setSongLoading(false);
        // handleBufferedSong()
    }


    const handleSearchAudio = async () => {
        if (!searchQuery) return;
        try {
            setLoading(true);
            const metaRes = await axios.get("http://192.168.29.144:4000/search-meta", {
                params: { q: searchQuery },
            });

            const response = await axios.get("http://192.168.29.144:4000/search-audio", {
                params: { q: searchQuery },
            });
            setLoading(false);
            setMeta(metaRes.data);
            setAudioUrl(response.data.audioUrl);
            console.log(response);
            console.log(metaRes);
        } catch (err) {
            alert("Failed to search and play song");
            console.error(err);
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
        } finally {
            setLoading(false);
        }
    };


    const changeSong = (value) => {
        if(bufferedSong && bufferedMeta && value){
            console.log("Default loaded song")
            setAudioUrl(bufferedSong);
            setMeta(bufferedMeta);
            setBufferedSong([]);
            setBufferedMeta([]);
            handleBufferedSong(curSongIndex )
            return;
        }
        loadSong(videos[curSongIndex + value]?.title || videos[0].title);
        setCurSongIndex((prevIndex) => prevIndex + value);
        console.log("current index", curSongIndex)
    }

    const handleBufferedSong = async(index) =>{
        const title = videos[index].title ;
        console.log('Next Song - ', videos[index].title)

        const metaRes = await axios.get("http://192.168.29.144:4000/search-meta", {
            params: { q: title },
        });

        setBufferedMeta(metaRes.data);
        console.log("Buffered Meta data:", metaRes.data.title);

        const response = await axios.get("http://192.168.29.144:4000/search-audio", {
            params: { q: title },
        });
        setBufferedSong(response.data.audioUrl);
        console.log("Next song Loaded...")
        setCurSongIndex(index+1)
    }


    const value = {
        searchQuery,
        setSearchQuery,
        handleSearchAudio,
        audioUrl,
        meta,
        loading,
        videos,
        fetchPlaylist,
        loadSong,
        changeSong,
        setCurSongIndex,
        curSongIndex,
        setSongLoading,
        songLoading,
        handleBufferedSong
    };

    

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
