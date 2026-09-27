'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs';
import { createUser, getUserByUsername } from "@/app/lib/actions";
import { CreateAccountFormSchema, CreateAccountFormState, SignInFormSchema, SignInFormState } from '@/app/lib/types/SignInTypes';
import { redirect } from 'next/navigation';

export async function createAccount(username: string, password: string, confirmPassword: string): Promise<CreateAccountFormState> {
    const trimmedUsername = username.trim();   
    const trimmedPassword = password.trim();   
    const trimmedConfirmPassword = confirmPassword.trim();   

    const validatedFields = CreateAccountFormSchema.safeParse({
        username: trimmedUsername,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    if(trimmedPassword !== trimmedConfirmPassword){
        return {
            success: false,
            errors: {
                password: ["Passwords do not match"],
                confirmPassword: ["Passwords do not match"]
            }
        };
    }

    const existingUser = await getUserByUsername(trimmedUsername);
    if(existingUser.length > 0)
        return {
            success: false,
            errors: {
                username: ["User already exists"]
            }
        };

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    createUser({username: trimmedUsername, password: hashedPassword});

    return{
        success: true
    };
}

export async function signIn(username: string, password: string): Promise<SignInFormState> {
    const trimmedUsername = username.trim();   
    const trimmedPassword = password.trim(); 
    
    const validatedFields = SignInFormSchema.safeParse({
        username: trimmedUsername,
        password: trimmedPassword,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const existingUser = await getUserByUsername(trimmedUsername);

    if(existingUser.length === 0){
        return{
            success: false,
            errors: {
                username: ["User does not exist."]
            }
        };
    }

    const passwordsMatch = await bcrypt.compare(trimmedPassword, existingUser[0].password);
    
    if(!passwordsMatch){
        return{
            success: false,
            errors: {
                password: ["Password incorrect."]
            }
        };
    }

    redirect("/account");
}
