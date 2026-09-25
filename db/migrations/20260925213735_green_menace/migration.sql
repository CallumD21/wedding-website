CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY,
	"username" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
