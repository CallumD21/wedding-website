import { eq } from 'drizzle-orm';
import { db } from './db';
import { InsertSession, InsertUser, Session, sessionTable, User, usersTable } from '../../db/schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserByUsername(username: User['username']): Promise<Array<User>> {
  return db.select().from(usersTable).where(eq(usersTable.username, username));
}

export async function createSession(data: InsertSession) {
  await db.insert(sessionTable).values(data);
}

export async function getSessionBySessionKey(sessionKey: Session['sessionKey']): Promise<Array<Session>> {
  return db.select().from(sessionTable).where(eq(sessionTable.sessionKey, sessionKey));
}