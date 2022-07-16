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
import Reveal from "react-awesome-reveal";
import { fadeIn, fadeOut } from "../utils/revealCustomAnimations";



const Video = ({ data, iOS, onGoNext }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState();
    const [enter, setEnter] = useState(true);

    const playerRef = useRef(null);

    useEffect(() => {
        setIsMuted(iOS);
    }, [])

    console.log(iOS)
    console.log(data.downloadUrl)

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        muted: iOS ? true : false,
        sources: [{
            src: data.downloadUrl,
            type: "video/mp4"
        }]
    }

    const onVideoEnded = () => {
        setEnter(false);

        setTimeout(() => {
            onGoNext();
        }, 1000)
    }

    const toggleMuted = (value) => {
        if (playerRef.current)
            playerRef.current.muted(value);
    }


    const handlePlayerReady = (player) => {

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
            onVideoEnded();
        });
    };


    return (
        <>
            {!isLoaded && (
                <div className="min-h-screen min-w-full z-10 fixed flex flex-col justify-center items-center">
                    <ReactLoading type='spin' color='#ffffff' height={50} width={50} />
                </div>
            )}

            {isMuted && (
                <div className="min-h-screen min-w-full z-10 fixed flex flex-col justify-center items-center">
                    <p>IS MUTED!</p>
                </div>
            )}

            {isLoaded && (
                <div className="min-h-screen min-w-full z-10 fixed flex flex-col justify-center items-center">
                    <button className='text-white' onClick={() => { toggleMuted(true) }}>AUDIO</button>
                </div>
            )}

            <Reveal keyframes={enter ? fadeIn : fadeOut}>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Reveal>
        </>
    )
}

export default Video;