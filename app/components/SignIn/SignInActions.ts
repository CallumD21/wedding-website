'use server'

import { createUser } from "@/lib/actions";

export async function createAccount(username: string, password: string) {
    createUser({username: username.toString(), password: password.toString()})
}