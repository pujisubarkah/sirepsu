import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, created_at::text AS created_at, level_nama, level_skor, level_penjelasan FROM simbatik.level WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({ id: r.id, createdAt: r.created_at, levelNama: r.level_nama, levelSkor: r.level_skor, levelPenjelasan: r.level_penjelasan });
  } catch (err) {
    console.error('level GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updated = await client`UPDATE simbatik.level SET level_nama = ${data.levelNama}, level_skor = ${data.levelSkor}, level_penjelasan = ${data.levelPenjelasan} WHERE id = ${id} RETURNING id, created_at::text AS created_at, level_nama, level_skor, level_penjelasan`;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({ id: r.id, createdAt: r.created_at, levelNama: r.level_nama, levelSkor: r.level_skor, levelPenjelasan: r.level_penjelasan });
  } catch (err) {
    console.error('level PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.level WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('level DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
