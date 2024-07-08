import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Slider, Spacer, Spinner, Tooltip } from '@nextui-org/react';
import { useAudioPlayerStore } from '../store';
import { useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, SpeechIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function Audioplayer() {
  const audioRef = useRef(null);

  const navigate = useNavigate()

  const [currentEpisode, setCurrentEpisode] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(70)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [skipIntro, setSkipIntro] = useState(false)

  const notifySkipOn = ()=>toast("Skip 12 second intro is turned on")
  const notifySkipOff = ()=>toast("Skip 12 second intro is turned off")



  const audiobook = useAudioPlayerStore((state) => state.audiobook);

  const playlist = useAudioPlayerStore((state) => state.playlist);

  const toggleAudioPlay = useAudioPlayerStore((state) => state.toggleAudioPlay);
  const playNext = useAudioPlayerStore((state) => state.playNext);
  const playPrevious = useAudioPlayerStore((state) => state.playPrevious);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      toggleAudioPlay();
    }
  };

  useEffect(() => {

   
      if (playlist) {
      
        const widget = document.getElementById('bmc-wbtn');

        

        if (widget) {
          console.log("widget2 true")
          
          widget.style.bottom = "105px"
        }
      }
   

    setCurrentEpisode(
      playlist?.find((ep) => {
        return ep?.isCurrent === true;
      })
    );
  }, [playlist]);

  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.volume = volume/100;
    }
  },[volume])

  useEffect(()=>{
    if (audioRef.current) {
        audioRef.current.playbackRate = playbackSpeed
    }
  },[playbackSpeed])

  useEffect(()=>{
    console.log(skipIntro)
    if (skipIntro&&audioRef.current) {
      if(audioRef.current.currentTime<12){
        audioRef.current.currentTime = 12 
      }
    }
  },[currentEpisode,skipIntro])

  useEffect(()=>{
    console.log(skipIntro)
    if(currentEpisode){
    if (skipIntro) {
      notifySkipOn()
    }else{
      notifySkipOff()
    }
  }
  },[skipIntro])

  useEffect(()=>{
    if (playlist){
      const lastPlayed = {
        audiobook:audiobook,
        playlist:playlist
      }
    localStorage.setItem("continue-listening", JSON.stringify(lastPlayed));
    }

  },[currentEpisode])


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('error', (e) => setError(e));
      audioRef.current.addEventListener('loadstart', () => setLoading(true));
      audioRef.current.addEventListener('waiting', () => setLoading(true));
      audioRef.current.addEventListener('ended', playNext);
      audioRef.current.addEventListener('canplay', () => setLoading(false));
      audioRef.current.addEventListener('loadedmetadata', () => setLoading(false));
      

      currentEpisode?.isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('canplay', () => setLoading(false));
        audioRef.current.removeEventListener('loadedmetadata', () => setLoading(false));
        audioRef.current.removeEventListener('waiting', () => setLoading(true));
        audioRef.current.removeEventListener('loadstart', () => setLoading(true));
        audioRef.current.removeEventListener('error', (e) => setError(e));
      }
    };
  }, [currentEpisode]);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <Toaster/>
      {playlist && (
        <div className="bg-neutral-200 pt-2  cursor-pointer "  onClick={()=>{
          navigate(`/audiobooks/${audiobook?.id}`)
        }}>
          <div className="flex flex-row justify-between gap-2 px-1">
            <div className="flex flex-row justify-center gap-2 px-1">
          <Dropdown>
            <DropdownTrigger>
            <Button radius="full" variant="solid" isIconOnly
          className='font-poppins font-semibold justify-self-start'>
          {playbackSpeed+"x"}
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Playback speed menu'
            onAction={(key)=>{
              setPlaybackSpeed(key)
            }}>
              <DropdownItem key={2}>
                <p className='font-poppins font-semibold'>
                {"2x"}

                </p>
              </DropdownItem>
              <DropdownItem  key={1.75}>
                <p className='font-poppins font-semibold'>
                {"1.75x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={1.5}>
                <p className='font-poppins font-semibold'>
                {"1.5x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={1.25}>
                <p className='font-poppins font-semibold'>
                {"1.25x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={1}>
                <p className='font-poppins font-semibold'>
                {"1x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={0.75}>
                <p className='font-poppins font-semibold'>
                {"0.75x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={0.5}>
                <p className='font-poppins font-semibold'>
                {"0.5x"}
                </p>
              </DropdownItem>

              <DropdownItem  key={0.25}>
                <p className='font-poppins font-semibold'>
                {"0.25x"}
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
            <Tooltip content={
              <p className='p-1 font-poppins font-medium'>
                Skip 12 sec intro
              </p>}>
          <Button radius="full" variant="solid" isIconOnly
          className='font-poppins font-semibold justify-self-start'
          
          color={skipIntro?'primary':'default'}
          onClick={()=>{
            setSkipIntro((prev)=>{
              return !prev
            })
          }}>
          <SpeechIcon/>
            </Button>
            </Tooltip>
            </div>
          

          <div className="flex flex-row justify-center gap-2">
          
            <Button radius="full" variant="solid" isIconOnly onClick={playPrevious}>
              <SkipBackIcon />
            </Button>

            <Button variant="light" radius="full" isIconOnly onClick={handlePlayPause}>
              {loading ? (
                <Spinner className="" />
              ) : currentEpisode?.isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </Button>

            <Button radius="full" variant="solid" isIconOnly onClick={playNext}>
              <SkipForwardIcon />
            </Button>
            </div>

            <Dropdown>
              <DropdownTrigger>
              <Button radius="full" variant="solid" isIconOnly
          className='font-poppins font-medium justify-self-start mr-10' 
          >
            {volume==0?<VolumeXIcon/>:<Volume2Icon/>}
            </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem>
                <Slider   
        size="sm"
        step={10} 
        maxValue={100} 
        minValue={0} 
        aria-label="Volume"
        value={volume}
        onChange={(val)=>{
          setVolume(val)
        
        }}
      />

                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* <Button radius="full" variant="solid" isIconOnly
          className='font-poppins font-medium justify-self-start' 
          >
          <Volume2Icon/>
            </Button> */}
          </div>
          <div className="flex flex-row justify-center py-1" >
            <p className="text-center font-semibold text-sm font-poppins line-clamp-1">
              {currentEpisode?.title+" | "+audiobook?.title}
            </p>
          </div>
          <div className="flex flex-row gap-2 px-2">
            <p className="font-poppins w-12">{formatTime(currentTime)}</p>
            <Slider
              size="sm"
              color="foreground"
              value={currentTime}
              onChange={(val) => {
                setCurrentTime(val);
                if (audioRef.current) {
                  audioRef.current.currentTime = val;
                }
              }}
              maxValue={currentEpisode?.playtime || 0}
              step={0.01}
              aria-label="Seek-bar"
            />
            <p className="font-poppins w-12">{formatTime(currentEpisode?.playtime || 0)}</p>
          </div>

          <audio autoPlay key={currentEpisode?.listen_url} ref={audioRef} preload='metadata'>
            <source src={currentEpisode?.listen_url} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default Audioplayer;
