import { SequenceItem } from "../interfaces";

export const createHandleReturnCard = (
  setGrid: Function,
  setRemaining: Function
) => {
  return (card: SequenceItem) => {
    setGrid((prevGrid: (SequenceItem | null)[]) => {
      const gridCopy = [...prevGrid];

      setRemaining((prevRemaining: (SequenceItem | null)[]) => {
        const remainingCopy = [...prevRemaining];

        const isCardInRemaining = remainingCopy.some(
          (item) => item?.id === card.id
        );
        const isCardInGrid = gridCopy.some((item) => item?.id === card.id);

        if (isCardInGrid) {
          const fromIndex = gridCopy.findIndex((item) => item?.id === card.id);
          const toIndex = remainingCopy.indexOf(null);
          if (toIndex !== -1) {
            remainingCopy[toIndex] = card;
            gridCopy[fromIndex] = null;
          }
        } else if (isCardInRemaining) {
          const fromIndex = remainingCopy.findIndex(
            (item) => item?.id === card.id
          );
          const toIndex = gridCopy.indexOf(null);
          if (toIndex !== -1) {
            gridCopy[toIndex] = card;
            remainingCopy[fromIndex] = null;
          }
        }

        return remainingCopy;
      });

      return gridCopy;
    });
  };
};