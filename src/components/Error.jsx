import { TbFaceIdError } from 'react-icons/tb';

const Error = ({ message }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white">
            <TbFaceIdError fontSize={80} className="text-white" />
            {message}
        </div>
    )
}

export default Error;