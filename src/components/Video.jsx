/// React
import React from 'react';
import { useState, useEffect, useContext, useRef } from "react";

/// AppStateEnum
import { AppStateEnum } from "../App";

/// Spinner
import ReactLoading from 'react-loading';

/// VideoJS Component
import VideoJS from './providers/videoJs/VideoJS';

/// CSS Anim
import { Fade } from "react-awesome-reveal";

const Video = ({ data, HandleChangeState }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        sources: [{
            src: data.downloadUrl,
            type: "video/mp4"
        }]
    }

    const handlePlayerReady = (player) => {

        // console.log(player)

        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            // console.log('player is waiting');
        });

        player.on('dispose', () => {
            // console.log('player will dispose');
        });

        player.one("play", () => {
            setIsLoaded(true);
            // console.log("player play")
        })

        player.on('ended', () => {
            // console.log("player ended");
            HandleChangeState(AppStateEnum.GREETINGS);
        });
    };


    return (
        <>
            {!isLoaded && (
                <div className="min-h-screen min-w-full z-10 fixed flex flex-col justify-center items-center">
                    <ReactLoading type='spin' color='#ffffff' height={50} width={50} />
                </div>
            )}

            <Fade triggerOnce={true}>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Fade>
        </>
    )
}

export default Video;