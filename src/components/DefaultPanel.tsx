import styled from "styled-components";
import { SequenceItem } from "../interfaces";

type CardLike = React.ComponentType<any>;

interface Props {
  slots: (SequenceItem | null)[];
  Card: CardLike;
}
const PanelWrap = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

export const DefaultPanel = ({ slots, Card }: Props) => (
  <PanelWrap>
    {slots.map((slot, idx) =>
      slot ? (
        <Card key={slot.id} value={slot.value} />
      ) : (
        <div
          key={idx}
          style={{
            width: 80,
            height: 40,
            border: "2px dashed #bbb",
            borderRadius: 8,
          }}
        />
      )
    )}
  </PanelWrap>
);
