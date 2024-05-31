import { Autocomplete,AutocompleteItem, Button, ButtonGroup, Chip, Divider, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'

function Audiobookfilter() {

  const [values, setvalues] = useState(["One","Two"])

  return (
    <div className='h-full w-full p-2 pt-4'>

      <p className='font-poppins font-bold text-2xl text-center text-neutral-700 h-[40px] hidden'>
        Filter
      </p>
      {/* <Divider className=''/> */}
        <Select
        label="Language" 
        className="max-w-xs font-poppins font-medium mt-2" 
        radius='sm'
        variant='faded'
             


      >
        <SelectItem className='font-poppins' key={"English"}
        value={"English"}
        >
          English
        </SelectItem>
        <SelectItem className='font-poppins' key={"German"}
        value={"English"}
        >
          German
        </SelectItem>
        <SelectItem className='font-poppins' key={"French"}
        value={"English"}
        >
          French
        </SelectItem>
        </Select>


        <Select
        label={"Genres"}
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
              
            
          
          

        </Select>


        <Select
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
              
            
          
          

        </Select>

        <RadioGroup label={"Duration"} className='font-poppins font-medium'
        classNames={{base:"border-2 mt-2 rounded-lg px-2 py-2"}}
        
        >
          <Radio className='font-poppins font-normal'>
            20 mins or less
          </Radio>
          <Radio value={5}  className='font-poppins font-normal'>
            20 mins - 1 hr
          </Radio>
          <Radio value={4}  className='font-poppins font-normal'>
            1 - 3 hr
          </Radio>
          <Radio value={3}      className='font-poppins font-normal'>
            3 - 8 hr
          </Radio>
          <Radio value={2}  className='font-poppins font-normal'>
            8 - 12 hr
          </Radio>
          <Radio value={1} className='font-poppins font-normal'>
           12 hr +
          </Radio>


        </RadioGroup>

        <Divider className='mt-3'/>

        <div  className='mt-2 flex flex-row gap-2'>
          <Button className='flex-1 font-poppins font-semibold text-large' 
          radius='sm'
          color='primary'
          
          >
            Apply
          </Button>
          <Button className='flex-1 font-poppins font-semibold text-large' 
          radius='sm'
          variant='faded'
          >
            Clear
          </Button>
        </div>



    </div>
  )
}

export default Audiobookfilter