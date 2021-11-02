import styled from "styled-components";
import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import { DefaultInput } from "../components/common/input";
import { SubmitButton } from "../components/common/button";
import { SignupForm, SignupError } from "../components/signup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hookes/form";
import { request, requestInit } from "../modules/common/request";
import { apiMeta } from "../lib/api/common";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const signupAPIActionType = "api/SIGNUP";
  const signupReducerKey = apiMeta[signupAPIActionType]["reducerKey"];
  const { isLoading, result, error } = useSelector((state) => ({
    isLoading: state.loading[signupAPIActionType],
    result: state[signupReducerKey].result,
    error: state[signupReducerKey].error,
  }));

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { UserName: "", Password: "" },
    onSubmit: (values) => {
      const data = JSON.stringify(values);
      requestInit(dispatch, signupAPIActionType);
      request(dispatch, signupAPIActionType, { data });
    },
    validate: (values) => {
      const errors = {};

      if (values.UserName.length < 8) {
        errors.UserName = "8자 이상의 ID를 사용해야합니다.";
      } else if (!/[A-z0-9-_]+/.test(values.UserName)) {
        errors.UserName = "ID는 (알파벳, 숫자, -, _)만 사용할 수 있습니다.";
      }

      if (values.Password.length < 8) {
        errors.Password = "8자 이상의 Password를 사용해야합니다.";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (error) {
      if (
        typeof error !== "undefined" &&
        error.response.status === 422 &&
        error.response.data !== "undefined" &&
        error.response.data.error !== "undefined" &&
        error.response.data.error.includes("duplicated")
      ) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      requestInit(dispatch, signupAPIActionType);
      const beforePath = router.query["before-path"];
      if (typeof beforePath !== "undefined") {
        router.push(beforePath);
      } else {
        router.push("/");
      }
    }
  }, [result]);

  return (
    <RootWrapperLayout>
      <Header isLoading={isLoading} />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>회원가입</Title>
            <SignupForm onSubmit={handleSubmit}>
              <InputWrapper>
                <label htmlFor="signup-id">ID</label>
                <Input
                  id="signup-id"
                  type="text"
                  name="UserName"
                  value={values.UserName}
                  onChange={handleChange}
                />
                {errors.UserName && (
                  <SignupError>{errors.UserName}</SignupError>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="signup-password">Password</label>
                <Input
                  id="signup-password"
                  type="password"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                />
                {errors.Password && (
                  <SignupError>{errors.Password}</SignupError>
                )}
              </InputWrapper>
              <SignupButton type="submit" disabled={submitting}>
                가입
              </SignupButton>
            </SignupForm>
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
`;

const Title = styled.div`
  display: flex;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.6rem;
`;

const loginComponentWitdhP = 84;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0;
  width: ${loginComponentWitdhP}%;
`;

const Input = styled(DefaultInput)``;

const SignupButton = styled(SubmitButton)`
  width: ${loginComponentWitdhP}%;
  margin-bottom: 2rem;
`;
