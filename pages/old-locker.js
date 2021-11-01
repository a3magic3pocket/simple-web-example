import styled from "styled-components";
import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import { DefaultInput } from "../components/common/input";
import { DefaultButton } from "../components/common/button";
import { useState } from "react";
import ReactModal from "react-modal";

export default function Locker() {
  const [selected, setSelected] = useState([]);
  const [clickedUpdate, setClickedUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [lockers, setLockers] = useState({
    A: [1, 2, 3, 4, 5],
    B: [1, 2, 3, 4],
  });

  const handleSelect = (e) => {
    console.log("id", e.target.id);
  };

  const handleAdd = (e) => {
    setIsOpen(!isOpen);
  };

  const handleCreate = (e) => {};

  return (
    <RootWrapperLayout>
      <Header />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>로커(Locker) 관리</Title>
            <LockerWrapper>
              <LockerLocation>A 구역</LockerLocation>
              <LockerBowWrapper>
                <LockerBoxAdder onClick={(e) => handleAdd(e)}>+</LockerBoxAdder>
                <LockerBox
                  id="1"
                  onClick={(e) => handleSelect(e)}
                  isSelected={true}
                >
                  1
                </LockerBox>
                <LockerBox>
                  <SpeechBubbleWrapper top="-8.4rem;">
                    <UpdateWrapper>
                      <div>다음 구역으로 변경</div>
                      <UpdateLocationWrapper>
                        <UpdateLocationButton>A</UpdateLocationButton>
                        <UpdateLocationButton>B</UpdateLocationButton>
                        <UpdateLocationButton>C</UpdateLocationButton>
                        <UpdateLocationButton>D</UpdateLocationButton>
                        <UpdateLocationButton>C</UpdateLocationButton>
                      </UpdateLocationWrapper>
                    </UpdateWrapper>
                  </SpeechBubbleWrapper>
                  1
                </LockerBox>
                <LockerBox>
                  <SpeechBubbleWrapper>
                    <UpdateButton>구역 변경</UpdateButton>
                    <DeleteButton>삭제</DeleteButton>
                  </SpeechBubbleWrapper>
                  1
                </LockerBox>
              </LockerBowWrapper>
            </LockerWrapper>
            <LockerWrapper>
              <LockerLocation>B 구역</LockerLocation>
              <LockerBowWrapper>
                <LockerBoxAdder>+</LockerBoxAdder>
              </LockerBowWrapper>
            </LockerWrapper>
            <StyledReactModal isOpen={isOpen}>
              <CreateClose onClick={handleAdd}>닫기</CreateClose>
              <CreateTitle>새 로커 추가</CreateTitle>
              <CreateWrapper>
                <CreateInputWrapper>
                  <div>구역</div>
                  <CreateInput />
                </CreateInputWrapper>
                <CreateSubmit>추가하기</CreateSubmit>
              </CreateWrapper>
            </StyledReactModal>
          </ContentWrapper>
        </ContentLayout>
      </DefaultLayout>
    </RootWrapperLayout>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 80%;
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  background: pink;
  margin: 1rem;
  font-weight: bold;
  font-size: 3rem;
  word-break: keep-all;
  @media screen and (max-width: 720px) {
    font-size: 2rem;
  }
`;

const LockerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  margin-top: 1rem;
`;

const LockerLocation = styled.div`
  display: flex;
  padding: 0.4rem;
  background: green;
`;

const LockerBowWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  flex-flow: wrap;
  background: purple;
`;

const LockerBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  font-size: 1.6rem;
  font-weight: bold;
  border: ${(props) =>
    props.isSelected ? "3px solid red" : "1px solid black"};
  margin: 1rem 1rem;
  background: yellow;
`;

const LockerBoxAdder = styled(LockerBox)`
  background: red;
`;

// Reference by : https://projects.verou.me/bubbly/
const SpeechBubbleWrapper = styled.div`
  display: flex;
  position: absolute;
  // background: #00aabb;
  border-radius: 0.4rem;
  background: white;
  top: ${(props) => props.top || "-2rem"};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.625rem solid transparent;
    // border-top-color: #00aabb;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -0.625rem;
    margin-bottom: -0.625rem;
  }
`;

const Selection = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
`;

const UpdateButton = styled(Selection)`
  width: 5rem;
  background: skyblue;
`;

const DeleteButton = styled(Selection)`
  width: 4rem;
  background: magenta;
`;

const UpdateWrapper = styled(Selection)`
  width: 10rem;
  flex-direction: column;
`;

const UpdateLocationWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100px;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: scroll;
`;

const UpdateLocationButton = styled(DefaultButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StyledReactModal = styled(ReactModal)`
  diplay: flex;
  justify-content: center;
  align-items: center;
  background: green;
  border: 1px solid black;
  position: absolute;
  top: 40%;
  left: calc(50% - 160px);
  width: 320px;
  @media screen and (max-width: 320px) {
    left: 0;
    width: 90%;
  }
`;
const CreateClose = styled(DefaultButton)`
  display: flex;
  position: relative;
  top: -0.4rem;
  left: 96%;
`;

const CreateTitle = styled(Title)`
  width: 90%;
`;

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const createComponentWidthP = 90;

const CreateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0;
  width: ${createComponentWidthP}%;
`;

const CreateInput = styled(DefaultInput)``;

const CreateSubmit = styled(DefaultButton)`
  diplay: flex;
  color: white;
  font-size: 1rem;
  background: rgb(68, 114, 196);
  height: 2rem;
  width: ${createComponentWidthP}%;
  margin-bottom: 1rem;
`;
