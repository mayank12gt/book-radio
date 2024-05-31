import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Audiobookcard({audiobook}) {

    const navigate = useNavigate()

    const formatTime = (time)=>{

    }

    const getGutendexId =(url)=>{
        const parts = url.split('/');
const lastPart = parts[parts.length - 1];

console.log(lastPart);
return lastPart
    }


  return (
    <Card shadow='none' 
    radius='sm'
    isPressable
    onClick={()=>{
        navigate(`/audiobooks/${audiobook.id}`)
    }}
    className='bg-transparent max-w-[250px]'>
        
        <CardBody className='max-w-full items-center p-1 max-h-fit  flex-grow-0 flex-shrink-0 overflow-hidden'>
            <Image
            shadow="none"
            radius='sm'
            width={'240'}
            height={'300'}
            className='h-[300px]'
            src={`https://www.gutenberg.org/cache/epub/${getGutendexId(audiobook.url_text_source)}/pg${getGutendexId(audiobook.url_text_source)}.cover.medium.jpg`}
             fallbackSrc={'src/assets/placeholder.jpg'}
            />
            <p className='text-xl font-bold font-poppins text-center text-neutral-700 self-stretch mt-2 line-clamp-2'>
                {audiobook.title}
            </p>
            <p className='text-lg font-semibold font-poppins text-neutral-600 text-center line-clamp-1'>
            {audiobook.authors?
            audiobook.authors[0]?.first_name+" "+ audiobook.authors[0]?.last_name:null}
            </p>
            <div className='flex flex-row  self-stretch justify-evenly'>

            
            <p className='text-lg font-semibold font-poppins text-neutral-600 '>
                {audiobook.totaltime}
            </p>
            <p className='text-lg font-semibold font-poppins text-neutral-600'>
                {audiobook.language}
            </p>
            {/* <p className='text-medium font-bold text-neutral-600'>
                Fiction
            </p> */}
            </div>
            
        </CardBody>
        <CardFooter className='gap-1  p-1 overflow-x-auto max-w-full  h-full items-end' >
            {
                audiobook.genres.map((genre)=>{
                    return <Chip key={genre.id} className='bg-neutral-200'  radius='sm'>
                    <p className=' text-blue-500 font-semibold font-poppins text-md'>
                    {genre.name}
                    </p>
                   
                </Chip>
                })
            }
            
            
        </CardFooter>

    </Card>
  )
}

export default Audiobookcard