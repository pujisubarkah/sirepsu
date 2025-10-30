import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, pertanyaan, jawaban FROM simbatik.faq ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ id: r.id, createdAt: r.created_at, pertanyaan: r.pertanyaan, jawaban: r.jawaban })));
  } catch (err) {
    console.error('faq GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const pertanyaan = typeof data.pertanyaan === 'string' ? data.pertanyaan : null;
    const jawaban = typeof data.jawaban === 'string' ? data.jawaban : null;

    const inserted = await client`
      INSERT INTO simbatik.faq (pertanyaan, jawaban)
      VALUES (${pertanyaan}, ${jawaban})
      RETURNING id, created_at::text AS created_at, pertanyaan, jawaban
    `;

    const row = inserted[0];
    return json({ id: row.id, createdAt: row.created_at, pertanyaan: row.pertanyaan, jawaban: row.jawaban }, { status: 201 });
  } catch (err) {
    console.error('faq POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
