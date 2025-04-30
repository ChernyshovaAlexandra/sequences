import { useCallback, useEffect, useRef, useState } from "react";
import { SequenceItem } from "../interfaces";
import { useSequenceStore } from "../store/useSequenceStore";
import {
  createHandleDrop,
  createHandleReturnCard,
  isCardOrderCorrect as checkOrder,
} from "../logic";

export const useSequenceGame = (items: SequenceItem[], timer?: number) => {
  const {
    score,
    setScore,
    grid,
    remaining,
    setGrid,
    setRemaining,
    remainingTime,
    setRemainingTime,
  } = useSequenceStore();

  const isInitialized = useRef(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    createHandleDrop(setGrid, setRemaining, setScore),
    [setGrid, setRemaining, setScore]
  );

  const handleReturnCard = useCallback(
    createHandleReturnCard(setGrid, setRemaining),
    [setGrid, setRemaining]
  );

  const isCardOrderCorrect = useCallback(() => checkOrder(grid), [grid]);

  useEffect(() => {
    if (!isInitialized.current && items.length > 0) {
      setGrid(Array(items.length).fill(null));
      setRemaining(items);
      isInitialized.current = true;
    }
  }, [items, setGrid, setRemaining]);

  useEffect(() => {
    if (timer === undefined) return;
    setRemainingTime(timer);
    const interval = setInterval(() => {
      setRemainingTime((prev: number | undefined) => {
        if (prev === undefined) return undefined;
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return {
    handleDrop,
    handleDragOver,
    handleReturnCard,
    isCardOrderCorrect,
    remainingTime,
    gridCells: grid,
    remainingCardImages: remaining,
    setGridCells: setGrid,
    setRemainingCardImages: setRemaining,
  };
};
