import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import NewApplyLogoIcon from "../assets/images/icon/newApplyLogoIcon.svg";
import MinusBtnIcon from "../assets/images/icon/minusBtnIcon.svg";
import PlusBtnIcon from "../assets/images/icon/plusBtnIcon.svg";
import RequireIcon from "../assets/images/icon/requireIcon.svg";
import Dropdown from "../components/DropdownC";
import CalendarDropdown from "../components/CalendarDropdown";
// import DropdownWithLabel from "../components/DropdownWithLabel";

const domains = [
  "금융",
  "부동산",
  "인테리어",
  "의료/헬스케어",
  "이커머스",
  "엔터테인먼트",
  "여행",
  "소셜네트워크",
  "문화/예술",
  "뷰티/패션",
  "종교",
  "판매/유통",
  "교육",
  "건설",
  "건강",
  "육아/출산",
  "미디어/광고",
];

const methods = ["온라인", "오프라인", "온/오프라인"];

const periods = [
  "1개월",
  "2개월",
  "3개월",
  "4개월",
  "5개월",
  "6개월",
  "장기 - 미정 포함",
];

const jobs = [
  "기획자",
  "데브옵스",
  "디자이너",
  "마케터",
  "백엔드",
  "안드로이드",
  "프론트엔드",
  "IOS",
];

interface FormValue {
  title: string;
  domain: string;
}

const NewApply = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const [peopleCount, setPeopleCount] = useState(1);

  const OnSubmit: SubmitHandler<FormValue> = (data) => console.log(data);

  return (
    <Wrapper>
      <img src={NewApplyLogoIcon} alt="dsa" />
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <>
          <div style={{ display: "flex" }}>
            <Label htmlFor="title">프로젝트 제목</Label>
            <img src={RequireIcon} alt="" />
          </div>
          <Input placeholder="제목을 작성해 주세요" id="title" />
        </>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "26px",
          }}
        >
          {/* <DropdownWithLabel
            items={domains}
            label="산업 분야"
            title="산업 분야"
          />
          <DropdownWithLabel
            items={methods}
            label="진행 방식"
            title="진행 방식"
          /> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "26px",
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <Label>모집 기간</Label>
              <img src={RequireIcon} alt="" />
            </div>
            <CalendarDropdown title={"마감 날짜"} />
          </div>
          {/* <DropdownWithLabel
            items={periods}
            label="진행 기간"
            title="진행 기간"
          /> */}
        </div>
        <div style={{ marginTop: "34px" }}>
          {/* 모집 직무 */}
          <div>
            <div style={{ display: "flex" }}>
              <Label>모집 직무</Label>
              <img src={RequireIcon} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "617px",
              }}
            >
              <Dropdown items={jobs} title={"모집 직무"} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "130px",
                }}
              >
                <img
                  src={MinusBtnIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPeopleCount(peopleCount - 1);
                  }}
                />
                <span>{peopleCount}</span>
                <img
                  src={PlusBtnIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPeopleCount(peopleCount + 1);
                  }}
                />
              </div>
              <button
                style={{
                  width: "64px",
                  height: "30px",
                  backgroundColor: "#0066FF",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                }}
              >
                추가
              </button>
            </div>
          </div>
          {/* 현재 참여중인 직무 */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex" }}>
              <Label>현재 참여중인 직무</Label>
              <img src={RequireIcon} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "617px",
              }}
            >
              <Dropdown items={jobs} title={"모집 직무"} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "130px",
                }}
              >
                <img
                  src={MinusBtnIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPeopleCount(peopleCount - 1);
                  }}
                />
                <span>{peopleCount}</span>
                <img
                  src={PlusBtnIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPeopleCount(peopleCount + 1);
                  }}
                />
              </div>
              <button
                style={{
                  width: "64px",
                  height: "30px",
                  backgroundColor: "#0066FF",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                }}
              >
                추가
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              marginTop: "20px",
              borderTop: "1px solid #e8e8e9",
              height: "37px",
            }}
          >
            <span>총 모집 인원 10명</span>
            <span>참여중 인원 0명</span>
          </div>
        </div>
        <>
          <div style={{ display: "flex" }}>
            <Label htmlFor="skill">사용 스킬</Label>
            <img src={RequireIcon} alt="" />
          </div>
          <Input placeholder="프로그램 이름을 입력하세요." id="skill" />
        </>
        <div style={{ marginTop: "64px" }}>
          <div style={{ display: "flex" }}>
            <Label htmlFor="introduction">프로젝트 소개</Label>
            <img src={RequireIcon} alt="" />
          </div>
          <Textarea
            placeholder="프로젝트 주제, 진행 상황, 팀원 구성, 지원 자격을 포함해서 작성해 주세요"
            id="introduction"
          />
        </div>
        <div style={{ marginTop: "26px" }}>
          <div style={{ display: "flex" }}>
            <Label htmlFor="contact">연락 방법</Label>
            <img src={RequireIcon} alt="" />
          </div>
          <Input
            placeholder="오픈채팅, 구글폼, 이메일 등 하나를 입력하세요."
            id="contact"
          />
        </div>
        <div style={{ marginTop: "26px" }}>
          <Label htmlFor="link">참고 링크</Label>
          <Input placeholder="프로젝트 소개 페이지를 입력하세요." id="link" />
        </div>
        <ButtonContainer>
          <button
            type="button"
            style={{
              width: "230px",
              height: "50px",
              backgroundColor: "#ffffff",
              color: "#0066ff",
              border: "1px solid #0066ff",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            임시저장
          </button>
          <button
            style={{
              width: "230px",
              height: "50px",
              backgroundColor: "#0066ff",
              color: "#ffffff",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            등록
          </button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  margin: 130px 0 141px;
  width: 734px;
  height: 1673px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid #bababb;
  border-radius: 8px;
  margin-top: 8px;
  // padding 값 개별적으로 넣어보기
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 600px;
  border: 1px solid #a2a2a4;
  border-radius: 8px;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 30px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const ButtonContainer = styled.div`
  margin: 100px auto 0;
  display: flex;
  justify-content: space-between;
  width: 468px;
  height: 50px;
`;

export default NewApply;
