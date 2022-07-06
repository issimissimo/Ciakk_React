import { translation } from "../utils/translation";

const Welcome = ({ data }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-2xl">{translation(data.language).welcomeTitle}</p>
            <p className="text-3xl font-bold my-3">{data.receiver}</p>
        </div>
    )
}

export default Welcome;