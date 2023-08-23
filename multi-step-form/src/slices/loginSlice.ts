import { createSlice } from '@reduxjs/toolkit';

import { hasKeys, diffObject } from '../utils/misc';

const CLASS_SLICE = 'class_slice';

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

export interface ClassForm {
  name?: string;
  id?: number;
  active?: boolean;
}
export interface RootObject {
  classes: ClassForm[];
  fetchedClass: ClassForm;
  currentClass: ClassForm;
  form: ClassForm;
  currentDialog: {
    dialog: string;
    data: {} | null;
  };
  touched: boolean;
  loading: boolean;
  loadingClass: boolean;
  success?: any;
  error: Error;
}

export const initialState: RootObject = {
  classes: [],
  fetchedClass: {
    name: '',
  },
  currentClass: {
    name: '',
  },
  form: {
    name: '',
  },
  currentDialog: {
    dialog: '',
    data: null,
  },
  touched: false,
  loading: false,
  loadingClass: false,
  success: null,
  error: {
    validation: {},
    responseError: null,
  },
};

export const loginSlice = createSlice({
  name: CLASS_SLICE,
  initialState,
  reducers: {
    resetClass() {
      return initialState;
    },
    updateForm(state, { payload }: IPayload) {
      state.form = {
        ...state.form,
        ...payload,
      };

      state.touched = hasKeys(diffObject(state.form, initialState.form));
    },
    updateClass(state, { payload }: IPayload) {
      state.currentClass = {
        ...state.currentClass,
        ...payload,
      };

      state.touched = hasKeys(
        diffObject(state.currentClass, state.fetchedClass)
      );
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
  resetClass,
  updateForm,
  resetForm,
  updateClass,
  setValidationError,
  resetValidationError,
} = loginSlice.actions;

export default loginSlice.reducer;
