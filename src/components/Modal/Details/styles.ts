import styled from "styled-components"
import { getContrast } from "polished"

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  line-height: 1.5;

  > span {
    margin-top: 8px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  > button {
      padding: 10px 16px;
      cursor: pointer;
      border: none;
      border-radius: 2px;
      color: ${({ theme }) => getContrast(theme.primaryDark, theme.text) > 4.5 ? theme.text : theme.background};
      transition: background 0.2s ease-out;
      font-weight: 500;

      &:focus {
        outline: 2px solid ${({ theme }) => theme.secondaryDark};
        outline-offset: 2px;
      }

      &.cancel {
        background: ${({ theme }) => theme.primaryDark};

        &:hover {
          background: ${({ theme }) => theme.primary};
        }
      }
    }
`