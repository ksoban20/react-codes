import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { hasKeys, diffObject } from '../utils/misc';
import { validationError } from '../utils/validation';

import { signUpFormSchema } from '../schema/signUpSchema';

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
  contactNumber: string;
  country?: string;
  gender: string;
  id?: number;
  active?: boolean;
}

export interface RootObject {
  form: SignUpForm;
  dialog: boolean;
  touched: boolean;
  loading: boolean;
  success?: any;
  error: Error;
}

export const initialState: RootObject = {
  form: {
    firstName: '',
    lastName: '',
    dob: '',
    userName: '',
    email: '',
    password: '',
    contactNumber: '',
    gender: '',
  },
  dialog: false,
  loading: false,
  success: null,
  error: {
    validation: {},
    responseError: null,
  },
};

export const submitForm = createAsyncThunk(
  'login/submitForm',
  async (_, api) => {
    const state: any = api.getState() as RootState;
    const { form: data } = state.signUp;
    const error = await validationError({ schema: signUpFormSchema, data });

    if (error) {
      return api.rejectWithValue({ validation: error });
    }

    try {
    } catch (error) {
      return api.rejectWithValue({});
    }
  }
);

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

    resetForm(state) {
      state.form = initialState.form;
      state.error.validation = initialState.error.validation;
      state.touched = false;
    },
    setDialog(state, action) {
      state.dialog = action.payload;
    },
    resetDialog(state) {
      state.dialog = initialState.dialog;
    },
    setValidationError(state, action: IPayload) {
      state.error.validation = action.payload;
    },
    resetValidationError(state) {
      state.error.validation = initialState.error.validation;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.fulfilled, (state, action) => {
      state.form = initialState.form;
      state.error.validation = initialState.error.validation;
      state.loading = false;
      state.dialog = true;
    });
    builder.addCase(submitForm.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submitForm.rejected, (state, { payload }: IPayload) => {
      state.loading = false;
      state.error.validation = payload.validation;
    });
  },
});

export const {
  reset,
  updateForm,
  resetForm,
  setDialog,
  resetDialog,
  setValidationError,
  resetValidationError,
} = signUpSlice.actions;

export default signUpSlice.reducer;
