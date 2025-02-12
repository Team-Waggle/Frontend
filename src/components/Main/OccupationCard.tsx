import styled from "styled-components";

const OccupationCard = () => {
  return (
    <OccupationCardFrame>
      <SelectedCard>프론트엔드</SelectedCard>
      <SelectedCard>백엔드</SelectedCard>
      <SelectedCard>디자이너</SelectedCard>
      <SelectedCard>기획자</SelectedCard>
      <SelectedCard>데브옵스</SelectedCard>
    </OccupationCardFrame>
  );
};

export default OccupationCard;

const OccupationCardFrame = styled.div`
  display: flex;
  gap: 4px;
  width: 512px;
  height: 32px;
  margin-left: auto;
`;

const SelectedCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #bababb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;
