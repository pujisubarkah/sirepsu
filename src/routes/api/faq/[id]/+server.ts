import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, created_at::text AS created_at, pertanyaan, jawaban FROM simbatik.faq WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({ id: r.id, createdAt: r.created_at, pertanyaan: r.pertanyaan, jawaban: r.jawaban });
  } catch (err) {
    console.error('faq GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const pertanyaan = typeof data.pertanyaan === 'string' ? data.pertanyaan : null;
    const jawaban = typeof data.jawaban === 'string' ? data.jawaban : null;

    const updated = await client`
      UPDATE simbatik.faq SET pertanyaan = ${pertanyaan}, jawaban = ${jawaban} WHERE id = ${id} RETURNING id, created_at::text AS created_at, pertanyaan, jawaban
    `;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({ id: r.id, createdAt: r.created_at, pertanyaan: r.pertanyaan, jawaban: r.jawaban });
  } catch (err) {
    console.error('faq PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.faq WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('faq DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
