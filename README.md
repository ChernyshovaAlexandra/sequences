# 🧩 Sequence Game Core

Переиспользуемая игра "Собери последовательность" для React. Позволяет собрать карточки в правильном порядке по drag-and-drop, с возможностью кастомизации внешнего вида и логики.

## 📦 Установка

```bash
yarn add @chernyshovaalexandra/sequences
# или
npm install @chernyshovaalexandra/sequences
```

## 🚀 Быстрый старт

```tsx
import { SequenceGame } from "@chernyshovaalexandra/sequences";

const items = [
  { id: 1, title: "1", value: "Пункт 1" },
  { id: 2, title: "2", value: "Пункт 2" },
  { id: 3, title: "3", value: "Пункт 3" },
];

<SequenceGame items={items} />
```

## 🔧 Кастомизация

Компонент `SequenceGame` принимает опциональные пропсы:

```tsx
interface SequenceGameProps {
  items: SequenceItem[];
  panelCardComponent?: React.ComponentType<SequenceCard>;
  bottomCardComponent?: React.ComponentType<SequenceCard>;
  timer?: number;
}
```

Ты можешь передать свои кастомные компоненты карточек, например:

```tsx
const MyCard = ({ card, ...props }: SequenceCard) => (
  <div {...props} style={{ border: "2px solid red", padding: 12 }}>
    <img src={card.image} alt={card.title} />
  </div>
);

<SequenceGame
  items={items}
  panelCardComponent={MyCard}
  bottomCardComponent={MyCard}
/>
```

## 📚 Типы

```ts
export interface SequenceItem {
  id: number;
  title: string;
  value: string;
  image?: string;
}

export interface SequenceCard {
  card: SequenceItem;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}
```

## 🧠 Логика

- Карточки можно перетаскивать между ячейками и зоной ниже.
- Игра проверяет правильность порядка с помощью `id`.
- Встроен счётчик очков и таймер (если передан `timer`).

## ✅ TODO

- [ ] Анимации для перемещения
- [ ] Проверка правильности и отображение результата
- [ ] Поддержка локализации
- [ ] Тесты

---

## 👩‍💻 Разработка

```bash
yarn install
yarn dev      # Запуск в watch-режиме
yarn build    # Сборка пакета
```

## 📄 Лицензия

MIT © [chernyshovaalexandra](https://github.com/chernyshovaalexandra)