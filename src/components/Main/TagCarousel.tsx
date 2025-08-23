import React from "react";
import styled from "styled-components";
import XIcon from "../../assets/images/icon/xIcon.svg?react";

type TagData = {
  id: number;
  label: string;
};

const tags: TagData[] = [
  { id: 1, label: "기획자" },
  { id: 2, label: "React" },
  { id: 3, label: "JavaScript" },
  { id: 4, label: "헬스케어" },
  { id: 5, label: "게임" },
  { id: 6, label: "엔터테인먼트" },
  { id: 7, label: "엔터테인먼트" },
  { id: 8, label: "엔터테인먼트" },
  { id: 9, label: "엔터테인먼트" },
  { id: 10, label: "엔터테인먼트" },
  { id: 11, label: "엔터테인먼트" },
  { id: 12, label: "엔터테인먼트" },
  { id: 13, label: "엔터테인먼트" },
];

const TagCarousel: React.FC = () => {
  return (
    <CarouselContainer>
      <TagWrapper>
        {tags.map((tag) => (
          <Tag key={tag.id}>
            {tag.label} <XIcon />
          </Tag>
        ))}
      </TagWrapper>
    </CarouselContainer>
  );
};

export default TagCarousel;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  margin: auto;
`;

const TagWrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 600px;
  overflow: hidden; */
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 24px;
  padding: 2px 7px 2px 11px;
  box-sizing: border-box;
  gap: 1px;
  background-color: #f3f3f3;
  border-radius: 15px;
  white-space: nowrap;
`;
