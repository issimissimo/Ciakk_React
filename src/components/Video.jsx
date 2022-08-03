/// React
import React from 'react';
import { useState, useEffect, useRef } from "react";

/// Spinner
import ReactLoading from 'react-loading';

/// VideoJS Component
import VideoJS from './providers/videoJs/VideoJS';

/// Utils
import { translation } from "../utils/translation";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeIn, fadeOut } from "../utils/revealCustomAnimations";

/// Icons
import { IoVolumeMuteOutline, IoVolumeMedium } from 'react-icons/io5';


///
/// audio button
///
export const ToggleAudioButton = ({ data, onButtonClicked }) => {
    const [isOn, setIsOn] = useState(false);

    const HandleClick = () => {
        setIsOn(!isOn);
        onButtonClicked();
    }

    return (
        <Reveal keyframes={!isOn ? fadeIn : fadeOut} delay={!isOn ? 0 : 1000}>
            <div
                className="flex items-center justify-evenly border-[1px] p-4 px-7 w-52 h-[70px] rounded-full text-black text-sm font-semibold bg-white"
                onClick={HandleClick}
            >
                {isOn ?
                    (
                        <>
                            <IoVolumeMedium fontSize={28} />
                            <p>{translation(data.language).audioEnabled}</p>
                        </>
                    ) :
                    (
                        <>
                            <IoVolumeMuteOutline fontSize={28} />
                            <p>{translation(data.language).enableAudio}</p>
                        </>
                    )
                }
            </div>
        </Reveal>
    )
}




///
/// Video
///
const Video = ({ data, iOS, onGoNext }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState();
    const [enter, setEnter] = useState(true);

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        muted: iOS ? true : false,
        sources: [{
            src: data.videoDownloadUrl,
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


    useEffect(() => {
        setIsMuted(iOS);
    }, [])



    return (
        <>
            {!isLoaded ? (
                <div className="z-10 fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
                    <ReactLoading type='spin' color='#ffffff' height={50} width={50} />
                </div>
            ) :
                (
                    isMuted && (
                        <div className="flex-1 min-w-full z-10 fixed flex flex-col justify-center items-center">
                            <ToggleAudioButton
                                data={data}
                                onButtonClicked={() => {
                                    toggleMuted(false);
                                    setTimeout(() => {
                                        setIsMuted(false);
                                    }, 2000);
                                }} />
                        </div>
                    )
                )
            }

            <Reveal className='flex-1 flex flex-col' keyframes={enter ? fadeIn : fadeOut} >
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Reveal>
        </>
    )
}

export default Video;