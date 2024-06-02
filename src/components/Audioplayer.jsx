import React from 'react'
import { Button, Slider, Spacer, Spinner } from '@nextui-org/react'
import { useAudioPlayerStore } from '../store'
import { useEffect, useRef, useState } from 'react'

import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'


function Audioplayer() {

  const audioRef = useRef(null)

  const [currentEpisode, setCurrentEpisode] = useState()

  const [currentTime, setCurrentTime] = useState(0)

  const [Loading,setLoading] = useState(true)

  const [Error,setError] = useState(null)




  const playlist = useAudioPlayerStore((state)=>state.playlist)



  // const playAudio = useAudioPlayerStore((state)=>state.playAudio)

  
   const toggleAudioPlay = useAudioPlayerStore((state)=>state.toggleAudioPlay)

   const playNext = useAudioPlayerStore((state)=>state.playNext)

   const playPrevious = useAudioPlayerStore((state)=>state.playPrevious)




  const updateProgress =  ()=>{
    console.log("update time called")
    if(audioRef.current){
    setCurrentTime(audioRef.current.currentTime/60)
    }
  }
 



   const handlePlayPause = ()=>{
    if (audioRef.current){
     
      toggleAudioPlay()
  }
}

  


  useEffect(() => {

  // console.log("Playlist"+JSON.stringify(playlist))

    setCurrentEpisode(playlist?.find((ep)=>{
    return ep?.isCurrent===true
  }))

  //console.log(currentEpisode)
   
  }, [playlist])

  useEffect(() => {
    console.log("current episode changed")

      if(audioRef.current){
    audioRef.current.addEventListener('timeupdate',updateProgress)

    audioRef.current.addEventListener('error',(e)=>{setError(e)
    })

    audioRef.current.addEventListener('loadstart',()=>setLoading(true))


    audioRef.current.addEventListener('waiting',()=>setLoading(true))

    audioRef.current.addEventListener('ended',playNext)


    currentEpisode?.isPlaying?
    audioRef.current.play():audioRef.current.pause()


    audioRef.current.addEventListener('canplay',()=>setLoading(false))

    audioRef.current.addEventListener('loadedmetadata',()=>setLoading(false))
      }
  
    return () => {
      if (audioRef.current){
        audioRef.current.removeEventListener('timeupdate',updateProgress)

        audioRef.current.removeEventListener('canplay',()=>setLoading(false))

    audioRef.current.removeEventListener('loadedmetadata',()=>setLoading(false))

    audioRef.current.removeEventListener('waiting',()=>setLoading(true))

    audioRef.current.removeEventListener('loadstart',()=>setLoading(true))

    audioRef.current.removeEventListener('error',(r)=>{
      console.log(e)
      setError(e)})




      }
    }
  }, [currentEpisode])
  
  if (Error){
    return <p>
      {Error}
    </p>
  }



  return (
    <div>
      {playlist&&

     
    <div className=' bg-neutral-200  pt-2'>
        <div className='flex flex-row justify-center gap-2'>
          <Button
          radius='full'
          variant='solid'
          isIconOnly
          onClick={playPrevious}
          >
          <SkipBackIcon/>
          </Button>

          <Button
          variant='light'
          radius='full'
          isIconOnly
          onClick={handlePlayPause}

          >
          {/* { audioPlayer?.isPlaying? <PauseIcon/>:<PlayIcon/>} */}
          {
            Loading?<Spinner className='fill-red-700' />:currentEpisode?.isPlaying?<PauseIcon/>:<PlayIcon/>
          }
          </Button>

          <Button
          radius='full'
          variant='solid'
          isIconOnly
          onClick={playNext}
          >
          <SkipForwardIcon/>
          </Button>


        </div>
        <div className='flex flex-row justify-center'>

        
        <p className='text-center font-semibold text-lg font-poppins line-clamp-1'>
          {currentEpisode?.title}
        </p>

        
        </div>
        <div className='flex flex-row gap-2 px-2'>

       
        <p className='font-poppins'>
        {
         currentTime.toFixed(2)
        }
        </p>
        { <Slider size='sm' color='foreground'
        value={currentTime}
        // onChangeEnd={(val)=>{console.log(val)}}
        onChange={(val)=>{
          console.log(val)
          setCurrentTime(val)
          audioRef.current.currentTime = val*60
        }}
        maxValue={(parseFloat
          (currentEpisode?.playtime)/60).toFixed(2)}
        step={0.01}
        aria-label='Seek-bar'
        className=''
        /> }
        <p className='font-poppins'>
        {(parseFloat
          (currentEpisode?.playtime)/60).toFixed(2)}
        </p>

        </div>

        <audio autoPlay key={currentEpisode?.listen_url} ref={audioRef}>
          <source src={currentEpisode?.listen_url} type='audio/mpeg'/>

        </audio>


</div>
 }
 </div>
  )
}

export default Audioplayer