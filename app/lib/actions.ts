import { eq } from 'drizzle-orm';
import { db } from './db';
import { InsertSession, InsertUser, Session, sessionTable, User, usersTable } from '../../db/schema';

export async function createUser(data: InsertUser): Promise<User[]> {
  return await db.insert(usersTable).values(data).returning();
}

export async function getUsers(username: User['username']): Promise<Array<User>> {
  return db.select().from(usersTable).where(eq(usersTable.username, username));
}

export async function createSession(data: InsertSession) {
  await db.insert(sessionTable).values(data);
}

export async function deleteSession(sessionKey: Session['sessionKey']) {
  await db.delete(sessionTable).where(eq(sessionTable.sessionKey, sessionKey));
}

export async function getSessions(sessionKey: Session['sessionKey']): Promise<Array<Session>> {
  return db.select().from(sessionTable).where(eq(sessionTable.sessionKey, sessionKey));
}