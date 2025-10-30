import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, indikator_id, created_at::text AS created_at, indikator_nama, domain_id, question_id, indikator_bobot FROM simbatik.master_indikator ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ id: r.id, indikatorId: r.indikator_id, createdAt: r.created_at, indikatorNama: r.indikator_nama, domainId: r.domain_id, questionId: r.question_id, indikatorBobot: r.indikator_bobot })));
  } catch (err) {
    console.error('master-indikator GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.master_indikator (indikator_id, indikator_nama, domain_id, question_id, indikator_bobot)
      VALUES (${data.indikatorId}, ${data.indikatorNama}, ${data.domainId}, ${data.questionId}, ${data.indikatorBobot})
      RETURNING id, indikator_id, created_at::text AS created_at, indikator_nama, domain_id, question_id, indikator_bobot
    `;
    const r = inserted[0];
    return json({ id: r.id, indikatorId: r.indikator_id, createdAt: r.created_at, indikatorNama: r.indikator_nama, domainId: r.domain_id, questionId: r.question_id, indikatorBobot: r.indikator_bobot }, { status: 201 });
  } catch (err) {
    console.error('master-indikator POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
