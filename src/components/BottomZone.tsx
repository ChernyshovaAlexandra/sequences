import styled from "styled-components";
import { SequenceItem } from "../interfaces";

type CardLike = React.ComponentType<any>;

interface Props {
  cards: SequenceItem[];
  Card: CardLike;
}

const Zone = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const BottomZone = ({ cards, Card }: Props) => (
  <Zone>
    {cards.map((c) => (
      <Card key={c.id} value={c.value} />
    ))}
  </Zone>
);
