import * as yup from 'yup';

// yup validation schema for SignUpForm
export const signUpFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  dob: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Invalid date of birth')
    .transform((curr, orig) => (orig === '' ? null : curr)),
  userName: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  contactNumber: yup.string().required('Contact number is required'),
  country: yup.string().required('Please select your country'),
  gender: yup.string().required('Gender is required'),
});
