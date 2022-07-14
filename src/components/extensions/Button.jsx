import ReactLoading from 'react-loading';

const Button = ({ text, Icon, active, loading, onClick }) => {
    return (
        <div
            // className="flex items-center justify-evenly border-[1px] p-4 px-7 w-52 h-[70px] border-white rounded-full text-white gradient-bttn"
            className={`flex items-center justify-evenly border-[1px] p-4 px-7 w-52 h-[70px] rounded-full ${active ? "gradient-bttn" : "gradient-bttn-disabled"}`}
            onClick={onClick}
        >
            {loading ? <ReactLoading type='spin' color='#ffffff' height={26} width={26} /> : <Icon fontSize={26} />}
            {text !== "undefined" && <p>{text}</p>}

        </div>
    )
}

export default Button;