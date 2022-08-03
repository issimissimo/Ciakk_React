import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className='flex-1 flex flex-col justify-center items-center'>
            <ReactLoading type='spin' color='#ffffff' height={50} width={50} />
        </div>
    )
}

export default Loader;