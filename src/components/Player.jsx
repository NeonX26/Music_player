import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({ url }) => {
    return (
        <>
            <AudioPlayer
                autoPlay
                src={url}
                onPlay={() => console.log("Playing audio")}
                showJumpControls={false}
                customAdditionalControls={[]}
                layout="horizontal"
            />

        </>
    );
};

export default Player;
