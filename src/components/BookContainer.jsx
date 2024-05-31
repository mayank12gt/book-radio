import { Button, Pagination } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FilterIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { fetchBooks } from '../api/fetchers'
import Audiobookcard from './Audiobookcard'
import { useSearchParams } from 'react-router-dom'
import Audiobookfilter from './Audiobookfilter'

function BookContainer() {
  // const fetchBooks = async()=>{
  //   const res = axios.get("http://localhost:3000/audiobooks")
  //   return res
  // }

  
  // const [audiobooks, setAudiobooks] = useState(res.data.data.)
 const [searhParams, setSearchparams] = useSearchParams();



 const res = useQuery({queryKey:["books",searhParams.get("search")??"",searhParams.get("page")==null?1:searhParams.get("page")],queryFn:fetchBooks,
    staleTime:1000*60*5,
  })
console.log(searhParams)
  console.log(searhParams.get("page"))
  console.log(searhParams.get("search"))

  
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
    <div className='flex flex-1'>
      <div className='w-1/6 min-w-[260px] hidden md:block border-r-2'>
        <Audiobookfilter/>
      </div>
      <div className='flex flex-col gap-4'>

      
   
   
      {/* <Button className='fixed bottom-1 font-semibold text-md' radius='full' color='primary' startContent={<FilterIcon/>}>
        Filter
      </Button> */}
      <div className='text-9xl flex justify-center flex-wrap gap-8 m-4 content-start'>
      {/* <p className='text-8xl  w-fit'>
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey
      Hey





      </p> */}

      {res?.data?.data?.audiobooks?.map((audiobook)=>{
        console.log(audiobook.id)
       return <Audiobookcard key={audiobook.id} audiobook={audiobook}/>
      })}
     
      


      </div>
      <Pagination 
      variant='faded'
      showControls 
      onChange={(newPage)=>{
        searhParams.delete("page")
          searhParams.append("page",newPage)
          setSearchparams(searhParams)
      
      }}
      className='self-center font-medium font-poppins' radius='sm' total={res.data.data.metadata.last_page} page={res?.data?.data?.metadata?.current_page}/>
    </div>
    </div>
   
  )
}

export default BookContainer