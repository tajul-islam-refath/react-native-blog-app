import {object, string} from 'yup';

export const loginSchema = object({
  email: string().email('Provide valid email').required('Email is required'),
  password: string()
    .min(8, 'Minimum 8 char required')
    .required('Password is required'),
});

export const signInSchema = object({
  name: string().required('Name is required'),
  email: string().email('Provide valid email').required('Email is required'),
  password: string()
    .min(8, 'Minimum 8 char required')
    .required('Password is required'),
});
