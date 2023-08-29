import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetForm } from './slices/signUpSlice';

import SignUpForm from './components/SignUpForm';

import './assets/styles/style.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        <span className="heading">Sign Up Form</span>
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
