import * as Yup from 'yup';

// Yup validation schema for SignUpForm
export const signUpFormSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string(),
  dob: Yup.date().required('Date of birth is required'),
  userName: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  contactNumber: Yup.string().required('Contact number is required'),
  country: Yup.string(),
  gender: Yup.string().required('Gender is required'),
});
