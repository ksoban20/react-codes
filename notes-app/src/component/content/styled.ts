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
  padding: ${(props) => props.theme.emSize.xl};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 1.6fr;
  gap: ${(props) => props.theme.emSize.m} 0px;
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
  height: ${(props) => props.theme.pxSize.xl4};
  padding: 0px ${(props) => props.theme.emSize.m};
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  border-radius: ${(props) => props.theme.emSize.s};
  box-shadow: 0px 0px 7px -1px rgba(0, 0, 0, 1);
  background-color: ${(props) => props.$createBg || '#fff'};

  transition: background-color 500ms ease-in-out;
  ${(props) =>
    props.open &&
    css`
      height: auto;
      align-items: start;
      padding: ${(props) => props.theme.emSize.s}
        ${(props) => props.theme.emSize.m};
      flex-direction: column;
      gap: ${(props) => props.theme.emSize.s};
    `}
  &:hover {
    background-color: ${(props) => props.$hoverCreateBg || 'none'};
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const NoteTitle = styled.input`
  height: ${(props) => props.theme.emSize.xl};
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
  font-size: 1 ${(props) => props.theme.emSize.s};
  font-weight: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.darkPurple};
  background-color: inherit;
`;

export const NoteContent = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${(props) => props.theme.emSize.m};
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
  gap: ${(props) => props.theme.emSize.s};
`;

export const SubmitBox = styled.div`
  width: 184px;
  height: 100%;
  padding: 5px;
  display: flex;
  gap: ${(props) => props.theme.emSize.s};
  align-self: end;
  @media (max-width: 500px) {
    width: 72px;
    flex-wrap: wrap-reverse;
  }
`;

export const SubmitButton = styled.button<NoteProps>`
  height: ${(props) => props.theme.emSize.xl};
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.color.lightGray};
  color: ${(props) => props.theme.color.darkPurple};
  border-radius: ${(props) => props.theme.emSize.m};
  cursor: pointer;
  font-size: ${(props) => props.theme.pxSize.l};
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.theme.color.darkPurple};
    color: ${(props) => props.theme.color.fair};
  }
  ${(props) =>
    props.$clearButton === true &&
    css`
      background-color: transparent;

      &:hover {
        border: 1px solid ${(props) => props.theme.color.darkPurple};
        background-color: transparent;
        color: ${(props) => props.theme.color.darkPurple};
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
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: ${(props) => props.theme.emSize.s};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.light};
    border-radius: ${(props) => props.theme.pxSize.s};
    visibility: hidden;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
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
  background-color: ${(props) =>
    props.$noteBackground || `${props.theme.color.fair}`};
  margin-bottom: 30px;
  padding: ${(props) => props.theme.pxSize.xxl};
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease, left 0.3s ease, transform 0.3s ease-in-out;
  cursor: pointer;
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
    cursor: default;
    @media (max-width: 500px) {
      width: 300px;
    }
    
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
  gap: ${(props) => props.theme.emSize.s};
  justify-content: space-between;
  align-items: center;
  button {
    width: ${(props) => props.theme.pxSize.xxl};
    height: ${(props) => props.theme.pxSize.xxl};
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
  gap: ${(props) => props.theme.emSize.s};
`;
export const NoteCloseButton = styled.div`
  width: 60px;
  height: ${(props) => props.theme.emSize.xl};
  button {
    height: 85%;
    width: 100%;
    border: none;
    background: none;
    border-radius: ${(props) => props.theme.pxSize.s};
    &:hover {
      border: 1px solid ${(props) => props.theme.color.gray};
    }
  }
`;

export const ColorIcon = styled.div<NoteProps>`
  width: ${(props) => props.theme.emSize.l};
  cursor: pointer;
  img {
    width: ${(props) => props.theme.pxSize.xxl};
    height: ${(props) => props.theme.pxSize.xxl};
    cursor: pointer;
    &:hover {
      transform: rotate(180deg);
    }
  }
  ${(props) =>
    props.$removeIcon &&
    css`
      img {
        width: 1 ${(props) => props.theme.emSize.s};
        height: 1 ${(props) => props.theme.emSize.s};

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
  height: auto;
  border-radius: ${(props) => props.theme.emSize.m};
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.emSize.s};
  align-content: center;
  gap: 4px;
  button {
    width: ${(props) => props.theme.pxSize.xxl};
    height: ${(props) => props.theme.pxSize.xxl};
    border-radius: 50%;
    border: 1px solid gray;
    cursor: pointer;
  }
`;

export const NoDataWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  right: ${(props) => props.theme.pxSize.s};
  position: fixed;
  @media (max-width: 500px) {
    position: unset;
    right: unset;
  }
`;
