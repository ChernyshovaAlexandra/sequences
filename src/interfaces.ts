import React, { ReactNode } from "react";

export interface SequenceItem {
  id: string;
  title?: string;
  value?: any;
  img?: any;
}

export interface PanelProps {}

export interface CardComponentProps {
  card: SequenceItem;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  draggable?: boolean;
  children?: ReactNode;
}

export interface SequenceCard {
  imageSrc: string;
  index: number;
  card: SequenceItem;
  cardComponent?: React.ComponentType<CardComponentProps>;
  handleReturnCard: (card: SequenceItem) => void;
}

export interface TimerProps {
  timer: number;
  formattedTimer: string | number;
}

export interface SequenceGameProps {
  /** Исходный (правильный) порядок */
  items: SequenceItem[];

  /** Компонент карточки (перетаскиваемый) */
  cardComponent?: React.ComponentType<CardComponentProps>;

  /** Компонент панели‑контейнера (ячейки сверху) */
  panelComponent?: React.ComponentType<PanelProps>;

  /** Время на игру, сек.  Если не передан — игра без таймера */
  timer?: number;

  /** Формат вывода времени: MMSS или raw */
  timerFormat?: "MMSS" | "raw";

  /** Кастомный компонент таймера */
  timerComponent?: React.ComponentType<TimerProps>;

  /** Колбэк со счётом при каждом обновлении */
  onScoreUpdate?: (score: number) => void;

  /** Своя формула подсчёта очков */
  calculateScore?: (params: {
    currentScore: number;
    placedCorrectly: boolean;
    remainingTime: number;
  }) => number;

  /** Финальный результат */
  onResult?: (result: {
    finalScore: number;
    remainingTime: number;
    isPerfect: boolean;
  }) => void;
}
