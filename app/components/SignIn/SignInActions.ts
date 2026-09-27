'use server'

import * as z from 'zod'
import { hash } from 'bcryptjs';
import { createUser, getUserByUsername } from "@/app/lib/actions";
import { CreateAccountFormSchema, CreateAccountFormState } from '@/app/lib/types/SignInTypes';

export async function createAccount(username: string, password: string, confirmPassword: string): Promise<CreateAccountFormState> {   
    const validatedFields = CreateAccountFormSchema.safeParse({
        username,
        password,
        confirmPassword,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    if(password !== confirmPassword){
        return {
            success: false,
            errors: {
                password: ["Passwords do not match"],
                confirmPassword: ["Passwords do not match"]
            }
        };
    }

    const existingUser = await getUserByUsername(username);
    if(existingUser.length > 0)
        return {
            success: false,
            errors: {
                username: ["User already exists"]
            }
        };

    const hashedPassword = await hash(password, 10);
    createUser({username, password: hashedPassword});

    return{
        success: true
    };
}