import { translation } from "../utils/translation";
import { AppStateEnum } from "../App";
import { useEffect } from "react";

const Message = ({ data, HandleChangeState }) => {

    useEffect(() => {
        console.log("AAAAAAAAAAAA")
        console.log(data)
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-7">
            <img className="rounded-full border-2" src={data.profileDownloadUrl}></img>
            <div className="white-glassmorphism px-5">
                <p className="text-1xl my-3 text-center">{data.message}</p>
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