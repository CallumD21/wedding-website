import { eq } from 'drizzle-orm';
import { db } from './db';
import { InsertUser, User, usersTable } from '../../db/schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserByUsername(username: User['username']): Promise<Array<User>> {
  return db.select().from(usersTable).where(eq(usersTable.username, username));
}