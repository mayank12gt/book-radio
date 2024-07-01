import { useEffect } from "react"
import { useAudioPlayerStore } from "../store"
import { Card, CardBody, Divider, Image } from "@nextui-org/react"

function Continuelistening() {

    const isPlaylistSet = useAudioPlayerStore((state) => state.playlist);

    const lastPlayed = JSON.parse(localStorage.getItem("continue-listening"))
   

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

    
    const episode=lastPlayed?.playlist?.find((ep) => {
          return ep?.isCurrent === true;
        })
    

    useEffect(()=>{
        console.log(episode)
    },[])


    const setPlaylist = useAudioPlayerStore((state)=>state.setPlaylist)

const setAudiobook = useAudioPlayerStore((state)=>state.setAudiobook)

const setPlist = ()=>{
  const playlistStore = lastPlayed?.playlist?.map((ep)=>{
    return{
      ...ep,
      isPlaying:ep.isCurrent===true?true:false
    }
  })

//  console.log(playlistStore)
 setPlaylist(playlistStore)
 setAudiobook(lastPlayed?.audiobook)
 
}

    

    




  return (
   
        
            lastPlayed&&!isPlaylistSet&&
            <div className="p-2 gap-2 flex flex-col">
                <p className="font-poppins font-semibold text-xl">Continue Listening </p>
                <Card shadow='none' radius='sm' isPressable className='w-full'
                onClick={()=>{
                    setPlist()
                }} 
   >

        <CardBody className='p-2'>
            {/* <p className='text-xl text-center'>
                {`Chapter ${episode.section_number}`}
            </p> */}
            <div className='flex flex-row items-center'>
            {/* <Button
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
            </Button> */}
        
        <Image
            shadow="none"
            radius='sm'
            width={'60'}
            height={'60'}
          
            src={'/placeholder.jpg'}
            
            />
            <div className='flex-1 ms-6'>
            <p className='text-neutral-700 text-xl font-poppins font-semibold line-clamp-2'>
                {episode.title}
            </p>

            <p className='text-neutral-500 text-lg font-poppins font-semibold'>
                {lastPlayed?.audiobook?.title}
            </p>
            <p className='text-md text-neutral-500 font-semibold font-poppins'>
                        {
                          formatTime(episode?.playtime)  
                        }
                    </p>
          
            
                </div>
            </div>
                
        </CardBody>
    </Card>
    
                

                <Divider/>
                
            </div>
        
  )
}

export default Continuelistening