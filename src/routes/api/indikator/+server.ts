import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, domain_id, domain_nama, domain_bobot, indikator_nama, indikator_bobot, indikator_id, indikator_deskripsi, indikator_penjelasan FROM simbatik.indikator ORDER BY id ASC`;
    return json(rows.map((r: any) => ({
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
    })));
  } catch (err) {
    console.error('indikator GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`
      INSERT INTO simbatik.indikator (domain_id, domain_nama, domain_bobot, indikator_nama, indikator_bobot, indikator_id, indikator_deskripsi, indikator_penjelasan)
      VALUES (${data.domainId}, ${data.domainNama}, ${data.domainBobot}, ${data.indikatorNama}, ${data.indikatorBobot}, ${data.indikatorId}, ${data.indikatorDeskripsi}, ${data.indikatorPenjelasan})
      RETURNING id, created_at::text AS created_at, domain_id, domain_nama, domain_bobot, indikator_nama, indikator_bobot, indikator_id, indikator_deskripsi, indikator_penjelasan
    `;
    const r = inserted[0];
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
    }, { status: 201 });
  } catch (err) {
    console.error('indikator POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
