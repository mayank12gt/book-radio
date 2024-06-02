import { Button, Card, CardBody } from '@nextui-org/react'
import { CirclePause, CirclePlay, PlayIcon } from 'lucide-react'
import React from 'react'
import { useAudioPlayerStore } from '../store'

function Episodecard({episode,setPlist}) {
    

    const playlist = useAudioPlayerStore((state)=>state.playlist)

    const togglePlayAudio = useAudioPlayerStore((state)=>state.togglePlayAudio)

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };


    
    

  return (
    <Card shadow='none' radius='sm' isPressable className='min-w-full
      md:min-w-[33%]' 
      onClick={()=>
    //   {const updatedEp = {...episode, isPlaying: true}
    //   console.log(updatedEp)
    //     setEpisode(updatedEp)}

    setPlist(episode)
        
        }>

        <CardBody className='p-2'>
            {/* <p className='text-xl text-center'>
                {`Chapter ${episode.section_number}`}
            </p> */}
            <div className='flex flex-row items-center'>
            <Button
            variant='solid'
            isIconOnly
            radius='full'
            className=''
            onClick={()=>{
                //console.log('click')
                togglePlayAudio}}>
                {
                playlist?.find(ep=>ep.isCurrent)?.id === episode.id && playlist?.find(ep=>ep.isCurrent)?.isPlaying? <CirclePause/>:<CirclePlay/>
                }
            </Button>
            <div className='flex-1 ms-6'>
            <p className='text-neutral-700 text-2xl font-poppins font-semibold'>
                {episode.title}
            </p>
            <div className=''>
                    <p className='text-xl text-neutral-500 font-semibold font-poppins'>
                        {
                            episode.language
                        }
                    </p>
                    <p className='text-xl text-neutral-500 font-semibold font-poppins'>
                        {
                          formatTime(episode?.playtime)  
                        }
                    </p>
                </div>
                </div>
            </div>
                
        </CardBody>
    </Card>
  )
}

export default Episodecard