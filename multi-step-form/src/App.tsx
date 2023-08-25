import { useState } from 'react';
import './assets/styles/style.css';
import Inputs from './components/Inputs';
import { useSignUp } from './utils/hooks';
import { useDispatch } from 'react-redux';
import { updateForm } from './slices/signUpSlice';

function App() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const { form }: any = useSignUp();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(updateForm({ [name]: value }));
  };
  console.log(form);
  return (
    <div className="container">
      <div className="wrapper">
        <div className="progress-bar">
          <div className={`filler ${currentStep >= 1 ? 'active' : ''}`}></div>
          <div className={`filler ${currentStep >= 2 ? 'active' : ''}`}></div>
          <div className={`filler ${currentStep >= 3 ? 'active' : ''}`}></div>
        </div>
        {currentStep === 1 && (
          <Inputs name="firstName" value={form.firstName} onChange={onChange} />
        )}
        {currentStep === 2 && <Inputs />}
        {currentStep === 3 && <Inputs />}
        <div className="buttons">
          {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
          {currentStep < 3 && <button onClick={nextStep}>Next</button>}
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
