import { create } from "zustand";

type CinematicState = {
  isCinematicActive: boolean;
  toggleCinematic: VoidFunction;
};

const useCinematicMode = create<CinematicState>((set) => {
  return {
    isCinematicActive: false,
    toggleCinematic: () => {
      set((state) => ({ isCinematicActive: !state.isCinematicActive }));
    },
  };
});

export default useCinematicMode;
