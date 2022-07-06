import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <ReactLoading type='spin' color='#ffffff' height={80} width={80} />
        </div>
    )
}

export default Loader;