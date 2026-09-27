import * as z from 'zod'
 
export const CreateAccountFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: 'Username must be at least 2 characters long.' }),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    }),
  confirmPassword: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    }),
});
 
export interface CreateAccountErrors {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
}

export interface CreateAccountFormState {
  success: boolean;
  errors?: CreateAccountErrors;
};

export const SignInFormSchema = z.object({
  username: z
    .string()
    .min(1, { error: 'Username must not be empty.' }),
  password: z
    .string()
    .min(1, { error: 'Password must not be empty.' }),
});

export interface SignInErrors {
    username?: string[];
    password?: string[];
}

export interface SignInFormState {
  success: boolean;
  errors?: SignInErrors;
};