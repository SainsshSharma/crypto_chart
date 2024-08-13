import { create } from 'zustand'

export const useStore = create((set) => ({
  interval: "7",
  updateInterval: (newInterval) => set({interval:newInterval}),

  curr:"bitcoin",
  updateCurr:(newCurr)=>set({curr:newCurr}),

  secondCurr:"tether",
  updateSecondCurr:(secondNewCurr)=>set({secondCurr:secondNewCurr}),

  compare: false,
  updateCompare:(newCompare)=>set({compare:newCompare})

}))