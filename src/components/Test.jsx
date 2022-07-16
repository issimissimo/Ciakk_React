/// React
import React from 'react';
import { useState, useEffect, useContext, useRef } from "react";

/// Spinner
import ReactLoading from 'react-loading';

/// VideoJS Component
import VideoJS from './providers/videoJs/VideoJS';






const Test = ({ data, HandleChangeState }) => {

    console.log(data)
    const [isLoaded, setIsLoaded] = useState(false);
    const [enter, setEnter] = useState(true);
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        muted: true,
        sources: [{
            // src: "https://firebasestorage.googleapis.com/v0/b/ciakk-de5cd.appspot.com/o/fwQvvT92JjaN7B0sBGSNWyVY8oy1%2Fvideo_3f501359-9c51-46e2-8d5a-39f1b74e6ac6.mp4?alt=media&token=1444dbad-2681-44dd-a355-e4857018df9f",
            src: data.downloadUrl,
            type: "video/mp4"
        }]
    }


    const onVideoEnded = () => {
        setEnter(false);

        setTimeout(() => {
            // HandleChangeState(AppStateEnum.GREETINGS);
        }, 1000)
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
            {/* {!isLoaded && (
                <div className="min-h-screen min-w-full z-10 fixed flex flex-col justify-center items-center">
                    <ReactLoading type='spin' color='#ffffff' height={50} width={50} />
                </div>
            )} */}

            <div className='min-h-screen min-w-full'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
        </>
    )
}

export default Test;