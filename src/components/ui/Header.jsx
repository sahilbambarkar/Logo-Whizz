import React from 'react';
import { Button } from './button';
import { Download } from 'lucide-react';

function Header({DownloadIcon}) {
    return (
        <div className='w-screen p-4 flex items-center justify-between shadow-md border-b border-gray-300 bg-white'>
            <img src='/logo.svg' alt="Logo" className='h-8' />
            <Button className="text-white flex items-center gap-2 hover:bg-blue-700"
            onClick={()=>DownloadIcon(Date.now())}>
                <Download />
                Download
            </Button>
        </div>
    );
}

export default Header;