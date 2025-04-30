import * as React$1 from 'react';
import React__default, { ReactNode, FC } from 'react';
import * as zustand from 'zustand';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface SequenceItem {
    id: string;
    title?: string;
    value?: any;
    img?: any;
}
interface PanelProps {
}
interface CardComponentProps {
    card: SequenceItem;
    onClick?: () => void;
    onDragStart?: (e: React__default.DragEvent) => void;
    draggable?: boolean;
    children?: ReactNode;
}
interface SequenceCard {
    imageSrc: string;
    index: number;
    card: SequenceItem;
    cardComponent?: React__default.ComponentType<CardComponentProps>;
    handleReturnCard: (card: SequenceItem) => void;
}
interface TimerProps {
    timer: number;
    formattedTimer: string | number;
}
interface SequenceGameProps {
    /** Исходный (правильный) порядок */
    items: SequenceItem[];
    /** Компонент карточки (перетаскиваемый) */
    cardComponent?: React__default.ComponentType<CardComponentProps>;
    /** Компонент панели‑контейнера (ячейки сверху) */
    panelComponent?: React__default.ComponentType<PanelProps>;
    /** Время на игру, сек.  Если не передан — игра без таймера */
    timer?: number;
    /** Формат вывода времени: MMSS или raw */
    timerFormat?: "MMSS" | "raw";
    /** Кастомный компонент таймера */
    timerComponent?: React__default.ComponentType<TimerProps>;
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

declare const SequenceGame: FC<SequenceGameProps>;

interface SequenceStore {
    order: string[];
    score: number;
    timer: number | null;
    grid: (SequenceItem | null)[];
    remaining: (SequenceItem | null)[];
    setGrid(value: (SequenceItem | null)[] | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])): void;
    setRemaining(value: (SequenceItem | null)[] | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])): void;
    setOrder(order: string[] | ((prev: string[]) => string[])): void;
    setScore(v: number | ((p: number) => number)): void;
    startTimer(sec: number): void;
    tick(): void;
}
declare const useSequenceStore: zustand.UseBoundStore<zustand.StoreApi<SequenceStore>>;

type CardLike$1 = React.ComponentType<any>;
interface Props$2 {
    cards: SequenceItem[];
    Card: CardLike$1;
}
declare const BottomZone: ({ cards, Card }: Props$2) => react_jsx_runtime.JSX.Element;

interface Props$1 {
    value: string;
    isDragging?: boolean;
}
declare const DefaultCard: React$1.MemoExoticComponent<({ value, isDragging }: Props$1) => react_jsx_runtime.JSX.Element>;

declare const DraggableCard: React__default.FC<SequenceCard>;

type CardLike = React.ComponentType<any>;
interface Props {
    slots: (SequenceItem | null)[];
    Card: CardLike;
}
declare const DefaultPanel: ({ slots, Card }: Props) => react_jsx_runtime.JSX.Element;

declare const useSequenceGame: (items: SequenceItem[], timer?: number) => {
    handleDrop: (e: React.DragEvent<HTMLDivElement>, cellIndex: number) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleReturnCard: (card: SequenceItem) => void;
    isCardOrderCorrect: () => boolean;
    remainingTime: number | undefined;
    gridCells: (SequenceItem | null)[];
    remainingCardImages: (SequenceItem | null)[];
    setGridCells: (value: (SequenceItem | null)[] | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])) => void;
    setRemainingCardImages: (value: (SequenceItem | null)[] | ((prev: (SequenceItem | null)[]) => (SequenceItem | null)[])) => void;
};

declare function shuffleArray<T>(array: T[]): T[];
declare const formatTime: (seconds: number) => string;

export { BottomZone, type CardComponentProps, DefaultCard, DefaultPanel, DraggableCard, type PanelProps, type SequenceCard, SequenceGame, type SequenceGameProps, type SequenceItem, type TimerProps, formatTime, shuffleArray, useSequenceGame, useSequenceStore };
