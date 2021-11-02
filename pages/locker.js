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
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { init401 } from "../modules/common/unauthorized";
import { request, requestInit } from "../modules/common/request";
import { apiMeta } from "../lib/api/common";
import useForm from "../hookes/form";

export default function Locker() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [wantUpdate, setWantUpdate] = useState(false);
  const [wantedLocation, setWantedLocation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // 각 location의 locker 번호는 고유함
  const [lockers, setLockers] = useState({});

  // +-- 로커 조회
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

  useEffect(() => {
    if (
      listResult !== null &&
      typeof listResult !== "undefined" &&
      typeof listResult.data !== "undefined"
    ) {
      let newLockers = {};
      for (const elem of listResult.data) {
        const { ID: id, Location: location } = elem;
        if (!Object.keys(newLockers).includes(location)) {
          newLockers[location] = [id];
        } else {
          newLockers[location].push(id);
        }
      }
      setLockers(newLockers);
    }
  }, [listResult]);

  useEffect(() => {
    if (listError) {
      alert("로커 조회 실패");
    }
  }, [listError]);

  // +-- 401 unauthorized 에러 처리
  const unauthorized = useSelector((state) => state.unauthorized.unauthorized);
  useEffect(() => {
    if (unauthorized) {
      router.push({
        pathname: "/login",
        query: { "before-path": router.pathname },
      });
      dispatch(init401());
    }
  }, [unauthorized]);

  // 새 로커 추가
  const createAPIActionType = "api/CREATE_LOCKERS";
  const createReducerKey = apiMeta[createAPIActionType]["reducerKey"];
  const { createIsLoading, createResult, createError } = useSelector(
    (state) => ({
      createIsLoading: state.loading[createAPIActionType],
      createResult: state[createReducerKey].result,
      createError: state[createReducerKey].error,
    })
  );

  // +-- 새 구역에 로커 추가
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { Location: "" },
    onSubmit: (values) => {
      const data = JSON.stringify([values]);
      requestInit(dispatch, createAPIActionType);
      request(dispatch, createAPIActionType, { data });
      setIsOpen(!isOpen);
    },
    validate: (values) => {
      const errors = {};
      if (values.Location === "") {
        errors.Location = "구역을 입력하지 않았습니다.";
      }

      return errors;
    },
    clearInputs: true,
  });

  // handleAdd : 기존 구역에 로커 추가
  const handleAdd = (e, location) => {
    const data = JSON.stringify([{ Location: location }]);
    requestInit(dispatch, createAPIActionType);
    request(dispatch, createAPIActionType, { data });
  };

  useEffect(() => {
    requestInit(dispatch, listAPIActionType);
    request(dispatch, listAPIActionType, {});
  }, [createResult]);

  useEffect(() => {
    if (createError) {
      alert("로커 추가 실패");
    }
  }, [createError]);

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

  // +-- 로커 삭제
  const deleteAPIActionType = "api/DELETE_LOCKERS";
  const deleteReducerKey = apiMeta[deleteAPIActionType]["reducerKey"];
  const { deleteIsLoading, deleteResult, deleteError } = useSelector(
    (state) => ({
      deleteIsLoading: state.loading[deleteAPIActionType],
      deleteResult: state[deleteReducerKey].result,
      deleteError: state[deleteReducerKey].error,
    })
  );

  // handleDelete : 선택한 로커들(selected) 삭제
  const handleDelete = () => {
    console.log("in handleDelete");
    const data = JSON.stringify(
      selected.map((row) => {
        const [location, id] = JSON.parse(row);

        return { ID: id, Location: location };
      })
    );
    requestInit(dispatch, deleteAPIActionType);
    request(dispatch, deleteAPIActionType, { data });
  };

  // rerenderAfterDelete : 삭제에 성공하면 삭제된 로커를 화면에서 제거
  const rerenderAfterDelete = () => {
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

  useEffect(() => {
    if (deleteResult) {
      rerenderAfterDelete();
    }
  }, [deleteResult]);

  useEffect(() => {
    if (deleteError) {
      alert("로커 삭제 실패");
    }
  }, [deleteError]);

  // +-- 로커 변경
  const updateAPIActionType = "api/UPDATE_LOCKERS";
  const updateReducerKey = apiMeta[updateAPIActionType]["reducerKey"];
  const { updateIsLoading, updateResult, updateError } = useSelector(
    (state) => ({
      updateIsLoading: state.loading[updateAPIActionType],
      updateResult: state[updateReducerKey].result,
      updateError: state[updateReducerKey].error,
    })
  );

  // handleUpdateLocation : 선택한 로커들(selected)의 구역(location) 갱신
  const handleUpdateLocation = (location) => {
    console.log("in handleUpdateLocation");
    const updateIDs = selected.map((row) => {
      const [_, id] = JSON.parse(row);

      return id;
    });

    const data = JSON.stringify({
      Location: location,
      UpdateIDs: updateIDs,
    });

    requestInit(dispatch, updateAPIActionType);
    request(dispatch, updateAPIActionType, { data });
    setWantedLocation(location);
  };

  // rerenderAfterUpdate : 변경에 성공하면 변경된 로커를 화면에 반영
  const rerenderAfterUpdate = () => {
    if (wantedLocation === null) {
      return;
    }

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
    setWantedLocation(null);
  };

  useEffect(() => {
    if (updateResult) {
      rerenderAfterUpdate();
    }
  }, [updateResult]);

  useEffect(() => {
    if (updateError) {
      alert("로커 변경 실패");
    }
  }, [updateError]);

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
      <Header
        isLoading={
          listIsLoading || createIsLoading || deleteIsLoading || updateIsLoading
        }
      />
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
                    <LockerBoxAdder
                      onClick={(e) => handleAdd(e, location)}
                      disabled={createIsLoading}
                    >
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
                <NewLockerBoxAdder onClick={() => setIsOpen(true)}>
                  +
                </NewLockerBoxAdder>
              </LockerBoxWrapper>
            </LockerWrapper>
          </ContentWrapper>
        </ContentLayout>
      </DefaultLayout>

      {/* 새 구역에 로커 추가 모달 */}
      <StyledReactModal isOpen={isOpen} ariaHideApp={false}>
        <CreateClose onClick={() => setIsOpen(false)}>닫기</CreateClose>
        <CreateTitle>새 구역에 로커 추가</CreateTitle>
        <CreateForm onSubmit={handleSubmit}>
          <CreateInputWrapper>
            <label htmlFor="create-locker-modal">구역</label>
            <CreateInput
              id="create-locker-modal"
              type="text"
              name="Location"
              value={values.Location}
              onChange={handleChange}
            />
            {errors.Location && (
              <CreateLockerError>{errors.Location}</CreateLockerError>
            )}
          </CreateInputWrapper>
          <CreateSubmit type="submit" disabled={submitting}>
            추가하기
          </CreateSubmit>
        </CreateForm>
      </StyledReactModal>
    </RootWrapperLayout>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background: silver;
  border: 1px solid black;
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
    props.isSelected ? "4px solid black" : "1px solid black"};
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
  background: black;
  color: white;
`;

const NewLockerBoxAdder = styled(LockerBox)`
  background: black;
  color: white;
  width: 96px;
  height: 96px;
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

const CreateForm = styled.form`
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

const CreateLockerError = styled.div`
  font-size: 0.8rem;
  color: red;
`;
