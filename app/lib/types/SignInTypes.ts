import * as z from 'zod'
 
export const CreateAccountFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: 'Username must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
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