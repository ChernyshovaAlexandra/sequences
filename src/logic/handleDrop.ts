import { SequenceItem } from "../interfaces";
import { StateCreator } from "zustand";

export const createHandleDrop = (
  setGrid: Function,
  setRemaining: Function,
  setScore: (cb: (prev: number) => number) => void
) => {
  return (e: React.DragEvent<HTMLDivElement>, cellIndex: number) => {
    e.preventDefault();

    const cardData = e.dataTransfer.getData("card");
    const card: SequenceItem = JSON.parse(cardData);

    setGrid((prevGrid: (SequenceItem | null)[]) => {
      const gridCopy = [...prevGrid];

      setRemaining((prevRemaining: (SequenceItem | null)[]) => {
        const remainingCopy = [...prevRemaining];

        const cardIndexInRemaining = remainingCopy.findIndex(
          (item) => item?.id === card.id
        );
        const cardIndexInGrid = gridCopy.findIndex(
          (item) => item?.id === card.id
        );

        const isCardInRemaining = cardIndexInRemaining !== -1;
        const isCardInGrid = cardIndexInGrid !== -1;
        const isTargetEmpty = gridCopy[cellIndex] === null;

        if (isTargetEmpty && isCardInRemaining) {
          gridCopy[cellIndex] = remainingCopy[cardIndexInRemaining];
          remainingCopy[cardIndexInRemaining] = null;
          setScore((prev) => prev + 10);
        } else if (cellIndex === -2 && isCardInGrid) {
          const firstEmpty = remainingCopy.indexOf(null);
          if (firstEmpty !== -1) {
            remainingCopy[firstEmpty] = gridCopy[cardIndexInGrid];
            gridCopy[cardIndexInGrid] = null;
          }
        } else if (isCardInGrid && gridCopy[cellIndex]) {
          [gridCopy[cellIndex], gridCopy[cardIndexInGrid]] = [
            gridCopy[cardIndexInGrid],
            gridCopy[cellIndex],
          ];
        }

        return remainingCopy;
      });

      return gridCopy;
    });
  };
};