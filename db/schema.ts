import { defineRelations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;

export const sessionTable = pgTable('session_table', {
  id: serial("id").primaryKey(),
  sessionKey: text("session_key").unique().notNull(),
  userId: serial("user_id").notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
});

export type InsertSession = typeof sessionTable.$inferInsert;

export const relations = defineRelations({ usersTable, sessionTable }, (r) => ({
  sessionTable: {
    session: r.one.usersTable({
      from: r.sessionTable.userId,
      to: r.usersTable.id,
    }),
  },
  users: {
    sessions: r.many.sessionTable(),
  },
}));