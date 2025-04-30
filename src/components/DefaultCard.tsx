import { memo } from "react";
import styled from "styled-components";

interface Props {
  value: string;
  isDragging?: boolean;
}

const CardBox = styled.div<{ $drag?: boolean }>`
  padding: 12px 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: ${({ $drag }) => ($drag ? "#e0e0ff" : "white")};
  cursor: grab;
  user-select: none;
`;

export const DefaultCard = memo(({ value, isDragging }: Props) => (
  <CardBox $drag={isDragging}>{value}</CardBox>
));