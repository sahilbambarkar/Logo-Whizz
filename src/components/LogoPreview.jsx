import React, { useEffect, useState, useContext } from 'react';
import { UpdateStorageContext } from './context/UpdateStorageContext';
import { icons } from 'lucide-react';
import html2canvas from 'html2canvas';

const Base_URL = 'https://logoexpress.tubeguruji.com';

function LogoPreview({ downloadIcon }) {
    const { updateStorage } = useContext(UpdateStorageContext);
    const [storageValue, setStorageValue] = useState({});

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('value'));
        setStorageValue(storageData);
        console.log('Storage Value:', storageData);
    }, [updateStorage]);

    useEffect(() => {
        if (downloadIcon) {
            downloadPngLogo();
        }
    }, [downloadIcon]);

    // Used for downloading the logo in PNG format
    const downloadPngLogo = () => {
        const downloadLogoDiv = document.getElementById('downloadLogoDiv');

        html2canvas(downloadLogoDiv, {
            backgroundColor: 'rgba(255, 255, 255, 0)', // Set to transparent
        }).then(canvas => {
            const pngImage = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngImage;
            downloadLink.download = 'SB_Logo_Whiz.png';
            downloadLink.click();
        }).catch(error => {
            console.error('Error converting to canvas:', error);
            alert('Failed to download logo. Please try again.'); // User-friendly error message
        });
    };

    const getBackgroundStyle = () => {
        if (!storageValue?.bgColor) return {};

        // Check if the value is a gradient
        const isGradient = storageValue.bgColor.startsWith('linear-gradient') || storageValue.bgColor.startsWith('radial-gradient');

        return {
            borderRadius: storageValue?.bgRounded,
            background: isGradient ? storageValue.bgColor : storageValue.bgColor,
        };
    };

    const Icon = ({ name, color, size, rotate }) => {
        const LucideIcon = icons[name];
        if (!LucideIcon) {
            return null;
        }
        return (
            <LucideIcon
                color={color}
                size={size}
                style={{
                    transform: `rotate(${rotate}deg)`,
                }}
            />
        );
    };

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div
                className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
                style={{
                    padding: storageValue?.bgPadding,
                }}
            >
                <div
                    id="downloadLogoDiv"
                    className="h-full w-full flex items-center justify-center"
                    style={getBackgroundStyle()}
                >
                    {/* Check if the icon is a PNG image or a Lucide icon */}
                    {storageValue?.icon?.includes('.png') ?
                        // Handle PNG images
                        <img
                            src={`${Base_URL}/png/${storageValue?.icon}`} // Use absolute URL
                            style={{
                                height: storageValue?.iconSize,
                                width: storageValue?.iconSize,
                                transform: `rotate(${storageValue?.iconRotate}deg)`,
                                transition: 'transform 0.3s ease',
                            }}
                        />
                        :
                        // Handle Lucide icons
                        <Icon
                            name={storageValue?.icon}
                            color={storageValue?.iconColor}
                            size={storageValue?.iconSize}
                            rotate={storageValue?.iconRotate}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default LogoPreview;
