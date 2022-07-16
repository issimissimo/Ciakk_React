import React, { useEffect, useRef } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "./VideoJS.css";

export const VideoJS = ({ options, onReady }) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        const player = playerRef.current;

        if (!player) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options, () => {
                
                /// Now Player is ready
                onReady && onReady(playerRef.current);
            });
        }

        return () => {
            if (player) {
                // player.dispose();
                // playerRef.current = null;
            }
        }

    }, [options, videoRef, playerRef]);


    return (
        <div data-vjs-player>
            <video ref={videoRef} playsInline className='video-js vjs-tech vjs-big-play-centered' />
        </div>
    );
}

export default VideoJS;