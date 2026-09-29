CREATE SEQUENCE "session_table_user_id_seq";--> statement-breakpoint
ALTER TABLE "session_table" ALTER COLUMN "user_id" SET DEFAULT nextval('session_table_user_id_seq')--> statement-breakpoint
ALTER SEQUENCE "session_table_user_id_seq" OWNED BY "public"."session_table"."user_id";--> statement-breakpoint
ALTER TABLE "session_table" ALTER COLUMN "user_id" SET DATA TYPE int USING "user_id"::int;