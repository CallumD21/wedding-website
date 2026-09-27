'use server'

import { hash } from 'bcryptjs';
import { createUser, getUserByUsername } from "@/lib/actions";

export async function createAccount(username: string, password: string) {   
    const existingUser = await getUserByUsername(username);
    if(existingUser.length > 0)
        return;

    const hashedPassword = await hash(password, 10);
    createUser({username, password: hashedPassword});
}