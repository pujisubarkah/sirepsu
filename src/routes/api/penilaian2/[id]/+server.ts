import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, created_at::text AS created_at, user_id, level_id, indikator_id, file_url, penjelasan, status FROM simbatik.penilaian2 WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, indikatorId: r.indikator_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status });
  } catch (err) {
    console.error('penilaian2 GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updated = await client`UPDATE simbatik.penilaian2 SET user_id = ${data.userId}, level_id = ${data.levelId}, indikator_id = ${data.indikatorId}, file_url = ${data.fileUrl}, penjelasan = ${data.penjelasan}, status = ${data.status} WHERE id = ${id} RETURNING id, created_at::text AS created_at, user_id, level_id, indikator_id, file_url, penjelasan, status`;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, indikatorId: r.indikator_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status });
  } catch (err) {
    console.error('penilaian2 PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.penilaian2 WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('penilaian2 DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
