import { Button, Card, CardBody, CardHeader, Divider, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Spinner, useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FilterIcon, SlidersHorizontalIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { fetchBooks } from '../api/fetchers'
import Audiobookcard from './Audiobookcard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Audiobookfilter from './Audiobookfilter'

function BookContainer() {
  // const fetchBooks = async()=>{
  //   const res = axios.get("http://localhost:3000/audiobooks")
  //   return res
  // }

  
  // const [audiobooks, setAudiobooks] = useState(res.data.data.)

  const navigator = useNavigate()
 
  const {isOpen, onOpen, onOpenChange} = useDisclosure()




 const [searhParams, setSearchparams] = useSearchParams();



 const res = useQuery({queryKey:["books",searhParams.get("search")??"",searhParams.get("genres")??"",searhParams.get("durationMin")??"",searhParams.get("durationMax")??"",searhParams.get("language")??"",searhParams.get("page")==null?1:searhParams.get("page")],queryFn:fetchBooks,
    staleTime:1000*60*5,
  })
// console.log(searhParams)
//   console.log(searhParams.get("page"))
//   console.log(searhParams.get("search"))

  
    if (res.isLoading){
      return <Spinner className='mx-auto my-auto'/>
    }
    if (res.isError){
      return <Card className='max-w-[40%] mx-auto my-auto text-neutral-700 bg-neutral-200'
      shadow='none'
      radius='sm'
      >
        <CardHeader className='font-poppins font-bold text-2xl'>
          Error
        </CardHeader>
        <CardBody>
        <p className='font-poppins font-semibold text-lg'>
        
        Something went wrong
        
        </p>
        <Button className='font-poppins font-semibold bg-neutral-200'  variant='flat' onClick={()=>{
          navigator('/')
        }} >  
            Back to Home
        </Button>
        </CardBody>
      </Card>
    }
  
  return (
    <div className='flex flex-1'>
      <div className='w-1/6 min-w-[260px] hidden md:block border-r-2 '>
        <Audiobookfilter />
      </div>
    
      <div className='flex flex-col gap-4'>

      
   
   <div className='md:hidden mx-auto mt-2'>
   
      <Button className='font-semibold text-md font-poppins py-' size='md' radius='full' color='primary' startContent={<SlidersHorizontalIcon/>}
      onClick={onOpen}
      
      >
        Filter Audiobooks
      </Button>
      
      </div>
      <Divider/>

     <Modal isOpen={isOpen} size='md' onOpenChange={onOpenChange} radius='md'>
      <ModalContent>
        <ModalHeader className=' p-2 justify-center font-poppins font-bold text-neutral-700'>
          Filter Audiobooks
        </ModalHeader>
        <ModalBody className='p-0'>

        <Audiobookfilter/>

        </ModalBody>

      </ModalContent>

    </Modal>


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
        //console.log(audiobook.id)
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