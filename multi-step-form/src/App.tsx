import { SyntheticEvent, useEffect, useState } from 'react';
import './assets/styles/style.css';
import Inputs from './components/Inputs';
import { useSignUp } from './utils/hooks';
import { useDispatch } from 'react-redux';
import { resetForm, submitForm, updateForm } from './slices/signUpSlice';
import CountrySelect from './components/CountriesSelect';
import SignUpForm from './components/SignUpForm';

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
