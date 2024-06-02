import { Autocomplete,AutocompleteItem, Button, ButtonGroup, Chip, Divider, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { fetchGenres } from '../api/fetchers'
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll"

import { genres,languages } from '../api/data'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

function Audiobookfilter() {

 const [searhParams, setSearchparams] = useSearchParams();

 //console.log(searhParams)



// const res= useQuery({
//   queryKey:["genres",searhParams.get("page")==null?1:searhParams.get("page")],queryFn:fetchGenres,
//   staleTime:1000*60*5,
// }
// )

// const [isOpen, setIsOpen] = useState(false)



// const {hasNextPage,fetchNextPage,data,isFetchingNextPage,status,isLoading} = useInfiniteQuery(
//   {
//     queryKey:["genres"],
//     queryFn:fetchGenres,
//     getNextPageParam:(lastPage,pages)=>lastPage.metadata.current_page+1
//   }
//)




// const [,scrollRef] = useInfiniteScroll({
//   hasMore:hasNextPage,
//   isEnabled:isOpen,
//   shouldUseLoader:false,
//   onLoadMore:fetchNextPage

// })

// const genres = data?.genres

const createGenreFilterParam = ()=>{

  const param = genreFilter?Array.from(genreFilter).join(','):""

  return param
}

const createLangFilterParam = ()=>{

  const param = languageFilter!=undefined&&languageFilter!=null&&languageFilter?Array.from(languageFilter).join(','):""

  return param
}

const createDurationFilterParam = ()=>{

  let durationfilterMin
  let durationfilterMax


   switch (durationFilter){
    case 1:
      {
        durationfilterMin=1,
        durationfilterMax=20
        break;
      }
      case 2:
      {
        durationfilterMin=20,
        durationfilterMax=60
        break;
      }
      case 3:
      {
        durationfilterMin=60,
        durationfilterMax=180
        break;
      }
      case 4:
      {
        durationfilterMin=180,
        durationfilterMax=480
        break;
      }
      case 5:
      {
        durationfilterMin=480,
        durationfilterMax=720
        break;
      }
      case 6:
      {
        durationfilterMin=720,
        durationfilterMax=6000
        break;
      }
      default:{
        durationfilterMin=0,
        durationfilterMax=0
      }
    
   }

   return [durationfilterMin,durationfilterMax]
}

const createDurationFilterCode = ()=>{

  let durationFilterCode

  const min = parseInt(searhParams.get("durationMin"))

  const max = parseInt(searhParams.get("durationMax"))

  switch (`${min}-${max}`) {
    case "1-20":{
      durationFilterCode=1
      break;
    }
    case "20-60":
      {
        durationFilterCode=2

      break;
      }
    case "60-180":
      {
        durationFilterCode=3

      break;
      }
      case "180-480":
      {
        durationFilterCode=4

      break;
      }
      case "480-720":
     {
      durationFilterCode=5 
      break;
     }
      case "720-6000":{
        durationFilterCode=6
        break;
      }
    default:{
        durationFilterCode=0
    }

   
  }


   return durationFilterCode
}




const[genreFilter, setGenreFilter] = useState(new Set([]))

const[durationFilter, setDurationFilter] = useState(0)

const[languageFilter, setLanguageFilter] = useState(new Set([]))

// useEffect(()=>{
//   console.log(languageFilter)
// }

// ,[languageFilter])

// useEffect(()=>{
//   console.log(genreFilter)
// }

// ,[genreFilter])


const handleApplyClick =()=>{
  console.log(genreFilter)
              console.log(durationFilter)
              searhParams.delete("genres")
             
             createGenreFilterParam()!=''? searhParams.append("genres",createGenreFilterParam()):null
             
              setSearchparams(searhParams)

              const [durationMin,durationMax] = createDurationFilterParam(durationFilter)
              console.log(durationFilter)
              // console.log([durationMin,durationMax])
             
               searhParams.delete("durationMin")
               durationMin!=0?searhParams.append("durationMin",durationMin):null

              searhParams.delete("durationMax")
              durationMax!=0?searhParams.append("durationMax",durationMax):null
              
              
              setSearchparams(searhParams)

              console.log(languageFilter.values)


              searhParams.delete("language")

              console.log(languageFilter)
              console.log(genreFilter)

              
              // languageFilter!=null?searhParams.append("language",Array.from(languageFilter)[0]):console.log('empty')

              createLangFilterParam()!=''? searhParams.append("language",createLangFilterParam()):null

             setSearchparams(searhParams)

}



useEffect(() => {
  const g = searhParams.get("genres")
  // console.log(g)
  // const durMin = searhParams.get("durationMin")
  // const durMax = searhParams.get("durationMax")


  

  setGenreFilter(g?.split(","))
   setDurationFilter(createDurationFilterCode())
  setLanguageFilter([searhParams.get("language")])
}, [])


  return (
    <div className='h-full w-full p-2 pt-4'>

      <p className='font-poppins font-bold text-2xl text-center text-neutral-700 h-[40px] hidden'>
        Filter
      </p>
      {/* <Divider className=''/> */}
        <Select
        label="Language" 
        className="font-poppins font-medium mt-2" 
        radius='sm'
        variant='faded'
        selectedKeys={languageFilter}
        onSelectionChange={
         
          setLanguageFilter
         }
        items={languages}
       
      >

        
{
          languages.map((it)=>{
            return <SelectItem className='font-poppins' key={it}>
              {it}
            </SelectItem>
          })
        }
        
        </Select>


        <Select
        label={"Genres"}
        variant='faded'
        selectionMode='multiple'
        className='mt-2 font-poppins font-medium'
        items={genres}
        isMultiline
        // isLoading={isLoading}
        radius='sm'
        selectedKeys={genreFilter}
        // scrollRef={scrollRef}
        // onOpenChange={setIsOpen}
        onSelectionChange={setGenreFilter}
        
       
        >

{/*           
          {(item)=>{
             <SelectItem key={item.id}>
                {item.name}

              </SelectItem>
          }
        } */}

        {
          genres.map((it)=>{
            return <SelectItem className='font-poppins' key={it.id}>
              {it.name}
            </SelectItem>
          })
        }
   
        </Select>


        {/* <Select
        label={"Sort"}
        variant='faded'
        selectionMode='multiple'
        className='mt-2 font-poppins font-medium'
        radius='sm'
        >
          {values.map((it)=>{
            return <SelectItem key={it}>
                {it}

              </SelectItem>
          })}
              
        </Select> */}

        <RadioGroup label={"Duration"} className='font-poppins font-medium'
        classNames={{base:"border-2 mt-2 rounded-lg px-2 py-2"}}
        value={durationFilter}
        onValueChange={setDurationFilter}
        >
          <Radio className='font-poppins font-normal' value={1}>
            20 mins or less
          </Radio>
          <Radio value={2}  className='font-poppins font-normal'>
            20 mins - 1 hr
          </Radio>
          <Radio value={3}  className='font-poppins font-normal'>
            1 - 3 hr
          </Radio>
          <Radio value={4}      className='font-poppins font-normal'>
            3 - 8 hr
          </Radio>
          <Radio value={5}  className='font-poppins font-normal'>
            8 - 12 hr
          </Radio>
          <Radio value={6} className='font-poppins font-normal'>
           12 hr +
          </Radio>


        </RadioGroup>

        <Divider className='mt-3'/>

        <div  className='mt-2 flex flex-row gap-2'>
          <Button className='flex-1 font-poppins font-semibold text-large' 
          radius='sm'
          color='primary'
          onClick={handleApplyClick}
          >
            Apply
          </Button>
          <Button className='flex-1 font-poppins font-semibold text-large' 
          radius='sm'
          variant='faded'
          onClick={()=>{
            setGenreFilter(new Set([]))
            setDurationFilter(0)
            setLanguageFilter(new Set([]))
            // handleApplyClick()

          }}
          >
            Clear
          </Button>
        </div>



    </div>
  )
}

export default Audiobookfilter