import { SequenceItem } from "../interfaces";

export const isCardOrderCorrect = (grid: (SequenceItem | null)[]): boolean => {
  if (grid.some((cell) => !cell)) return false;

  for (let i = 1; i < grid.length; i++) {
    const prev = grid[i - 1]?.id;
    const curr = grid[i]?.id;
    if (!prev || !curr || curr <= prev) return false;
  }

  return true;
};