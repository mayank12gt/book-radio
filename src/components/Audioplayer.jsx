import React from 'react';
import { Button, Slider, Spacer, Spinner } from '@nextui-org/react';
import { useAudioPlayerStore } from '../store';
import { useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Audioplayer() {
  const audioRef = useRef(null);

  const navigate = useNavigate()

  const [currentEpisode, setCurrentEpisode] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setCurrentEpisode(
      playlist?.find((ep) => {
        return ep?.isCurrent === true;
      })
    );
  }, [playlist]);

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
      {playlist && (
        <div className="bg-neutral-200 pt-2  cursor-pointer "  onClick={()=>{
          navigate(`/audiobooks/${audiobook?.id}`)
        }}>
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
          <div className="flex flex-row justify-center" >
            <p className="text-center font-semibold text-md font-poppins line-clamp-1">
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
          <audio autoPlay key={currentEpisode?.listen_url} ref={audioRef}>
            <source src={currentEpisode?.listen_url} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default Audioplayer;
