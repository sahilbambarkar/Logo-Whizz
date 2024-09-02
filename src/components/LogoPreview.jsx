import React, { useEffect, useState } from 'react';
import { icons } from 'lucide-react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { iconList } from '@/constants/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BASE_URL = 'https://logoexpress.tubeguruji.com';

function IconList({ selectedIcon }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [pngIconList, setPngIconList] = useState([]);
    const [icon, setIcon] = useState(() => {
        const storageValue = JSON.parse(localStorage.getItem('value'));
        return storageValue ? storageValue.icon : 'SmilePlus';
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPngIcons();
    }, []);

    const getPngIcons = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getIcons.php`);
            setPngIconList(response.data);
        } catch (error) {
            console.error("Error fetching PNG icons:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadIcon = (name) => {
        try {
            const LucideIcon = icons[name];
            return LucideIcon ? <LucideIcon color={'#000'} size={20} /> : <div>no icons</div>;
        } catch (error) {
            console.error(`Error loading icon ${name}:`, error);
            return <div>Error loading icon</div>;
        }
    };

    return (
        <div>
            <div>
                <label>Icon</label>
                <div
                    onClick={() => setOpenDialog(true)}
                    className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2'
                >
                    {icon.includes('.png') ? (
                        <img src={`${BASE_URL}/png/${icon}`} alt={icon} />
                    ) : (
                        loadIcon(icon)
                    )}
                </div>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Pick your Favorite Icon</DialogTitle>
                        <DialogDescription>
                            <Tabs defaultValue="icon" className="w-[400px]">
                                <TabsList className="border-b border-gray-200">
                                    <TabsTrigger value="icon" className="px-4 py-2 text-white">Icons</TabsTrigger>
                                    <TabsTrigger value="color-icon" className="px-4 py-2 text-white">Color Icons</TabsTrigger>
                                </TabsList>
                                <TabsContent value="icon">
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6'>
                                        {loading ? (
                                            <div>Loading icons...</div>
                                        ) : (
                                            iconList.map((icon, index) => (
                                                <div key={index} className='flex items-center justify-center cursor-pointer border p-3 rounded-sm'
                                                    onClick={() => {
                                                        selectedIcon(icon);
                                                        setOpenDialog(false);
                                                        setIcon(icon);
                                                    }}>
                                                    {loadIcon(icon)}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="color-icon">
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6'>
                                        {loading ? (
                                            <div>Loading PNG icons...</div>
                                        ) : (
                                            pngIconList.map((icon, index) => (
                                                <div key={index} className='flex items-center justify-center cursor-pointer border p-3 rounded-sm'
                                                    onClick={() => {
                                                        selectedIcon(icon);
                                                        setOpenDialog(false);
                                                        setIcon(icon);
                                                    }}>
                                                    <img src={`${BASE_URL}/png/${icon}`} alt={icon} />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default IconList;
