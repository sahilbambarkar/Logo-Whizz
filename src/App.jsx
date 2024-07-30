import { useState } from 'react';
import './App.css';
import BackgroundController from './components/BackgroundController';
import Header from './components/ui/Header';
import IconController from './components/ui/IconController';
import SideNav from './components/ui/SideNav';
import LogoPreview from './components/LogoPreview';
import { UpdateStorageContext } from './components/context/UpdateStorageContext';
import AdsBanner from './components/AdsBanner';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const[downloadIcon,setDownloadIcon]=useState();

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <>
        <Header DownloadIcon={setDownloadIcon} />
        <div className='w-64 fixed'>
          <SideNav selectedIndex={setSelectedIndex} />
        </div>
        <div className='ml-64 grid grid-cols-1 md:grid-cols-6 fixed w-[1280px] h-screen'>
          <div className='md:col-span-2 border h-screen shadow-sm p-5 overflow-y-auto overscroll-y-auto'>
            {selectedIndex === 0 ? (
              <IconController />
            ) : (
              <BackgroundController />
            )}
          </div>
          <div className='md:col-span-3'>
            <LogoPreview downloadIcon={downloadIcon} />
          </div>
          <div >
            <AdsBanner/>
          </div>
        </div>
      </>
    </UpdateStorageContext.Provider>
  );
}

export default App;