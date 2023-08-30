import { useDispatch } from 'react-redux';
import { resetDialog } from '../slices/signUpSlice';
import { useSignUp } from '../utils/hooks';
import '../assets/styles/style.css';
import doneImage from '../assets/images/verified.gif';

export const Dialog = () => {
  const dispatch = useDispatch();
  const { dialog }: any = useSignUp();

  const onResetDialog = () => {
    dispatch(resetDialog());
    window.location.reload();
  };
  return (
    <div className={dialog ? 'dialogBox' : 'hidden'}>
      <dialog open={dialog}>
        <div className="iconWrapper">
          <img src={doneImage} alt="" />
        </div>

        <h4>Your form is submitted</h4>
        <p>Thank you for registration</p>
        <button onClick={onResetDialog}>Close</button>
      </dialog>
    </div>
  );
};
