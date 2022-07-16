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

    const HandleClick = () => {
        setEnter(false);

        setTimeout(() => {
            onGoNext();
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-7">

            <div className="flex flex-col items-center ">
                <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 200 : 0}>
                    <img className="rounded-full border-[1px] w-36" src={data.profileDownloadUrl}></img>
                </Reveal>
                <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 400 : 0}>
                    <div className="white-glassmorphism mt-5 flex flex-col items-center">
                        <p className="text-2xl px-4 py-3 text-center text-black font-script">{data.message}</p>
                        <img className="w-10" src={imageSeparator} />
                        <p className="text-3xl px-4 py-3 text-center text-black font-script">{data.sender}</p>
                    </div>
                </Reveal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <Reveal keyframes={enter ? fadeIn : fadeOut} delay={enter ? 1000 : 200}>
                    <Button
                        text={translation(data.language).playVideoButtonText}
                        active={true}
                        Icon={BsPlayCircle}
                        onClick={HandleClick}
                    />
                </Reveal>
            </div>

        </div>
    )
}

export default Message;