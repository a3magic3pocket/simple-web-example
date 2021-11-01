import styled from "styled-components";
import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import { DefaultInput } from "../components/common/input";
import { SubmitButton } from "../components/common/button";
import { LoginWrapper } from "../components/login";

export default function Signup() {
  return (
    <RootWrapperLayout>
      <Header />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>회원가입</Title>
            <LoginWrapper>
              <InputWrapper>
                <div>ID</div>
                <Input type="text" />
              </InputWrapper>
              <InputWrapper>
                <div>Password</div>
                <Input type="password" />
              </InputWrapper>
              <SignupButton>가입</SignupButton>
            </LoginWrapper>
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

const Input = styled(DefaultInput)`

`;

const SignupButton = styled(SubmitButton)`
  width: ${loginComponentWitdhP}%;
  margin-bottom: 2rem;
`;
