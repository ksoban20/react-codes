import { AnyObjectSchema } from 'yup';

interface IValidationError {
  schema: AnyObjectSchema;
  data: object;
}

export async function validationError({ schema, data }: IValidationError) {
  let error;
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (validationError: any) {
    error = validationError.inner.reduce((carry: any, err: any) => {
      //only take first part of dot field
      const path = err.path.split('.').shift();
      carry[path] = err.message;
      return carry;
    }, {});
  }

  return error;
}
