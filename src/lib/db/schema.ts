import { pgTable, serial, text, varchar, timestamp, integer, bigint } from 'drizzle-orm/pg-core';

// FAQ table
export const faq = pgTable('faq', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  pertanyaan: text('pertanyaan'),
  jawaban: text('jawaban'),
}, (table) => ({
  schema: 'simbatik'
}));

// Indikator table
export const indikator = pgTable('indikator', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  domainId: bigint('domain_id', { mode: 'number' }),
  domainNama: text('domain_nama'),
  domainBobot: integer('domain_bobot'),
  indikatorNama: text('indikator_nama'),
  indikatorBobot: integer('indikator_bobot'),
  indikatorId: bigint('indikator_id', { mode: 'number' }),
  indikatorDeskripsi: text('indikator_deskripsi'),
  indikatorPenjelasan: text('indikator_penjelasan'),
}, (table) => ({
  schema: 'simbatik'
}));

// Kegiatan table
export const kegiatan = pgTable('kegiatan', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: varchar('user_id', { length: 36 }), // UUID
  kegiatanStatistik: text('kegiatan_statistik'),
  subUnitkerja: text('sub_unitkerja'),
  jenisKegiatan: text('jenis_kegiatan'),
  tahun: text('tahun'),
  deskripsi: varchar('deskripsi'),
  linkPendukung: varchar('link_pendukung'),
}, (table) => ({
  schema: 'simbatik'
}));

// Level table
export const level = pgTable('level', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  levelNama: text('level_nama'),
  levelSkor: integer('level_skor'),
  levelPenjelasan: text('level_penjelasan'),
}, (table) => ({
  schema: 'simbatik'
}));

// Master Domain table
export const masterDomain = pgTable('master_domain', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  domainNama: varchar('domain_nama'),
  domainBobot: bigint('domain_bobot', { mode: 'number' }),
}, (table) => ({
  schema: 'simbatik'
}));

// Master Indikator table
export const masterIndikator = pgTable('master_indikator', {
  indikatorId: bigint('indikator_id', { mode: 'number' }),
  createdAt: timestamp('created_at').defaultNow(),
  indikatorNama: varchar('indikator_nama'),
  domainId: bigint('domain_id', { mode: 'number' }),
  questionId: bigint('question_id', { mode: 'number' }),
  id: bigint('id', { mode: 'number' }).primaryKey(),
  indikatorBobot: bigint('indikator_bobot', { mode: 'number' }),
}, (table) => ({
  schema: 'simbatik'
}));

// Penilaian table (composite primary key)
export const penilaian = pgTable('penilaian', {
  questionId: bigint('question_id', { mode: 'number' }),
  createdAt: timestamp('created_at').defaultNow(),
  userId: varchar('user_id', { length: 36 }).default('gen_random_uuid()'), // UUID
  levelId: bigint('level_id', { mode: 'number' }),
  fileUrl: text('file_url'),
  penjelasan: text('penjelasan'),
  status: text('status'),
  indikatorId: integer('indikator_id'),
}, (table) => ({
  schema: 'simbatik'
}));

// Penilaian2 table
export const penilaian2 = pgTable('penilaian2', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: varchar('user_id', { length: 36 }), // UUID
  levelId: bigint('level_id', { mode: 'number' }),
  indikatorId: bigint('indikator_id', { mode: 'number' }),
  fileUrl: text('file_url'),
  penjelasan: text('penjelasan'),
  status: text('status'),
}, (table) => ({
  schema: 'simbatik'
}));

// Role table
export const role = pgTable('role', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  roleName: varchar('role_name'),
}, (table) => ({
  schema: 'simbatik'
}));

// Unit Kerja table
export const unitKerja = pgTable('unit_kerja', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  unitKerja: text('unit_kerja'),
  alias: text('alias'),
  userId: varchar('user_id', { length: 36 }), // UUID
  roleId: bigint('role_id', { mode: 'number' }),
  username: text('username'),
}, (table) => ({
  schema: 'simbatik'
}));