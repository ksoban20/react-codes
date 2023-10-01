import { CloseIcon } from '../../assets/images/image';
import { SearchBar, SearchBarWrapper, ClearButton } from './styled';

type SearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const SearchComponent: React.FC<SearchProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <SearchBarWrapper>
      <SearchBar
        value={value}
        onChange={onChange}
        placeholder="search note..."
      />
      {value && (
        <ClearButton onClick={onClear}>
          <img src={CloseIcon} alt="close" />
        </ClearButton>
      )}
    </SearchBarWrapper>
  );
};

export default SearchComponent;
