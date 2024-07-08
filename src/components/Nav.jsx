import React, { useState } from 'react'
import { Button, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer, Switch } from '@nextui-org/react';
import {FilterIcon, MenuIcon, MoonIcon, Search, SearchIcon, SidebarCloseIcon, SunIcon, XIcon} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('')

  return (

    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered  className='bg-neutral-200 px-0' 
    classNames={{item:"font-semibold text-xl cursor-pointer",wrapper:"max-w-full flex-col h-fit md:flex-row gap-2 py-1 md:py-2 items-stretch md:items-center px-2 "
    }}
    >
      <NavbarContent className='' justify='start'>
        <NavbarBrand className=' text-2xl flex-grow-0 text-neutral-700 cursor-pointer justify-center font-poppins font-bold'>
          <NavLink to={`/`}>
          BookRadio
          </NavLink>
        </NavbarBrand>
        {/* <NavbarMenuToggle
      icon={isMenuOpen?<XIcon />:<MenuIcon/>}
      className='md:hidden'/> */}
         <NavbarItem className='md:hidden ml-auto ' >

         <a href="https://www.buymeacoffee.com/BookRadio"><img src="https://img.buymeacoffee.com/button-api/?text=Support BookRadio&emoji=🚀&slug=BookRadio&button_colour=40DCA5&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" className='h-10'/></a>
      
          
          
         
           
          
      </NavbarItem>


        </NavbarContent>



        <NavbarContent className='
        flex-grow gap-8'
        justify='center'>

        <NavbarItem className='cursor-pointer px-0  w-full md:w-2/4'>

            <Input 
            radius='sm'
            classNames={{inputWrapper:"ps-0"}}
            className='cursor-pointer w-full rounded-none font-poppins'
            placeholder='Search'
            size='md'
            fullWidth={true}
            value={searchQuery}
            onValueChange={(e)=>{
              console.log(e)
              setSearchQuery(e)
            }}

            startContent={<Button isIconOnly radius='sm' className='rounded-r-none bg-transparent'
            onClick={()=>{
              setIsMenuOpen(false)
              const params = new URLSearchParams({
                search:searchQuery??""
              })
              navigate({ pathname: `/audiobooks`,
                search: `?${params.toString()}`,
              })
            }}
  
            >

                <SearchIcon/>
            </Button>}


            type='search'
             onKeyDown={(e)=>{
              if(e.key=='Enter'){
                // console.log("presses enter")
                setIsMenuOpen(false)
              const params = new URLSearchParams({
                search:searchQuery??""
              })
              navigate({ pathname: `/audiobooks`,
                search: `?${params.toString()}`,
              })


              }
             }}
            
            />
          </NavbarItem>
          
          <NavbarItem className='ml-auto hidden md:block' >

          <a href="https://www.buymeacoffee.com/BookRadio"><img src="https://img.buymeacoffee.com/button-api/?text=Support BookRadio&emoji=🚀&slug=BookRadio&button_colour=40DCA5&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" className='h-10'/></a>

 
 

  
 
</NavbarItem>

        </NavbarContent>

        

        {/* <NavbarContent  className='flex-grow gap-8 hidden md:flex '
        justify='start '
        
        >
          
          <NavbarItem >
            
             <Button 
            as={Link}
            className=' font-poppins font-bold
            text-xl
           text-neutral-700 hover:bg-neutral-40'
            variant='light'
            radius='sm' onClick={()=>{
              navigate('/audiobooks')
            }}>
            Audiobooks</Button> 
           
           
          
            
           
          </NavbarItem>
          <NavbarItem >
          
             <Button className=' font-poppins font-bold
            text-xl
           text-neutral-700 hover:bg-neutral-40'
            variant='light'
            radius='sm' onClick={()=>{
              navigate('/genres')
            }}>
            Genres
            </Button> 
            
          </NavbarItem>
          <NavbarItem>
           <NavLink to={`/authors`}>
            Authors
            </NavLink> 
          </NavbarItem>
          
        </NavbarContent> */}
        {/* <NavbarMenu className='pt-8 gap-1'>
        
          <NavbarMenuItem className='text-center' onClick={()=>{
            console.log('clicked')
            setIsMenuOpen(false)
          }}>
         
            
           
           
            <Button
            href='/audiobooks'
            className=' font-poppins font-bold
            text-xl
           text-neutral-700 hover:bg-neutral-40 w-full'
            variant='light'
            radius='sm'
            onClick={()=>{
              navigate('/audiobooks')
              setIsMenuOpen(false)

            }}>
            Audiobooks
            </Button>
            
        
          
            
           
          
          
          </NavbarMenuItem>
          <NavbarMenuItem className='text-center' onClick={()=>{
            setIsMenuOpen(false)
          }}>
         
          <Button className=' font-poppins font-bold
            text-xl
           text-neutral-700 hover:bg-neutral-40 w-full'
            variant='light'
            radius='sm' onClick={()=>{
              setIsMenuOpen(false)
              navigate('/genres')
            }}>
            Genres
            </Button>
          
          </NavbarMenuItem>
        
      </NavbarMenu> */}

    </Navbar>
  )
}

export default NavBar