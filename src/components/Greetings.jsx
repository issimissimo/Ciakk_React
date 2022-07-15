/// React
import { useState } from "react";

/// Utils
import downloadFileFromUrl from "../utils/downloadFileFromUrl";
import { translation } from "../utils/translation";

/// Extensions
import Button from "./extensions/Button";

/// Icons
import { HiDownload } from "react-icons/hi";
import separator01 from "../images/separator_01.png";
import separator01a from "../images/separator_01a.png";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeInUp, fadeOutUp, fadeIn, fadeOut } from "../utils/revealCustomAnimations";



///
/// GREETINGS
///
const Greetings = ({ data }) => {

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setTimeout(() => {
            setIsDownloading(true);
            downloadFileFromUrl(data.downloadUrl, "myVideo.mp4", () => {
                setIsDownloading(false);
            });
        }, 100)

    }

    return (
        <div className="min-h-screen flex flex-col items-center p-7">

            <Reveal keyframes={fadeInUp}>
                <div className="flex flex-col items-center text-white mt-10">
                    <img className="mb-4" src={separator01} />
                    <p className="text-2xl font-semibold">{data.owner}</p>
                    <p className="font-light">{data.ownerInfo}</p>
                    <img className="mt-4" src={separator01a} />
                </div>
            </Reveal>

            <div className="flex flex-1 flex-col items-center justify-center">
                <Reveal keyframes={fadeIn} delay={300}>
                    <p className="text-white text-center text-sm">{translation(data.language).greetings1}"{data.owner}"{translation(data.language).greetings2}{data.expiration}</p>
                </Reveal>
                <Reveal keyframes={fadeIn} delay={600}>
                    <p className="text-white text-center text-sm my-5">{translation(data.language).greetings3}</p>
                </Reveal>
                <Reveal keyframes={fadeIn} delay={900}>
                    <Button
                        text={isDownloading ? translation(data.language).downloadingText : translation(data.language).downloadText}
                        active={isDownloading ? false : true}
                        Icon={HiDownload}
                        onClick={handleDownload}
                        loading={isDownloading}
                    />
                </Reveal>
            </div>
        </div>
    )
}

export default Greetings;