import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { hasKeys, diffObject } from '../utils/misc';

const SIGNUP_SLICE = 'signup_slice';

export interface IPayload {
  payload: {
    [key: string]: any;
  };
}

export interface Error {
  validation: object;
  authentication?: any;
  responseError?: any;
}

export interface SignUpForm {
  firstName: string;
  lastName?: string;
  dob: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  gender: string;
  id?: number;
  active?: boolean;
}

interface Steps {
  id: number;
  title: string;
  fields: (keyof SignUpForm)[];
}

export interface RootObject {
  signUp: SignUpForm[];
  currentForm: SignUpForm;
  form: SignUpForm;
  steps: Steps[];
  currentDialog: {
    dialog: string;
    data: {} | null;
  };
  touched: boolean;
  loading: boolean;
  success?: any;
  error: Error;
}

export const initialState: RootObject = {
  signUp: [],
  currentForm: {
    firstName: '',
    lastName: '',
    dob: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    gender: '',
  },
  steps: [
    {
      id: 1,
      title: 'Signup Info',
      fields: ['email', 'password', 'confirmPassword'],
    },
    {
      id: 2,
      title: 'Personal Info',
      fields: ['userName', 'firstName', 'lastName', 'dob'],
    },
    {
      id: 3,
      title: 'Additional Info',
      fields: ['contactNumber', 'gender'],
    },
  ],
  form: {
    firstName: '',
    lastName: '',
    dob: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    gender: '',
  },
  currentDialog: {
    dialog: '',
    data: null,
  },
  touched: false,
  loading: false,
  success: null,
  error: {
    validation: {},
    responseError: null,
  },
};

export const signUpSlice = createSlice({
  name: SIGNUP_SLICE,
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateForm(state, { payload }: IPayload) {
      state.form = {
        ...state.form,
        ...payload,
      };

      state.touched = hasKeys(diffObject(state.form, initialState.form));
    },
    updateFormField(
      state,
      action: PayloadAction<{ field: keyof SignUpForm; value: string }>
    ) {
      const { field, value } = action.payload;
      Object.assign(state.form, { [field]: value });
    },
    resetForm(state) {
      state.form = initialState.form;
      state.error.validation = initialState.error.validation;
      state.touched = false;
    },
    setDialog(state, { payload }: IPayload) {
      state.currentDialog = {
        ...state.currentDialog,
        ...payload,
      };
    },
    resetDialog(state) {
      state.currentDialog = initialState.currentDialog;
    },
    setValidationError(state, action: IPayload) {
      state.error.validation = action.payload.validationError;
    },
    resetValidationError(state) {
      state.error.validation = initialState.error.validation;
    },
  },
});

export const {
  reset,
  updateForm,
  resetForm,
  setValidationError,
  resetValidationError,
  updateFormField,
} = signUpSlice.actions;

export default signUpSlice.reducer;
