import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useSignUp = () => {
  return useSelector<RootState>(({ signUp }) => signUp);
};
