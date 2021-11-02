import styled from "styled-components";
import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import { DefaultInput } from "../components/common/input";
import { DefaultButton } from "../components/common/button";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { request, requestInit } from "../modules/common/request";
import { useSelector, useDispatch } from "react-redux";
import { apiMeta } from "../lib/api/common";
import { useRouter } from "next/router";
import { init401 } from "../modules/common/unauthorized";

export default function Locker() {
  const router = useRouter();
  const dispatch = useDispatch();

  const listAPIActionType = "api/LOCKER_LIST";
  const listReducerKey = apiMeta[listAPIActionType]["reducerKey"];
  const { listIsLoading, listResult, listError } = useSelector((state) => ({
    listIsLoading: state.loading[listAPIActionType],
    listResult: state[listReducerKey].result,
    listError: state[listReducerKey].error,
  }));

  useEffect(() => {
    requestInit(dispatch, listAPIActionType);
    request(dispatch, listAPIActionType, {});
  }, []);

  const unauthorized = useSelector((state) => state.unauthorized.unauthorized);
  useEffect(() => {
    if (unauthorized) {
      router.push({ pathname: "/login", query: { "before-path": router.pathname } });
      dispatch(init401());
    }
  }, [unauthorized]);

  const [selected, setSelected] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [wantUpdate, setWantUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 각 location의 locker 번호는 고유함
  const [lockers, setLockers] = useState({
    A: [1, 5, 4],
    B: [11, 12, 13, 14],
    C: [222, 333, 777, 555],
    D: [22, 33, 77, 55],
    E: [2222, 3333, 7777, 5555],
    F: [22222, 33333, 77777, 555555555],
  });

  // handleSelect : 로커 선택 갱신
  const handleSelect = (stringifiedRow) => {
    if (selected.includes(stringifiedRow)) {
      const newSelected = selected.filter((row) => row !== stringifiedRow);
      setSelected(newSelected);
      setLastSelected(newSelected[newSelected.length - 1]);
    } else {
      setSelected([...selected, stringifiedRow]);
      setLastSelected(stringifiedRow);
    }
    setWantUpdate(false);
  };

  // handleWantUpdate: 구역변경 선택 여부 갱신
  const handleWantUpdate = () => {
    setWantUpdate(!wantUpdate);
  };

  // handleAdd : 입력 받은 구역(location)에 새 로커 추가
  const handleAdd = (e, location) => {
    // Temporary
    const newBoxNum = lockers[location].length;
    setLockers({
      ...lockers,
      [location]: [...lockers[location], newBoxNum],
    });
    console.log("location", location);
  };

  // handleDelete : 선택한 로커들(selected) 삭제
  const handleDelete = () => {
    console.log("in handleDelete");
    let newLockers = { ...lockers };
    for (const i in selected) {
      const [location, id] = JSON.parse(selected[i]);
      const removed = newLockers[location].filter((row) => row != id);
      if (removed.length === 0) {
        const { [location]: deletedKey, ...deleted } = newLockers;
        newLockers = { ...deleted };
      } else {
        newLockers = {
          ...newLockers,
          [location]: removed,
        };
      }
    }

    setLockers(newLockers);
    setSelected([]);
    setLastSelected(null);
  };

  // handleUpdateLocation : 선택한 로커들(selected)의 구역(location) 갱신
  const handleUpdateLocation = (wantedLocation) => {
    console.log("in handleUpdateLocation");
    let newLockers = { ...lockers };
    for (const i in selected) {
      const [location, id] = JSON.parse(selected[i]);
      if (wantedLocation !== location) {
        const removed = newLockers[location].filter((row) => row != id);
        newLockers = {
          ...newLockers,
          [location]: removed,
          [wantedLocation]: [...newLockers[wantedLocation], id],
        };

        if (removed.length === 0) {
          const { [location]: deletedKey, ...deleted } = newLockers;
          newLockers = { ...deleted };
        }
      }
    }

    setLockers(newLockers);
    setSelected([]);
    setLastSelected(null);
  };

  // handleCreate : 새 로커 생성
  const handleCreate = (e) => {
    setIsOpen(!isOpen);
  };

  // getUpdateOrDeleteButtons :
  //  선택한 로커(selected)를 구역이동(update) 시킬지 삭제(delete) 할지 선택하는 버튼 노출
  const getUpdateOrDeleteButtons = () => (
    <SpeechBubbleWrapper>
      <UpdateButton onClick={handleWantUpdate}>구역 변경</UpdateButton>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
    </SpeechBubbleWrapper>
  );

  // getUpdateSelections : 선택한 로커(selected)를 이동시킬 구역(location)들 노출
  const getUpdateSelections = () => (
    <SpeechBubbleWrapper top="-8.4rem;">
      <UpdateWrapper>
        <div>다음 구역으로 변경</div>
        <UpdateLocationWrapper>
          {Object.keys(lockers).map((location, i) => (
            <UpdateLocationButton
              key={i}
              onClick={() => handleUpdateLocation(location)}
            >
              {location}
            </UpdateLocationButton>
          ))}
        </UpdateLocationWrapper>
      </UpdateWrapper>
    </SpeechBubbleWrapper>
  );

  // getLockerBoxes : 로커 박스 획득
  const getLockerBoxes = (location, boxNums) =>
    boxNums.map((box, i) => {
      const stringified = JSON.stringify([location, box]);
      return (
        <LockerBox key={i} isSelected={selected.includes(stringified)}>
          {!wantUpdate &&
            lastSelected === stringified &&
            getUpdateOrDeleteButtons()}

          {wantUpdate && lastSelected === stringified && getUpdateSelections()}
          <LockerBoxNum onClick={() => handleSelect(stringified)}>
            {box}
          </LockerBoxNum>
        </LockerBox>
      );
    });

  return (
    <RootWrapperLayout>
      <Header />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>로커(Locker) 관리</Title>
            {Object.entries(lockers).map((locker, i) => {
              const [location, boxNums] = locker;
              const lockerBoxes = getLockerBoxes(location, boxNums);
              return (
                <LockerWrapper key={i}>
                  <LockerLocation>{location} 구역</LockerLocation>
                  <LockerBoxWrapper>
                    <LockerBoxAdder onClick={(e) => handleAdd(e, location)}>
                      +
                    </LockerBoxAdder>
                    {lockerBoxes}
                  </LockerBoxWrapper>
                </LockerWrapper>
              );
            })}
            <LockerWrapper>
              <LockerBoxWrapper>
                <CreateTitle>새 구역에 로커 추가</CreateTitle>
                <LockerBoxAdder onClick={() => setIsOpen(true)}>
                  +
                </LockerBoxAdder>
              </LockerBoxWrapper>
            </LockerWrapper>
          </ContentWrapper>
        </ContentLayout>
      </DefaultLayout>

      {/* 새 로커 추가 모달 */}
      <StyledReactModal isOpen={isOpen} ariaHideApp={false}>
        <CreateClose onClick={() => setIsOpen(false)}>닫기</CreateClose>
        <CreateTitle>새 구역에 로커 추가</CreateTitle>
        <CreateWrapper>
          <CreateInputWrapper>
            <div>구역</div>
            <CreateInput />
          </CreateInputWrapper>
          <CreateSubmit onClick={handleCreate}>추가하기</CreateSubmit>
        </CreateWrapper>
      </StyledReactModal>
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
  background: olive;
`;

const LockerBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  flex-flow: wrap;
  border: 1px solid black;
`;

const LockerBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: ${(props) =>
    props.isSelected ? "3px solid red" : "1px solid black"};
  margin: 1rem 1rem;
  background: yellow;
`;

const LockerBoxNum = styled.div`
  display: flex;
  // font-size: 1.6rem;
  font-weight: bold;
  word-break: break-all;
  white-space: pre-wrap;
  width: 100%;
  height: 100%;
`;

const LockerBoxAdder = styled(LockerBox)`
  background: red;
`;

// Reference by : https://projects.verou.me/bubbly/
const SpeechBubbleWrapper = styled.div`
  display: flex;
  position: absolute;
  border-radius: 0.4rem;
  background: white;
  border: 1px solid black;
  top: ${(props) => props.top || "-2rem"};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.625rem solid transparent;
    border-top-color: black;
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
  background: white;
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
  border: 1px solid black;
`;

const CreateTitle = styled(Title)`
  font-size: 2rem;
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
