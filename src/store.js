import { create } from "zustand";

export const useAudioPlayerStore = create((set) => ({
  playlist: null,
  audiobook: null,
  //episode : null,

  setPlaylist: (plist) =>
    set({
      playlist: plist,
    }),

  setAudiobook: (audiobook) =>
    set({
      audiobook: audiobook,
    }),

  // getCurrEpisode : ()=>set((state)=>{
  //     playlist : plist}),

  // setEpisode : (ep)=>set({
  //     episode : ep}),

  toggleAudioPlay: () =>
    set((state) => ({
      playlist: state.playlist?.map((ep) => {
        return ep.isCurrent ? { ...ep, isPlaying: !ep.isPlaying } : ep;
      }),
    })),

  // playNext :()=>set((state)=>({
  //     const cuurIndex = state.playlist.findIndex(ep=>ep.isCurrent);
  //     playlist: state.playlist?.map((ep)=>{
  //       return  ep.isCurrent?{...ep,isPlaying: !ep.isPlaying}:ep
  //     })
  // })),

  playNext: () =>
    set((state) => {
      const currentIndex = state.playlist?.findIndex((ep) => ep.isCurrent);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % state.playlist.length;
        const updatedPlaylist = state.playlist.map((ep, index) => {
          if (index === currentIndex) {
            return { ...ep, isCurrent: false, isPlaying: false };
          }
          if (index === nextIndex) {
            return { ...ep, isCurrent: true, isPlaying: true };
          }
          return ep;
        });

        return { playlist: updatedPlaylist };
      } else {
        return state;
      }
    }),

  playPrevious: () =>
    set((state) => {
      const currentIndex = state.playlist?.findIndex((ep) => ep.isCurrent);
      if (currentIndex !== -1) {
        const prevIndex =
          (currentIndex - 1 + state.playlist.length) % state.playlist.length;

        const updatedPlaylist = state.playlist.map((ep, index) => {
          if (index === currentIndex) {
            return { ...ep, isCurrent: false, isPlaying: false };
          }
          if (index === prevIndex) {
            return { ...ep, isCurrent: true, isPlaying: true };
          }
          return ep;
        });
        return { playlist: updatedPlaylist };
      } else {
        return state;
      }
    }),
  // removeEpisode : ()=>set((state)=>({
  //     episode : null
  // }))
}));
