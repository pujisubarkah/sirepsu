import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, created_at::text AS created_at, user_id, kegiatan_statistik, sub_unitkerja, jenis_kegiatan, tahun, deskripsi, link_pendukung FROM simbatik.kegiatan WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, kegiatanStatistik: r.kegiatan_statistik, subUnitkerja: r.sub_unitkerja, jenisKegiatan: r.jenis_kegiatan, tahun: r.tahun, deskripsi: r.deskripsi, linkPendukung: r.link_pendukung });
  } catch (err) {
    console.error('kegiatan GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updated = await client`
      UPDATE simbatik.kegiatan SET user_id = ${data.userId}, kegiatan_statistik = ${data.kegiatanStatistik}, sub_unitkerja = ${data.subUnitkerja}, jenis_kegiatan = ${data.jenisKegiatan}, tahun = ${data.tahun}, deskripsi = ${data.deskripsi}, link_pendukung = ${data.linkPendukung}
      WHERE id = ${id}
      RETURNING id, created_at::text AS created_at, user_id, kegiatan_statistik, sub_unitkerja, jenis_kegiatan, tahun, deskripsi, link_pendukung
    `;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, kegiatanStatistik: r.kegiatan_statistik, subUnitkerja: r.sub_unitkerja, jenisKegiatan: r.jenis_kegiatan, tahun: r.tahun, deskripsi: r.deskripsi, linkPendukung: r.link_pendukung });
  } catch (err) {
    console.error('kegiatan PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.kegiatan WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('kegiatan DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
