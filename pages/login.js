import styled from "styled-components";
import { LoginButton } from "../components/common/login";
import {
  ContentLayout,
  DefaultLayout,
  RootWrapperLayout,
} from "../components/common/layout";
import Header from "../components/header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const isLogged = useSelector((state) => state["login"].isLogged);

  useEffect(() => {
    const beforePath = router.query["before-path"];
    if (isLogged && typeof beforePath !== "undefined") {
      router.push(beforePath)
    }
  }, [isLogged]);

  return (
    <RootWrapperLayout>
      <Header />
      <DefaultLayout>
        <ContentLayout>
          <ContentWrapper>
            <Title>로그인이 필요합니다.</Title>
            <BigLoginButton>로그인</BigLoginButton>
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
  margin: 1rem 1rem 0 1rem;
  font-weight: bold;
  font-size: 1.6rem;
`;

const BigLoginButton = styled(LoginButton)`
  margin: 3rem 1rem 1rem 1rem;
  background-color: rgba(180, 199, 231, 1);
  width: 30rem;
  height: 3rem;
  @media screen and (max-width: 720px) {
    width: 94%;
    height: 3rem;
  }
  font-size: 1rem;
`;
