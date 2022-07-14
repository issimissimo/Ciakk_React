import { translation } from "../utils/translation";
import { AppStateEnum } from "../App";
import { useState } from "react";

import imageSeparator from "../images/separator.png";

import { BsPlayCircle } from "react-icons/bs";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeInUp, fadeOutUp, fadeIn, fadeOut } from "../utils/revealCustomAnimations";

import easyImgPreloader from 'easy-img-preloader';


const Button = ({ text, Icon, onClick }) => {
    return (
        <div
            className="flex items-center justify-evenly border-[1px] p-4 px-7 w-52 border-white rounded-full text-white gradient-bttn" style={{ height: "70px" }}
            onClick={onClick}
        >
            <Icon fontSize={26} />
            <p>{text}</p>
        </div>
    )
}


const Message = ({ data, HandleChangeState }) => {
    const [enter, setEnter] = useState(true);

    const HandleClick = () => {
        setEnter(false);

        setTimeout(() => {
            HandleChangeState(AppStateEnum.VIDEO)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-7">

            <div className="flex flex-col items-center ">
                <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 0 : 0}>
                    <img className="rounded-full border-[1px] w-36" src={data.profileDownloadUrl}></img>
                </Reveal>
                <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 200 : 0}>
                    <div className="white-glassmorphism mt-5 flex flex-col items-center">
                        <p className="text-2xl px-4 py-3 text-center text-black font-script">{data.message}</p>
                        <img className="w-16" src={imageSeparator} />
                        <p className="text-3xl px-4 py-3 text-center text-black font-script">{data.sender}</p>
                    </div>
                </Reveal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <Reveal keyframes={enter ? fadeIn : fadeOut} delay={enter ? 800 : 200}>
                    <Button
                        text={translation(data.language).playVideoButtonText}
                        Icon={BsPlayCircle}
                        onClick={HandleClick}
                    />
                </Reveal>
            </div>

        </div>
    )
}

export default Message;