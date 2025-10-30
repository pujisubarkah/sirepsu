import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const rows = await client`SELECT id, created_at::text AS created_at, domain_id, domain_nama, domain_bobot, indikator_nama, indikator_bobot, indikator_id, indikator_deskripsi, indikator_penjelasan FROM simbatik.indikator WHERE id = ${id}`;
    if (!rows.length) return json({ error: 'Not found' }, { status: 404 });
    const r = rows[0];
    return json({
      id: r.id,
      createdAt: r.created_at,
      domainId: r.domain_id,
      domainNama: r.domain_nama,
      domainBobot: r.domain_bobot,
      indikatorNama: r.indikator_nama,
      indikatorBobot: r.indikator_bobot,
      indikatorId: r.indikator_id,
      indikatorDeskripsi: r.indikator_deskripsi,
      indikatorPenjelasan: r.indikator_penjelasan
    });
  } catch (err) {
    console.error('indikator GET by id error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updated = await client`
      UPDATE simbatik.indikator SET domain_id = ${data.domainId}, domain_nama = ${data.domainNama}, domain_bobot = ${data.domainBobot}, indikator_nama = ${data.indikatorNama}, indikator_bobot = ${data.indikatorBobot}, indikator_id = ${data.indikatorId}, indikator_deskripsi = ${data.indikatorDeskripsi}, indikator_penjelasan = ${data.indikatorPenjelasan}
      WHERE id = ${id}
      RETURNING id, created_at::text AS created_at, domain_id, domain_nama, domain_bobot, indikator_nama, indikator_bobot, indikator_id, indikator_deskripsi, indikator_penjelasan
    `;
    if (!updated.length) return json({ error: 'Not found' }, { status: 404 });
    const r = updated[0];
    return json({
      id: r.id,
      createdAt: r.created_at,
      domainId: r.domain_id,
      domainNama: r.domain_nama,
      domainBobot: r.domain_bobot,
      indikatorNama: r.indikator_nama,
      indikatorBobot: r.indikator_bobot,
      indikatorId: r.indikator_id,
      indikatorDeskripsi: r.indikator_deskripsi,
      indikatorPenjelasan: r.indikator_penjelasan
    });
  } catch (err) {
    console.error('indikator PUT error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = Number(params.id);
    const deleted = await client`DELETE FROM simbatik.indikator WHERE id = ${id} RETURNING id`;
    if (!deleted.length) return json({ error: 'Not found' }, { status: 404 });
    return json({ success: true });
  } catch (err) {
    console.error('indikator DELETE error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
