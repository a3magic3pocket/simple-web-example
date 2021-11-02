import { ContentLayout, DefaultLayout, RootWrapperLayout } from "../components/common/layout";

export default function Login() {
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
