'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs';
import { createSession, createUser, deleteSession, getUsers } from "@/app/lib/actions";
import { CreateAccountFormSchema, CreateAccountFormState, LoginFormSchema, LoginFormState } from '@/app/lib/types/LoginTypes';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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

    const existingUser = await getUsers(trimmedUsername);
    if(existingUser.length > 0)
        return {
            success: false,
            errors: {
                username: ["User already exists"]
        }
    };

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const user = await createUser({username: trimmedUsername, password: hashedPassword});

    if(user.length === 0){
        return {
            success: false,
            errors: {
                username: ["Something went wrong. Please try again!"]
            }
        };
    }

    return{
        success: true
    };
}

export async function login(username: string, password: string): Promise<LoginFormState> {
    const trimmedUsername = username.trim();   
    const trimmedPassword = password.trim(); 
    
    const validatedFields = LoginFormSchema.safeParse({
        username: trimmedUsername,
        password: trimmedPassword,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const existingUsers = await getUsers(trimmedUsername);

    if(existingUsers.length === 0){
        return{
            success: false,
            errors: {
                username: ["User does not exist."]
            }
        };
    }

    const existingUser = existingUsers[0];
    const passwordsMatch = await bcrypt.compare(trimmedPassword, existingUser.password);
    
    if(!passwordsMatch){
        return{
            success: false,
            errors: {
                password: ["Password incorrect."]
            }
        };
    }

    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = crypto.randomUUID();
    createSession({sessionKey: session, userId: existingUser.id, expiryDate });
    
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiryDate,
        sameSite: 'lax',
        path: '/',
    });

    redirect("/account");
}

export async function logOut() {
    const session = (await cookies()).get('session')?.value;
    
    if(session){
        deleteSession(session);
        (await cookies()).delete('session');
    }

    redirect("/");
}
