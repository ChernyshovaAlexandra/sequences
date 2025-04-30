import { FC } from "react";
import { formatTime } from "./utils";
import { useSequenceGame } from "./hooks/useSequenceGame";
import { SequenceGameProps } from "./interfaces";
import { DefaultCard, DefaultPanel, DraggableCard } from "./components";
import { CardComponentProps } from "../../match-core/src/interfaces/common";

export const SequenceGame: FC<SequenceGameProps> = ({
  items,
  cardComponent: Card = undefined,
  // cx,
  // panelComponent: Panel = DefaultPanel,
  timer,
  timerComponent: TimerComponent,
  timerFormat = "MMSS",
}) => {
  const {
    handleDrop,
    handleDragOver,
    remainingTime,
    handleReturnCard,
    gridCells,
    remainingCardImages,
  } = useSequenceGame(items, timer);

  return (
    <div>
      {/* Таймер */}
      {remainingTime !== undefined &&
        (TimerComponent ? (
          <TimerComponent
            timer={remainingTime}
            formattedTimer={
              timerFormat === "MMSS" ? formatTime(remainingTime) : remainingTime
            }
          />
        ) : (
          <div>
            {timerFormat === "MMSS" ? formatTime(remainingTime) : remainingTime}
          </div>
        ))}

      {/* Верхняя зона — ячейки */}
      <div style={{ display: "flex", gap: "10px" }}>
        {gridCells?.map((cell, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            style={{
              width: 120,
              height: 160,
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cell && (
              <DraggableCard
                index={index}
                card={cell}
                cardComponent={Card}
                imageSrc={cell.img}
                handleReturnCard={handleReturnCard}
              />
            )}
          </div>
        ))}
      </div>

      {/* Нижняя зона — оставшиеся карточки */}
      <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
        {remainingCardImages?.map((card, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, -2)}
            onDragOver={handleDragOver}
            style={{
              width: 120,
              height: 160,
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card && (
              <DraggableCard
                index={index}
                card={card}
                cardComponent={Card}
                imageSrc={card.img}
                handleReturnCard={handleReturnCard}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
