import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, user_id, level_id, indikator_id, file_url, penjelasan, status FROM simbatik.penilaian2 ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ id: r.id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, indikatorId: r.indikator_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status })));
  } catch (err) {
    console.error('penilaian2 GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.penilaian2 (user_id, level_id, indikator_id, file_url, penjelasan, status)
      VALUES (${data.userId}, ${data.levelId}, ${data.indikatorId}, ${data.fileUrl}, ${data.penjelasan}, ${data.status})
      RETURNING id, created_at::text AS created_at, user_id, level_id, indikator_id, file_url, penjelasan, status
    `;
    const r = inserted[0];
    return json({ id: r.id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, indikatorId: r.indikator_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status }, { status: 201 });
  } catch (err) {
    console.error('penilaian2 POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
