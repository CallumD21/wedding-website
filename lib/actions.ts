import { db } from './db';
import { InsertUser, usersTable } from '../db/schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}