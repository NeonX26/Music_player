import { Box, CircularProgress } from "@mui/material";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useUser } from "../contexts/UserContext";


const Player = () => {
    const { audioUrl, meta, changeSong, songLoading } = useUser();

    return (
        <Box sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex",
        }}>
            {songLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "250px" }}>
                    <CircularProgress size="3rem" />
                </Box>
            ) :
                <img src={meta.thumbnail} alt={meta.title} width='250px' style={{objectFit: 'cover'}}/>
            }

            <AudioPlayer
                autoPlay
                src={audioUrl || null}
                onPlay={() => console.log("Playing audio")}
                showSkipControls={true}
                customAdditionalControls={['LOOP']}
                layout="stacked"
                autoPlayAfterSrcChange={true}
                progressJumpSteps={{
                    forward: 5000,
                    backward: 5000,
                }}
                showDownloadProgress={true}
                showFilledProgress={true}
                onClickNext={() => changeSong(1)}
                onClickPrevious={() => changeSong(-1)}
                style={{ width: "100%", flexGrow: 1, padding: " 10px 30px" }}

            />

        </Box>
    );
};

export default Player;
