import {
  TopBar,
  LogoWrapper,
  SearchElement,
  SearchBar,
  SettingIconWrapper,
} from './styled';

import { NoteIcon, SettingIcon, UserIcon } from '../../assets/images/image';

const HeaderBar = () => {
  return (
    <TopBar>
      <LogoWrapper>
        <img src={NoteIcon} alt="" />
      </LogoWrapper>
      <SearchElement>
        <SearchBar />
        <SettingIconWrapper>
          <img src={SettingIcon} alt="" />
          <img src={UserIcon} alt="" />
        </SettingIconWrapper>
      </SearchElement>
    </TopBar>
  );
};

export default HeaderBar;
