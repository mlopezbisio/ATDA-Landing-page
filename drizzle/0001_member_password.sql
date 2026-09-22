ALTER TABLE "members" ADD COLUMN "password_hash" varchar(255);--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "auth_user_id";
