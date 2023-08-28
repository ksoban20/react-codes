import { useEffect, useState } from 'react';
import './assets/styles/style.css';
import Inputs from './components/Inputs';
import { useSignUp } from './utils/hooks';
import { useDispatch } from 'react-redux';
import {
  SignUpForm,
  resetForm,
  setValidationError,
  updateForm,
} from './slices/signUpSlice';
import CountrySelect from './components/CountriesSelect';
import { signUpFormSchema } from './schema/signUpSchema';
import * as Yup from 'yup';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const {
    form,
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

  const handleFormSubmit = (formData: SignUpForm) => {
    try {
      signUpFormSchema.validateSync(formData, { abortEarly: false });
      // Proceed with form submission...
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        dispatch(setValidationError({ validationErrors: error.errors }));
      }
    }
  };
  console.log(validation[0]);
  return (
    <div className="container">
      <div className="wrapper">
        <span className="heading">Sign Up Form</span>
        <div className="progress-bar">
          <div className={`filler ${currentStep >= 1 ? 'active' : ''}`}></div>
          <div className={`filler ${currentStep >= 2 ? 'active' : ''}`}></div>
          <div className={`filler ${currentStep >= 3 ? 'active' : ''}`}></div>
        </div>

        {currentStep === 1 && (
          <span className="subHeading">Personal Details</span>
        )}
        {currentStep === 2 && (
          <span className="subHeading">Contact Details</span>
        )}
        {currentStep === 3 && <span className="subHeading">Login Details</span>}

        <div className="formWrapper">
          {currentStep === 1 && (
            <>
              <div>
                <label className="label" aria-label="firstName">
                  First Name:
                </label>
                {!!validation?.firstName && (
                  <label>{validation.firstName}</label>
                )}
                <Inputs
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="label" aria-label="lastName">
                  Last Name:
                </label>
                <Inputs
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="label" aria-label="gender">
                  Gender:
                </label>
                <div className="inputContainer">
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={onSelectChange}
                    className="inputSelect"
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
                <label className="label" aria-label="dob">
                  Date of Birth:
                </label>
                <Inputs
                  id="dob"
                  name="dob"
                  value={form.dob}
                  onChange={onChange}
                  type="date"
                />
              </div>
              <div>
                <label className="label" aria-label="contactNumber">
                  Contact Number:
                </label>
                <Inputs
                  id="contactNumber"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="label" aria-label="country">
                  Country:
                </label>
                <CountrySelect
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={onSelectChange}
                />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div>
                <label className="label" aria-label="userName">
                  User Name:
                </label>
                <Inputs
                  id="userName"
                  name="userName"
                  value={form.userName}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="label" aria-label="email">
                  Email:
                </label>
                <Inputs
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="label" aria-label="password">
                  Password:
                </label>
                <Inputs
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
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
                <button onClick={() => handleFormSubmit({ ...form })}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return <div>This is step 1</div>;
}

function Step2() {
  return <div>This is step 2</div>;
}

function Step3() {
  return <div>This is step 3</div>;
}

export default App;
