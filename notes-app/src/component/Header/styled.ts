import styled from 'styled-components';

export const TopBar = styled.div`
  height: 96px;
  padding: 8px;
  display: flex;
  flex-wrap: nowrap;
  gap: 32px;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

export const MainContent = styled.div`
  height: auto;
  min-height: 90vh;
  padding: 8px;
`;

export const HamMenuIcon = styled.div`
  cursor: pointer;
  height: 27px;
  width: 27px;
  overflow: visible;
  position: relative;
  z-index: 2;

  span,
  span:before,
  span:after {
    background: #333;
    display: block;
    height: 2px;
    opacity: 1;
    position: absolute;
    transition: 0.3s ease-in-out;
  }

  span:before,
  span:after {
    content: '';
  }

  span:before {
    left: 0px;
    top: -6px;
    width: 18px;
  }

  span {
    right: 0px;
    top: 13px;
    width: 18px;
  }

  span:after {
    left: 0px;
    top: 6px;
    width: 18px;
  }

  &.close {
    span:before {
      top: 0px;
      transform: rotate(90deg);
      width: 18px;
    }

    span {
      transform: rotate(-45deg);
      top: 13px;
      width: 18px;
    }

    span:after {
      top: 0px;
      left: 0;
      transform: rotate(90deg);
      opacity: 0;
      width: 0;
    }
  }
`;

export const LogoWrapper = styled.div`
  width: 48px;

  img {
    width: 42px;
  }
`;

export const SearchElement = styled.div`
  width: 99%;
  display: flex;
  gap: 1rem;
`;

export const SearchBar = styled.input`
  width: 85%;
  height: 48px;
  padding: 8px;
  min-width: 120px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  border-radius: 12px;
  transition: 500ms;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.gray};
    outline: none;
  }
`;

export const SettingIconWrapper = styled.div`
  width: 12%;
  display: flex;
  justify-content: end;
  gap: 32px;

  img {
    width: 32px;
    cursor: pointer;
    &:hover {
      filter: brightness(0) saturate(100%) invert(10%) sepia(46%)
        saturate(6142%) hue-rotate(240deg) brightness(74%) contrast(121%);
    }
  }
`;
