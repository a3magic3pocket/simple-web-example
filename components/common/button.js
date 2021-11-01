import styled from "styled-components";

export const DefaultButton = styled.button`
  display: block;
  border: 0;
  outline: none;
  border-radius: 0.2rem;
  cursor: pointer;
`;

export const SubmitButton = styled(DefaultButton)`
  diplay: flex;
  color: white;
  font-size: 1rem;
  background: rgb(68, 114, 196);
  height: 2rem;
`;