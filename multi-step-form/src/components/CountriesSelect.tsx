import { SelectHTMLAttributes } from 'react';
import { countries } from '../constants/countries';

interface SelectProp extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  error?: boolean;
}

const CountrySelect: React.FC<SelectProp> = ({
  id,
  error,
  name,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className="inputContainer">
      <select
        className={error ? 'error inputSelect' : 'inputSelect'}
        {...props}
        value={value}
        onChange={onChange}
        name="country"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
