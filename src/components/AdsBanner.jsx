import React from 'react';

function AdsBanner() {
    const handleClick = () => {
        // Open Gmail with a new message
        window.open('mailto:sahilbambarkar007@gmail.com?subject=Subject%20Here&body=Body%20Here', '_blank');
    };

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            <video
                src='/Ads Banner.mp4'
                alt='ads banner'
                className='absolute  w-full h-[660px] object-fill cursor-pointer transition-transform duration-200 hover:scale-95'
                onClick={handleClick}
                autoPlay
                loop
                muted
            />
        </div>
    );
}

export default AdsBanner;