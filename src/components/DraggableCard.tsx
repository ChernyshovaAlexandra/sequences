import React, { memo, ReactNode } from "react";
import { SequenceCard, SequenceItem } from "../interfaces";

export const DraggableCard: React.FC<SequenceCard> = memo(
  ({ card, imageSrc, handleReturnCard, cardComponent: CardComponent }) => {
    const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData("card", JSON.stringify(card));
    };

    const handleClick = () => {
      handleReturnCard?.(card);
    };

    if (CardComponent) {
      return (
        <CardComponent
          card={card}
          onClick={handleClick}
          onDragStart={handleDragStart}
          draggable
        >
          <img
            src={imageSrc}
            alt={card.title}
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          />
        </CardComponent>
      );
    }

    // fallback — если кастомной карты нет
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={handleClick}
        style={{
          width: 120,
          height: 160,
          cursor: "grab",
          border: "1px solid #000",
          background: "#fff",
        }}
      >
        <img
          src={imageSrc}
          alt={card.title}
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }
);
