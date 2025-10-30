import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

// penilaian has composite key (question_id + maybe user_id). This endpoint supports listing and creating.
export const GET: RequestHandler = async ({ url }) => {
  try {
    const questionId = url.searchParams.get('question_id');
    const userId = url.searchParams.get('user_id');

    if (questionId && userId) {
      const rows = await client`SELECT question_id, created_at::text AS created_at, user_id, level_id, file_url, penjelasan, status, indikator_id FROM simbatik.penilaian WHERE question_id = ${Number(questionId)} AND user_id = ${userId}`;
      return json(rows.map((r: any) => ({ questionId: r.question_id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status, indikatorId: r.indikator_id })));
    }

    // otherwise return all
    const rows = await client`SELECT question_id, created_at::text AS created_at, user_id, level_id, file_url, penjelasan, status, indikator_id FROM simbatik.penilaian ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ questionId: r.question_id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status, indikatorId: r.indikator_id })));
  } catch (err) {
    console.error('penilaian GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.penilaian (question_id, user_id, level_id, file_url, penjelasan, status, indikator_id)
      VALUES (${data.questionId}, ${data.userId}, ${data.levelId}, ${data.fileUrl}, ${data.penjelasan}, ${data.status}, ${data.indikatorId})
      RETURNING question_id, created_at::text AS created_at, user_id, level_id, file_url, penjelasan, status, indikator_id
    `;
    const r = inserted[0];
    return json({ questionId: r.question_id, createdAt: r.created_at, userId: r.user_id, levelId: r.level_id, fileUrl: r.file_url, penjelasan: r.penjelasan, status: r.status, indikatorId: r.indikator_id }, { status: 201 });
  } catch (err) {
    console.error('penilaian POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
