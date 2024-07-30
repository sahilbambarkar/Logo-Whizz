import { LucidePencilRuler, Image, Shield } from 'lucide-react';
import React, { useState } from 'react';

function SideNav({selectedIndex}) {
    const menuList = [
        {
            id: 1,
            name: 'Icon',
            Icon: LucidePencilRuler
        },
        {
            id: 2,
            name: 'Background',
            Icon: Image
        }
    ];
const [activeIndex,setActiveIndex]=useState(0);
    return (
        <div className='border-b shadow-md h-screen flex flex-col'>
            {menuList.map((menu, index) => (
                <div key={index} onClick={() => {
                    setActiveIndex(index);
                    selectedIndex(index)
                }}
                className={`flex items-center gap-2 p-3 px-7 text-lg my-2 hover:bg-primary hover:text-white cursor-pointer text-gray-600
                ${activeIndex==index&&'bg-primary '}
                `}>
                    <menu.Icon size={20} />
                    <span>{menu.name}</span>
                </div>

            ))}
         
        </div>
    );
}

export default SideNav;