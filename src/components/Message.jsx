/// React
import { useEffect, useRef, useState } from "react";

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




const getElementHeight = (elem) => {
    let el = document.querySelector(elem);
    let rect = el.getBoundingClientRect();
    return rect.height;
}




///
/// MESSAGE
///
const Message = ({ data, onGoNext }) => {
    const [enter, setEnter] = useState(true);
    const [message, setMessage] = useState(null);
    const [profileHeight, setProfileHeight] = useState(150);

    const pageHeight = useRef();

    const msg = "Sed duswuidfeiw uideswyfuy  uidsyfu dsjiydfu yidsyfuiyds fuuiy dfuy dsfydyfui dyfydsfu ydsfuidsyfui uidysyfu dfuy dsfydyfui dyfydsfu ydsfuidsyfui uidy"
    // const msg = "Sed "



    // /// set the message, just for resizing of the profile picture
    // useEffect(() => {
    //     // setMessage(data.message);
    //     setMessage(msg);
    // }, [])



    


    const HandleClick = () => {
        setEnter(false);

        setTimeout(() => {
            onGoNext();
        }, 1000)
    }

    return (
        <>
            <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 200 : 0}>
                <div id="profilePicture" style={{ height: `${profileHeight}px` }} className="flex items-center justify-center mt-8 m-4">
                    <img className="rounded-full border-[1px] h-full" src={data.profileDownloadUrl}></img>
                </div>
            </Reveal>


            <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 800 : 0}>
                <div id="message" className="white-glassmorphism m-5 mt-0 mb-0 flex flex-col items-center justify-center">
                    <p className="text-2xl px-4 py-3 text-center text-black font-script">{data.message}</p>
                    <img className="w-10" src={imageSeparator} />
                    <p className="text-3xl px-4 py-3 text-center text-black font-script">{data.sender}</p>
                </div>
            </Reveal>


            <div id="playButton" className="flex-1 flex items-center justify-center min-h-[100px]">
                <Reveal keyframes={enter ? fadeIn : fadeOut} delay={enter ? 1500 : 200}>
                    <Button
                        text={translation(data.language).playVideoButtonText}
                        active={true}
                        Icon={BsPlayCircle}
                        onClick={HandleClick}
                    />
                </Reveal>
            </div>
        </>
    )
}

export default Message;