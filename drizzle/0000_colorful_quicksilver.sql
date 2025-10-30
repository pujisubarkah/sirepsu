CREATE TABLE "faq" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"pertanyaan" text,
	"jawaban" text
);
--> statement-breakpoint
CREATE TABLE "indikator" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"domain_id" bigint,
	"domain_nama" text,
	"domain_bobot" integer,
	"indikator_nama" text,
	"indikator_bobot" integer,
	"indikator_id" bigint,
	"indikator_deskripsi" text,
	"indikator_penjelasan" text
);
--> statement-breakpoint
CREATE TABLE "kegiatan" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar(36),
	"kegiatan_statistik" text,
	"sub_unitkerja" text,
	"jenis_kegiatan" text,
	"tahun" text,
	"deskripsi" varchar,
	"link_pendukung" varchar
);
--> statement-breakpoint
CREATE TABLE "level" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"level_nama" text,
	"level_skor" integer,
	"level_penjelasan" text
);
--> statement-breakpoint
CREATE TABLE "master_domain" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"domain_nama" varchar,
	"domain_bobot" bigint
);
--> statement-breakpoint
CREATE TABLE "master_indikator" (
	"indikator_id" bigint,
	"created_at" timestamp DEFAULT now(),
	"indikator_nama" varchar,
	"domain_id" bigint,
	"question_id" bigint,
	"id" bigint PRIMARY KEY NOT NULL,
	"indikator_bobot" bigint
);
--> statement-breakpoint
CREATE TABLE "penilaian" (
	"question_id" bigint,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar(36) DEFAULT 'gen_random_uuid()',
	"level_id" bigint,
	"file_url" text,
	"penjelasan" text,
	"status" text,
	"indikator_id" integer
);
--> statement-breakpoint
CREATE TABLE "penilaian2" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar(36),
	"level_id" bigint,
	"indikator_id" bigint,
	"file_url" text,
	"penjelasan" text,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"role_name" varchar
);
--> statement-breakpoint
CREATE TABLE "unit_kerja" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"unit_kerja" text,
	"alias" text,
	"user_id" varchar(36),
	"role_id" bigint,
	"username" text
);
