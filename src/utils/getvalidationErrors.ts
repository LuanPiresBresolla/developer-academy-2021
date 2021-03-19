import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export function toastMessageError(err: ValidationError): string[] {
  const toastError: string[] = [];

  err.inner.forEach(error => {
    toastError.push(error.message);
  });

  return toastError;
}