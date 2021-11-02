import { request, requestInit } from "../modules/common/request";
import { apiMeta } from "../lib/api/common";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function useLockers() {
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

  return { listIsLoading, listResult, listError };
}
