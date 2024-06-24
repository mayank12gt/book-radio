import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAudiobook } from '../api/fetchers'
import { Button, Chip, Divider, Image } from '@nextui-org/react'
import Episodecard from './Episodecard'
import { CirclePlayIcon, PlayIcon, PlaySquareIcon } from 'lucide-react'
import { useAudioPlayerStore } from '../store'
import parse from 'html-react-parser';


function Audiobookdetailscontainer() {

const [isExpanded, setIsExpanded] = useState(false)

  const getGutendexId =(url)=>{
    const parts = url.split('/');
const lastPart = parts[parts.length - 1];

//console.log(lastPart);
return lastPart
}


  const audiobookID = useParams()

  const res = useQuery({queryKey:["audiobooks",audiobookID.id],queryFn:fetchAudiobook,
  staleTime:1000*60*5,
  })

  const audiobook = res?.data?.data



  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    // const seconds = Math.floor(time % 60);
    if (hours!=0){
      return `${hours} hours`
    }else{
      return `${minutes} minutes`
    }

    
  };

  
const setPlaylist = useAudioPlayerStore((state)=>state.setPlaylist)

const setAudiobook = useAudioPlayerStore((state)=>state.setAudiobook)

const setPlist = (episode)=>{
  const playlistStore = audiobook?.sections?.map((ep)=>{
    return{
      ...ep,
      isCurrent:ep.id===episode.id?true:false,
      isPlaying:ep.id===episode.id?true:false
    }
  })

 console.log(playlistStore)
 setPlaylist(playlistStore)
 setAudiobook({id:audiobook?.id,title:audiobook?.title})
 
}

  if (res.isLoading){
    return <p>
      Loading
    </p>
  }
  if (res.isError){
    return <p>
      Error
    </p>
  }

  return (
    <div className=' max-w-screen-lg mx-auto px-2 pt-2'>
    <div className='flex flex-col md:flex-row items-center md:items-start '>
      
                  <Image
            shadow="none"
            radius='sm'
            width={'260'}
            height={'300'}
            
            src={`https://www.gutenberg.org/cache/epub/${getGutendexId(audiobook.url_text_source)}/pg${getGutendexId(audiobook.url_text_source)}.cover.medium.jpg`}
            fallbackSrc={'/placeholder.jpg'}
            
            />
      <div className='flex-col flex flex-1 md:ms-4 mt-2 self-stretch'>
        <p className='text-neutral-700 text-2xl font-bold font-poppins text-center'>
          {audiobook.title}
        </p>
        

        <p className='text-xl font-semibold font-poppins text-neutral-600 text-center line-clamp-1 pt-1'>
            {audiobook.authors[0].first_name+" "+ audiobook.authors[0].last_name}
            </p>

            <div className='flex flex-row justify-evenly pt-2 overflow-x-auto items-stretch'>

            <p className='text-lg font-semibold font-poppins text-neutral-600 '>
                {formatTime(audiobook?.totaltimesecs)}
            </p>
            
            <p className='text-lg font-semibold font-poppins text-neutral-600'>
                {audiobook?.language}
            </p>
            
            <p className='text-lg font-semibold font-poppins text-neutral-600'>
                {audiobook?.copyright_year}
            </p>
        </div>
      



        <p className={`text-neutral-600 text-lg font-semibold ${isExpanded?'line-clamp-none':'line-clamp-5'} font-poppins mt-2 text-center`}>
          {parse(audiobook?.description) }
        </p>
        <p className='text-end font-poppins font-semibold text-blue-600 cursor-pointer'
        onClick={()=>{setIsExpanded(!isExpanded)}}
        >
          {isExpanded?'Read Less':'Read More'}
        </p>

        




        <div className='gap-2 flex flex-row mt-4'>{
        audiobook.genres.map((genre)=>{
                    return <Chip key={genre.id} className='bg-neutral-200'  radius='sm'>
                    <p className=' text-blue-500 font-semibold font-poppins text-md'>
                    {genre.name}
                    </p>
                   
                </Chip>
                })}
                </div>

        

        {/* <Button className='mt-2 text-xl font-poppins font-semibold text-slate-200' radius='sm'
        onClick={()=>{
          document.getElementById('episodes-section').scrollIntoView({behavior:'smooth'})


        }}
        color='primary'
        startContent={
          <CirclePlayIcon/>
        } >
          Play
        </Button> */}

         


      </div>
    </div>

    <div className='mt-3'>
      <p className='text-2xl font-bold text-neutral-700 font-poppins  text-center'>
        Episodes
      </p>
      {/* <Divider/> */}

      <div id='episodes-section' className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2 justify-center' >

      
      {
        audiobook?.sections?.map((ep)=>{
          return <Episodecard episode={ep} setPlist = {setPlist} key={ep.id}/>
        })
      }
      </div>

    </div>

      </div>
  )
}

export default Audiobookdetailscontainer