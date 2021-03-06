import styled from "styled-components";
import { updateLogin } from "../../hookes/auth";

export function RootWrapperLayout({className, children}) {
  updateLogin();
  return <RootWrapperLayoutStyle className={className}>{children}</RootWrapperLayoutStyle>;
}

const RootWrapperLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DefaultLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  @media screen and (max-width: 1200px) {
    width: 720px;
  }
  @media screen and (max-width: 720px) {
    width: 320px;
  }
  @media screen and (max-width: 320px) {
    width: 100%;
  }
`;

export const ContentLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 92vh;
`;
