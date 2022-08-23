/// React
import { useState } from "react";

/// Utils
import { translation } from "../utils/translation";

/// Extensions
import Button from "./extensions/Button";

/// Images
import imageSeparator from "../images/separator.png";

/// Icons
import { BsPlayCircle } from "react-icons/bs";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeInUp, fadeOutUp, fadeIn, fadeOut } from "../utils/revealCustomAnimations";




///
/// MESSAGE
///
const Message = ({ data, onGoNext }) => {
    const [enter, setEnter] = useState(true);
    const [profilePictureHeight, setProfilePictureHeight] = useState(150);

    const HandleClick = () => {
        setEnter(false);

        setTimeout(() => {
            onGoNext();
        }, 1000)
    }



    return (
        <>
            <Reveal id="profilePicture"
                style={{ height: `${profilePictureHeight}px` }}
                className="flex items-center justify-center mt-8 m-4"
                keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 200 : 0}>
                <>
                    <img className="rounded-full border-[1px] h-full" src={data.profileDownloadUrl}></img>
                </>
            </Reveal>


            <Reveal id="message"
                className="white-glassmorphism m-5 mt-0 mb-0 flex flex-col items-center justify-center"
                keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 800 : 0}>
                <>
                    <p className="text-2xl px-4 py-3 text-center text-black font-script">{data.message}</p>
                    <img className="w-10" src={imageSeparator} />
                    <p className="text-3xl px-4 py-3 text-center text-black font-script">{data.sender}</p>
                </>
            </Reveal>


            <Reveal id="playButton"
                className="flex-1 flex items-center justify-center min-h-[100px]"
                keyframes={enter ? fadeIn : fadeOut} delay={enter ? 1500 : 200}>
                <>
                    <Button
                        text={translation(data.language).playVideoButtonText}
                        active={true}
                        Icon={BsPlayCircle}
                        onClick={HandleClick}
                    />
                </>
            </Reveal>
        </>
    )
}

export default Message;