import Header from "../components/header";
import {
  RootWrapperLayout,
  DefaultLayout,
  ContentLayout,
} from "../components/common/layout";
import styled from "styled-components";
import { DefaultButton } from "../components/common/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <RootWrapperLayout>
      <Header />
      <DefaultLayout>
        <HomeContentLayout>
          <ContentWrapper>
            <Description>
              당신의 로커(Locker)를 <br />
              관리하세요.
            </Description>
            <StartButtonWrapper>
              <StartButton onClick={() => router.push("/locker")}>
                시작하기
              </StartButton>
            </StartButtonWrapper>
          </ContentWrapper>
        </HomeContentLayout>
      </DefaultLayout>
    </RootWrapperLayout>
  );
}

const HomeContentLayout = styled(ContentLayout)`
  align-items: normal;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20vh;
  width: 50rem;
  height: 20rem;
  justify-content: space-between;
`;

const Description = styled.div`
  font-size: 4rem;
  @media screen and (max-width: 720px) {
    font-size: 3.4rem;
  }
  @media screen and (max-width: 320px) {
    font-size: 3.4rem;
  }
`;

const StartButtonWrapper = styled.div`
  display: flex;
  witdh: 100px;
`;

const StartButton = styled(DefaultButton)`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  background-color: rgba(68, 114, 196, 1);
  color: white;
`;
