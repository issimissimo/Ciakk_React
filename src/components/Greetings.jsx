/// React
import { useState } from "react";

/// Utils
import downloadFileFromUrl from "../utils/downloadFileFromUrl";
import { translation } from "../utils/translation";

/// Extensions
import Button from "./extensions/Button";

/// Icons
import { HiDownload } from "react-icons/hi";



///
/// GREETINGS
///
const Greetings = ({ data }) => {

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setTimeout(()=>{
            setIsDownloading(true);
            downloadFileFromUrl(data.downloadUrl, "myVideo.mp4", () => {
                setIsDownloading(false);
            });
        }, 100)
        
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-7">
            <Button
                text={isDownloading ? translation(data.language).downloadingText : translation(data.language).downloadText}
                active={isDownloading ? false : true}
                Icon={HiDownload}
                onClick={handleDownload}
                loading={isDownloading}
            />
        </div>
    )
}

export default Greetings;