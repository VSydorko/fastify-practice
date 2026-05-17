CREATE TYPE "public"."post_status" AS ENUM('active', 'draft', 'blocked');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "status" "post_status" DEFAULT 'draft' NOT NULL;