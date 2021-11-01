import styled from "styled-components";
import { useEffect, useState } from "react";
import { DefaultButton } from "./common/button";
import { DefaultLayout } from "./common/layout";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header({ isLoading }) {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("storage", function() {
      const a = localStorage.getItem("login")
      console.log("a", a)
    }, false)
  })

  const handleLogin = () => {
    const new_window = window.open(
      "//localhost:8080/login?redirect-url=localhost:3000/check",
      "SIMPLE-LOCKER login",
      "scrollbars=no,width=320,height=400,menubar=false,resizable=yes"
    );
  };

  return (
    <HeaderWrapper>
      <DefaultLayout>
        <HeaderContentWrapper>
          <LogoWrapper>
            <Logo onClick={() => router.push("/")}>
              SIMPLE
              <br />
              LOCKER
            </Logo>
            {isLoading && (
              <StyledLoading
                src="/loading.gif"
                width="43px"
                height="43px"
                alt="loading"
              ></StyledLoading>
            )}
          </LogoWrapper>
          <HeaderAuthWrapper>
            <UserName>zxcjvklasjdfklaj</UserName>
            {isLogged ? (
              <LogoutButton>로그아웃</LogoutButton>
            ) : (
              <LoginButton onClick={() => handleLogin()}>로그인</LoginButton>
            )}
          </HeaderAuthWrapper>
        </HeaderContentWrapper>
      </DefaultLayout>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - (100vw - 100%));
  border-bottom: 1px solid black;
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  color: rgb(68, 84, 106);
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 1rem;
`;

const HeaderAuthWrapper = styled.div`
  display: flex;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  font-size: 1.2rem;
  white-space: nowrap;
  @media screen and (max-width: 720px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 320px) {
    font-size: 3vw;
  }
`;

const LoginButton = styled(DefaultButton)`
  margin: 0.5rem 1rem 0.5rem 0;
  padding: 0 0.5rem;
  background-color: rgba(180, 199, 231, 1);
  font-size: 1rem;
`;

const LogoutButton = styled(DefaultButton)`
  margin: 0.2rem 1rem 0.2rem 0;
  padding: 0 0.5rem;
  background-color: rgba(0, 0, 0, 0);
`;

const StyledLoading = styled(Image)`
  diplay: block;
  width: 43px;
  height: 43px;
`;
