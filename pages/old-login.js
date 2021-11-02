import styled from "styled-components";
import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import { DefaultInput } from "../components/common/input";
import { SubmitButton } from "../components/common/button";
import { LoginForm, LoginError } from "../components/signup";
import { useRouter } from "next/router";
import useForm from "../hookes/form";
import { request, requestInit } from "../modules/common/request";
import { useDispatch, useSelector } from "react-redux";
import { apiMeta } from "../lib/api/common";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const loginAPIActionType = "api/LOGIN";
  const loginReducerKey = apiMeta[loginAPIActionType]["reducerKey"];
  const { isLoading, result, error } = useSelector((state) => ({
    isLoading: state.loading[loginAPIActionType],
    result: state[loginReducerKey].result,
    error: state[loginReducerKey].error,
  }));

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { UserName: "", Password: "" },
    onSubmit: (values) => {
      const data = JSON.stringify(values);
      requestInit(dispatch, loginAPIActionType);
      request(dispatch, loginAPIActionType, { data });
    },
    validate: (values) => {
      const errors = {};

      if (values.UserName < 8) {
        errors.UserName = "8자 이상의 ID를 사용해야합니다.";
      } else if (!/[A-z0-9-_]+/.test(values.UserName)) {
        errors.UserName = "ID는 (알파벳, 숫자, -, _)만 사용할 수 있습니다.";
      }

      if (values.Password < 8) {
        errors.Password = "8자 이상의 Password를 사용해야합니다.";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (error) {
      alert("ID 또는 Password가 틀렸습니다.");
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      alert("result", result);
      requestInit(dispatch, loginAPIActionType);
    }
  }, [result]);

  return (
    <RootWrapperLayout>
      <Header isLoading={isLoading} />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>로그인</Title>
            <LoginForm onSubmit={handleSubmit}>
              <InputWrapper>
                <label htmlFor="login-id">ID</label>
                <Input
                  id="login-id"
                  type="text"
                  name="UserName"
                  value={values.UserName}
                  onChange={handleChange}
                />
                {errors.UserName && <LoginError>{errors.UserName}</LoginError>}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="login-password">Password</label>
                <Input
                  id="login-password"
                  type="password"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                />
                {errors.Password && <LoginError>{errors.Password}</LoginError>}
              </InputWrapper>
              <LoginButton type="submit" disabled={submitting}>
                로그인
              </LoginButton>
              <Signup>
                <div onClick={() => router.push("/signup")}>회원가입</div>
              </Signup>
            </LoginForm>
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

const loginComponentWidthP = 84;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0;
  width: ${loginComponentWidthP}%;
`;

const Input = styled(DefaultInput)``;

const LoginButton = styled(SubmitButton)`
  width: ${loginComponentWidthP}%;
`;

const Signup = styled.div`
  diplay: flex;
  justify-content: start;
  font-size: 0.8rem;
  width: ${loginComponentWidthP}%;
  margin-bottom: 2rem;
`;
