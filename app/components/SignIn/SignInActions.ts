'use server'

import { createUser } from "@/lib/actions";

export async function createAccount(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    if(!username || !password)
        return;

    createUser({username: username.toString(), password: password.toString()})
}