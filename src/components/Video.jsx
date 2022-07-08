/// React
import React from 'react';
import { useState, useEffect, useContext, useRef } from "react";

import VideoJS from './providers/videoJs/VideoJS';

const Video = () => {
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        controls: true,
        sources: [{
            src: "https://firebasestorage.googleapis.com/v0/b/ciakk-de5cd.appspot.com/o/e3eyUWxXwySPYvNIO9IKWG8T6U52%2Fvideo_f0bbf517-10ed-44b7-8589-52a3bb954598.mp4?alt=media&token=285b0f68-c64e-4b9e-bcc1-44b37182f0bf",
            type: "video/mp4"
        }]
    }

    const handlePlayerReady = (player) => {

        console.log(player)

        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });

        player.one("play", () => {
            console.log("player play")
        })

        player.on('ended', () => {
            console.log("player ended")
        });
    };


    return (
        <div className="App">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
    )
}

export default Video;