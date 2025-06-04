// src/contexts/UserContext.jsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const value = {
        searchQuery,
        setSearchQuery,
        handleSearchAudio,
        audioUrl,
        meta,
        loading,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
