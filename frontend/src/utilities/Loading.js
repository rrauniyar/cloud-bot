import { Audio } from 'react-loader-spinner';
export const Loading = () => {
    return (
        <div className='loading-page'>
            <Audio
                height="500"
                width="300"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
            <strong>Loading......</strong>
        </div>
    )

}

