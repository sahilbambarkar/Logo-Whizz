import React, { useEffect, useState } from 'react';
import { SmilePlus } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Base_URL ='https://logoexpress.tubeguruji.com'

function IconList({ selectedIcon }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [pngIconList,setPngIconList]=useState([]);
    const storageValue = JSON.parse(localStorage.getItem('value'));
    const [icon, setIcon] = useState(storageValue ? storageValue?.icon : 'SmilePlus');

    useEffect(()=>{
         getPngIcons();
    },[])

    const Icon = ({ name, color, size }) => {
        const LucideIcon = icons[name];
        if (!LucideIcon) {
            return null; // Return null if the icon doesn't exist
        }
        return <LucideIcon color={color} size={size} />;
    };

    const getPngIcons=()=>{
        axios.get(Base_URL+'/getIcons.php').then(resp=>{
            console.log(resp.data);
            setPngIconList(resp.data);
        })
    }

    return (
        <div>
            <div>
                <label>Icon</label>
                <div
                    onClick={() => setOpenDialog(true)}
                    className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2'
                >
                    {icon?.includes('.png')?
                    <img src={Base_URL+'/png/'+icon}/>:
                    
                    <Icon name={icon} color={'#000'} size={20} />
                    }
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
                                        {iconList.map((icon, index) => (
                                            <div key={index} className='flex items-center justify-center cursor-pointer border p-3 rounded-sm'
                                                onClick={() => {
                                                    selectedIcon(icon); setOpenDialog(false)
                                                    setIcon(icon)
                                                }}>
                                                <Icon name={icon} color={'#000'} size={20} />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="color-icon">
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6'>
                                        {pngIconList.map((icon, index) => (
                                            <div key={index} className='flex items-center justify-center cursor-pointer border p-3 rounded-sm'
                                                onClick={() => {
                                                    selectedIcon(icon); setOpenDialog(false)
                                                    setIcon(icon)
                                                }}>
                                                <img src={Base_URL+"/png/"+icon} />
                                            </div>
                                        ))}
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
