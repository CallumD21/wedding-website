CREATE TABLE "session_table" (
	"id" serial PRIMARY KEY,
	"session_key" text NOT NULL UNIQUE,
	"user_id" text NOT NULL,
	"expiry_date" timestamp NOT NULL
);
