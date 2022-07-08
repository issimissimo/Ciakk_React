import { translation } from "../utils/translation";
import { AppStateEnum } from "../App_test";

const Message = ({ data, HandleChangeState }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="white-glassmorphism px-5">
                <p className="text-1xl font-bold my-3 text-center">{data.message}</p>
            </div>

            <button
                type="button"
                onClick={() => { HandleChangeState(AppStateEnum.VIDEO) }}
                className="border-[1px] p-4 px-7 mt-10 border-black rounded-full">
                PLAY VIDEO</button>
        </div>
    )
}

export default Message;