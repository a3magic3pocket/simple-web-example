import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  @media screen and (max-width: 320px) {
    width: 100%;
  }
`;

export const SignupForm = styled(LoginForm)``;

export const LoginError = styled.div`
  font-size: 0.8rem;
  color: red;
`;