import React, { useEffect, useState, useContext } from 'react';
import { UpdateStorageContext } from './context/UpdateStorageContext';
import { icons } from 'lucide-react';
import html2canvas from 'html2canvas';

const Base_URL = 'https://logoexpress.tubeguruji.com'

function LogoPreview({downloadIcon}) {
    const { updateStorage } = useContext(UpdateStorageContext);
    const [storageValue, setStorageValue] = useState({});

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('value'));
        setStorageValue(storageData);
        console.log(storageData);
    }, [updateStorage]);

    useEffect(()=>{
      if (downloadIcon)
        {
          downloadPngLogo();
      }
    },[downloadIcon])

    // used for downloading the logo in png format
    const downloadPngLogo=()=>{
        const downloadLogoDiv=document.getElementById('downloadLogoDiv');

        html2canvas(downloadLogoDiv,{
            backgroundColor:null
        }).then(canvas=>{
            const pngImage=canvas.toDataURL('image/png');
            const downloadLink=document.createElement('a');
            downloadLink.href=pngImage;
            downloadLink.download='SB_Logo_Whiz.png';
            downloadLink.click();
        })
    }

    const getBackgroundStyle = () => {
        if (!storageValue?.bgColor) return {};

        // Check if the value is a gradient
        const isGradient = storageValue.bgColor.startsWith('linear-gradient') || storageValue.bgColor.startsWith('radial-gradient');

        return {
            borderRadius: storageValue?.bgRounded,
            background: isGradient ? storageValue.bgColor : storageValue.bgColor,
        };
    };
     const Icon=({name,color,size,rotate})=>{
        const LucideIcon=icons[name];
        if (!LucideIcon){
            return;
        }
        return <LucideIcon color={color} size={size}
            style={{
                transform:`rotate(${rotate}deg)`
            }}
        />
     }
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <div className='h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300'
            style={{
                padding:storageValue?.bgPadding
            }}>
                <div
                    id='downloadLogoDiv'
                    className='h-full w-full flex items-center justify-center'
                    style={getBackgroundStyle()}
                >

                  {storageValue?.icon?.includes('.png')?
                  <img src={"/png/"+storageValue?.icon}
                    style={{
                        height: storageValue?.iconSize,
                        width: storageValue?.iconSize,
                        transform: `rotate(${storageValue?.iconRotate}deg)`, // Rotate the PNG image
                        transition: 'transform 0.3s ease',
                    }}
                  />:
                  
                    <Icon name={storageValue?.icon} 
                    color={storageValue?.iconColor} 
                    size={storageValue?.iconSize}
                    rotate={storageValue?.iconRotate} />
                  }
                </div>
            </div>
        </div>
    );
}

export default LogoPreview;
