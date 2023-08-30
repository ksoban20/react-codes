import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { submitForm, updateForm } from '../slices/signUpSlice';

import { useSignUp } from '../utils/hooks';

import Inputs from './Inputs';
import CountrySelect from './CountriesSelect';

import '../assets/styles/style.css';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const {
    form,
    loading,
    error: { validation },
  }: any = useSignUp();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(updateForm({ [name]: value }));
  };

  const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLSelectElement;
    dispatch(updateForm({ [name]: value }));
  };

  return (
    <>
      <div className="progress-bar">
        <div className={`filler ${currentStep >= 1 ? 'active' : ''}`}></div>
        <div className={`filler ${currentStep >= 2 ? 'active' : ''}`}></div>
        <div className={`filler ${currentStep >= 3 ? 'active' : ''}`}></div>
      </div>

      {currentStep === 1 && (
        <span className="subHeading">Personal Details</span>
      )}
      {currentStep === 2 && <span className="subHeading">Contact Details</span>}
      {currentStep === 3 && <span className="subHeading">Login Details</span>}

      <div className="formWrapper">
        {currentStep === 1 && (
          <>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.firstName ? 'labelError' : ''}
                  aria-label="firstName"
                >
                  First Name:
                </label>
                {!!validation?.firstName && (
                  <label className="labelError">{validation.firstName}</label>
                )}
              </div>
              <Inputs
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                error={!!validation.firstName}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.lastName ? 'labelError' : ''}
                  aria-label="lastName"
                >
                  Last Name:
                </label>
                {!!validation?.lastName && (
                  <label className="labelError">{validation.lastName}</label>
                )}
              </div>
              <Inputs
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                error={!!validation.lastName}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.gender ? 'labelError' : ''}
                  aria-label="gender"
                >
                  Gender:
                </label>
                {!!validation?.gender && (
                  <label className="labelError">{validation.gender}</label>
                )}
              </div>
              <div className="inputContainer">
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={onSelectChange}
                  className={
                    !!validation.firstName ? 'error inputSelect' : 'inputSelect'
                  }
                >
                  <option>--select--</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.dob ? 'labelError' : ''}
                  aria-label="dob"
                >
                  Date of Birth:
                </label>
                {!!validation?.dob && (
                  <label className="labelError">{validation.dob}</label>
                )}
              </div>
              <Inputs
                id="dob"
                name="dob"
                value={form.dob}
                onChange={onChange}
                type="date"
                error={!!validation.dob}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.contactNumber ? 'labelError' : ''}
                  aria-label="contactNumber"
                >
                  Contact Number:
                </label>
                {!!validation?.contactNumber && (
                  <label className="labelError">
                    {validation.contactNumber}
                  </label>
                )}
              </div>
              <Inputs
                id="contactNumber"
                name="contactNumber"
                value={form.contactNumber}
                onChange={onChange}
                error={!!validation.contactNumber}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.country ? 'labelError' : ''}
                  aria-label="country"
                >
                  Country:
                </label>
                {!!validation?.country && (
                  <label className="labelError">{validation.country}</label>
                )}
              </div>
              <CountrySelect
                id="country"
                name="country"
                value={form.country}
                onChange={onSelectChange}
                error={!!validation.country}
              />
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.userName ? 'labelError' : ''}
                  aria-label="userName"
                >
                  User Name:
                </label>
                {!!validation?.userName && (
                  <label className="labelError">{validation.userName}</label>
                )}
              </div>
              <Inputs
                id="userName"
                name="userName"
                value={form.userName}
                onChange={onChange}
                error={!!validation.userName}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.email ? 'labelError' : ''}
                  aria-label="email"
                >
                  Email:
                </label>
                {!!validation?.email && (
                  <label className="labelError">{validation.email}</label>
                )}
              </div>
              <Inputs
                id="email"
                name="email"
                value={form.email}
                onChange={onChange}
                error={!!validation.email}
              />
            </div>
            <div>
              <div className="labelBox">
                <label
                  className={!!validation?.password ? 'labelError' : ''}
                  aria-label="password"
                >
                  Password:
                </label>
                {!!validation?.password && (
                  <label className="labelError">{validation.password}</label>
                )}
              </div>
              <Inputs
                id="password"
                name="password"
                value={form.password}
                onChange={onChange}
                error={!!validation.password}
              />
            </div>
          </>
        )}
        <div className="buttons">
          <div className="leftSide">
            {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
          </div>
          <div className="rightSide">
            {currentStep < 3 && <button onClick={nextStep}>Next</button>}
            {currentStep === 3 && (
              <button
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  dispatch(submitForm());
                }}
              >
                {loading ? '...loading' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
