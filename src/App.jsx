import { useEffect, useRef, useState } from 'react'
import NavBar from './components/Nav'
import Content from './components/Content'
import { useAudioPlayerStore } from './store'
import { Button, Slider, Spacer } from '@nextui-org/react'
import { PauseCircleIcon, PauseIcon, PlayCircleIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'
import Audioplayer from './components/Audioplayer'
import Footer from './components/Footer'














function App() {


  
  return (
    <div className='h-dvh w-screen flex flex-col overflow-y-hidden'>
    <div className='flex flex-col bg-neutral-100 w-full overflow-auto h-full '>
      <NavBar/>
      <Content  />
    {/* <Footer/> */}
      

     
    </div>
      <Audioplayer/>
      
      </div>
  )
}

export default App
