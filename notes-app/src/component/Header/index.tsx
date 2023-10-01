import { useDispatch } from 'react-redux';

import { noteSearch } from '../../store/slices/notes';
import { useDebounce, useNote } from '../../utils/hooks';

import {
  TopBar,
  LogoWrapper,
  SearchElement,
  SettingIconWrapper,
} from './styled';

import SearchComponent from './SearchBar';

import { NoteIcon, SettingIcon, UserIcon } from '../../assets/images/image';

const HeaderBar = () => {
  const dispatch = useDispatch();

  const { searchQuery }: any = useNote();

  const debouncedSearch = useDebounce((query: string) => {
    dispatch(noteSearch(query));
  }, 100);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  return (
    <TopBar>
      <LogoWrapper>
        <img src={NoteIcon} alt="" />
      </LogoWrapper>
      <SearchElement>
        <SearchComponent
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => dispatch(noteSearch(''))}
        />
        <SettingIconWrapper>
          <img src={SettingIcon} alt="" />
          <img src={UserIcon} alt="" />
        </SettingIconWrapper>
      </SearchElement>
    </TopBar>
  );
};

export default HeaderBar;
