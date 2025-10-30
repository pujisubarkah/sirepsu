import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, level_nama, level_skor, level_penjelasan FROM simbatik.level ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ id: r.id, createdAt: r.created_at, levelNama: r.level_nama, levelSkor: r.level_skor, levelPenjelasan: r.level_penjelasan })));
  } catch (err) {
    console.error('level GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.level (level_nama, level_skor, level_penjelasan)
      VALUES (${data.levelNama}, ${data.levelSkor}, ${data.levelPenjelasan})
      RETURNING id, created_at::text AS created_at, level_nama, level_skor, level_penjelasan
    `;
    const r = inserted[0];
    return json({ id: r.id, createdAt: r.created_at, levelNama: r.level_nama, levelSkor: r.level_skor, levelPenjelasan: r.level_penjelasan }, { status: 201 });
  } catch (err) {
    console.error('level POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
