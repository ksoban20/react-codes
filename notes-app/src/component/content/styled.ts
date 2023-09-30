import styled, { css } from 'styled-components';

type NoteProps = {
  open?: boolean;
  $expanded?: boolean;
  $noteBackground?: string;
  $hoverNoteBackground?: string;
  $removeIcon?: boolean;
  $createBg?: string;
  $hoverCreateBg?: string;
  $clearButton?: boolean;
};

export const MainContent = styled.div`
  height: auto;
  min-height: 90vh;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 1.6fr;
  gap: 16px 0px;
  grid-template-areas:
    'create'
    'notes';
`;

export const CreateBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreateNoteBox = styled.div<NoteProps>`
  width: auto;
  min-width: 35%;
  height: 42px;
  padding: 0px 16px;
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 7px -1px rgba(0, 0, 0, 1);
  background-color: ${(props) => props.$createBg || '#fff'};

  transition: background-color 500ms ease-in-out;
  ${(props) =>
    props.open &&
    css`
      height: auto;
      align-items: start;
      padding: 8px 16px;
      flex-direction: column;
      gap: 8px;
    `}
  &:hover {
    background-color: ${(props) => props.$hoverCreateBg || 'none'};
  }
`;

export const NoteTitle = styled.input`
  height: 32px;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
  font-size: 18px;
  font-weight: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.darkPurple};
  background-color: inherit;
`;

export const NoteContent = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${(props) => props.theme.color.darkPurple};
  background-color: inherit;
  resize: none;
  overflow: hidden;
`;

export const NoteBottom = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ElementBox = styled.div`
  width: auto;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
`;

export const SubmitBox = styled.div`
  width: 184px;
  height: 100%;
  padding: 5px;
  display: flex;
  gap: 8px;
  align-self: end;
`;

export const SubmitButton = styled.button<NoteProps>`
  height: 32px;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.color.lightYellow};
  color: ${(props) => props.theme.color.darkPurple};
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.theme.color.yellowish};
  }
  ${(props) =>
    props.$clearButton === true &&
    css`
      border: 1px solid ${(props) => props.theme.color.lightGray};
      background-color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.color.darkPurple};
        color: ${(props) => props.theme.color.fair};
      }
    `}
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const NotesWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem;
`;

export const MasonryContainer = styled.div`
  .my-masonry-grid {
    display: flex;
    margin-left: -30px; /* Determined by the gutter size */
    width: auto;
  }

  .my-masonry-grid_column {
    padding-left: 30px; /* Determined by the gutter size */
    background-clip: padding-box;
  }
`;

export const MasonryItem = styled.div<NoteProps>`
  background-color: ${(props) => props.$noteBackground || '#f1f1f1'};
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease, left 0.3s ease, transform 0.3s ease-in-out;

  /* Expanded State */
  ${(props) =>
    props.$expanded &&
    `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    z-index: 999;
  `}
  transition:background-color 500ms ease-in-out;
  &:hover {
    background-color: ${(props) => props.$hoverNoteBackground || 'none'};
  }
`;

export const NoteFooterBox = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: space-between;

  button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid gray;
    cursor: pointer;
  }
`;

export const NoteColorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
`;
export const NoteCloseButton = styled.div`
  width: 60px;
  height: 32px;
  button {
    height: 85%;
    width: 100%;
    border: none;
    background: none;
    border-radius: 10px;
    &:hover {
      border: 1px solid ${(props) => props.theme.color.gray};
    }
  }
`;

export const ColorIcon = styled.div<NoteProps>`
  width: 24px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:hover {
      transform: rotate(180deg);
    }
  }
  ${(props) =>
    props.$removeIcon &&
    css`
      img {
        width: 18px;
        height: 18px;

        &:hover {
          filter: brightness(0) saturate(100%) invert(17%) sepia(92%)
            saturate(5110%) hue-rotate(350deg) brightness(103%) contrast(104%);
          transform: rotate(0deg);
        }
      }
    `}
`;

export const ColorBox = styled.div`
  position: sticky;
  width: auto;
  z-index: 1;
  /* background-color: #fff; */
  height: auto;
  border-radius: 16px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 8px;
  align-content: center;
  gap: 4px;
  button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid gray;
    cursor: pointer;
  }
`;
