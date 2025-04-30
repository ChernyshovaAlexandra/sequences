import { create } from "zustand";
import { SequenceItem } from "../interfaces";

export interface SequenceStore {
  order: string[];
  score: number;
  timer: number | null;
  grid: (SequenceItem | null)[];
  remaining: (SequenceItem | null)[];
  remainingTime: number | undefined;
  setRemainingTime: (
    value:
      | number
      | undefined
      | ((prev: number | undefined) => number | undefined)
  ) => void;
  setGrid(
    value:
      | (SequenceItem | null)[]
      | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])
  ): void;
  setRemaining(
    value:
      | (SequenceItem | null)[]
      | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])
  ): void;
  setOrder(order: string[] | ((prev: string[]) => string[])): void;
  setScore(v: number | ((p: number) => number)): void;
  startTimer(sec: number): void;
  tick(): void;
}

export const useSequenceStore = create<SequenceStore>()((set) => ({
  order: [],
  score: 0,
  timer: null,
  remainingTime: undefined,
  grid: [],
  remaining: [],
  setOrder: (value) =>
    set((state) => ({
      order: typeof value === "function" ? value(state.order) : value,
    })),
  setRemainingTime: (
    value:
      | number
      | undefined
      | ((prev: number | undefined) => number | undefined)
  ) =>
    set((state) => ({
      remainingTime:
        typeof value === "function" ? value(state.remainingTime) : value,
    })),
  setScore: (v) =>
    set((s) => ({
      score: typeof v === "function" ? v(s.score) : v,
    })),
  setGrid: (value) =>
    set((state) => ({
      grid: typeof value === "function" ? value(state.grid) : value,
    })),
  setRemaining: (value) =>
    set((state) => ({
      remaining: typeof value === "function" ? value(state.remaining) : value,
    })),
  startTimer: (sec) => set({ timer: sec }),
  tick: () =>
    set((s) => (s.timer === null ? {} : { timer: Math.max(0, s.timer - 1) })),
}));
