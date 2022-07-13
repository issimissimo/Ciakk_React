import { translation } from "../utils/translation";
import { AppStateEnum } from "../App";
import { useEffect } from "react";

import image from "../images/separator.png";

const Message = ({ data, HandleChangeState }) => {

    useEffect(() => {
        // console.log(data)
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center p-7">
            <div className="flex flex-col items-center ">
                <img className="rounded-full border w-36" src={data.profileDownloadUrl}></img>
                <div className="white-glassmorphism mt-5 flex flex-col items-center">
                    <p className="text-2xl px-4 py-3 text-center text-black font-script">{data.message}</p>
                    <img className="w-16" src={image} />
                    <p className="text-3xl px-4 py-3 text-center text-black font-script">{data.sender}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => { HandleChangeState(AppStateEnum.VIDEO) }}
                className="border-[1px] p-4 px-7 mt-10 border-black rounded-full">
                {translation(data.language).playVideoButtonText}
            </button>
        </div>
    )
}

export default Message;