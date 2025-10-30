import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, indikator_id, created_at::text AS created_at, indikator_nama, domain_id, question_id, indikator_bobot FROM simbatik.master_indikator WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({ id: r.id, indikatorId: r.indikator_id, createdAt: r.created_at, indikatorNama: r.indikator_nama, domainId: r.domain_id, questionId: r.question_id, indikatorBobot: r.indikator_bobot });
  } catch (err) {
    console.error('master-indikator GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updated = await client`
      UPDATE simbatik.master_indikator SET indikator_id = ${data.indikatorId}, indikator_nama = ${data.indikatorNama}, domain_id = ${data.domainId}, question_id = ${data.questionId}, indikator_bobot = ${data.indikatorBobot}
      WHERE id = ${id}
      RETURNING id, indikator_id, created_at::text AS created_at, indikator_nama, domain_id, question_id, indikator_bobot
    `;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({ id: r.id, indikatorId: r.indikator_id, createdAt: r.created_at, indikatorNama: r.indikator_nama, domainId: r.domain_id, questionId: r.question_id, indikatorBobot: r.indikator_bobot });
  } catch (err) {
    console.error('master-indikator PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.master_indikator WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('master-indikator DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
