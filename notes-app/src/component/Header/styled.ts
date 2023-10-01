import styled from 'styled-components';

export const TopBar = styled.div`
  height: ${(props) => props.theme.emSize.xl4};
  padding: ${(props) => props.theme.emSize.s};
  display: flex;
  flex-wrap: nowrap;
  gap: ${(props) => props.theme.emSize.xl};
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;

export const MainContent = styled.div`
  height: auto;
  min-height: 90vh;
  padding: ${(props) => props.theme.emSize.s};
`;

export const LogoWrapper = styled.div`
  width: ${(props) => props.theme.emSize.xxl};

  img {
    width: ${(props) => props.theme.pxSize.xl4};
  }
`;

export const SearchElement = styled.div`
  width: 99%;
  display: flex;
  gap: 1rem;
`;

export const SearchBarWrapper = styled.div`
  width: 85%;
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 100%;
  height: ${(props) => props.theme.emSize.xxl};
  padding: ${(props) => props.theme.emSize.m};
  min-width: 120px;
  font-size: ${(props) => props.theme.emSize.m};
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  border-radius: ${(props) => props.theme.pxSize.m};
  transition: 500ms;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.gray};
    outline: none;
  }
`;

export const ClearButton = styled.button`
  width: ${(props) => props.theme.pxSize.xxl};
  position: absolute;
  right: ${(props) => props.theme.emSize.m};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  img {
    width: ${(props) => props.theme.emSize.m};
  }
`;

export const SettingIconWrapper = styled.div`
  width: 12%;
  display: flex;
  justify-content: end;
  gap: ${(props) => props.theme.emSize.xl};

  img {
    width: ${(props) => props.theme.emSize.xl};
    cursor: pointer;
    &:hover {
      filter: brightness(0) saturate(100%) invert(10%) sepia(46%)
        saturate(6142%) hue-rotate(240deg) brightness(74%) contrast(121%);
    }
  }
`;
