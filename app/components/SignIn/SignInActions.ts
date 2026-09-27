'use server'

import { hash } from 'bcryptjs';
import { createUser } from "@/lib/actions";

export async function createAccount(username: string, password: string) {    
    const hashedPassword = await hash(password, 10);
    createUser({username, password: hashedPassword});
}