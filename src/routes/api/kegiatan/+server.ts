import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, user_id, kegiatan_statistik, sub_unitkerja, jenis_kegiatan, tahun, deskripsi, link_pendukung FROM simbatik.kegiatan ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({
      id: r.id,
      createdAt: r.created_at,
      userId: r.user_id,
      kegiatanStatistik: r.kegiatan_statistik,
      subUnitkerja: r.sub_unitkerja,
      jenisKegiatan: r.jenis_kegiatan,
      tahun: r.tahun,
      deskripsi: r.deskripsi,
      linkPendukung: r.link_pendukung
    })));
  } catch (err) {
    console.error('kegiatan GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.kegiatan (user_id, kegiatan_statistik, sub_unitkerja, jenis_kegiatan, tahun, deskripsi, link_pendukung)
      VALUES (${data.userId}, ${data.kegiatanStatistik}, ${data.subUnitkerja}, ${data.jenisKegiatan}, ${data.tahun}, ${data.deskripsi}, ${data.linkPendukung})
      RETURNING id, created_at::text AS created_at, user_id, kegiatan_statistik, sub_unitkerja, jenis_kegiatan, tahun, deskripsi, link_pendukung
    `;
    const r = inserted[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, kegiatanStatistik: r.kegiatan_statistik, subUnitkerja: r.sub_unitkerja, jenisKegiatan: r.jenis_kegiatan, tahun: r.tahun, deskripsi: r.deskripsi, linkPendukung: r.link_pendukung }, { status: 201 });
  } catch (err) {
    console.error('kegiatan POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
