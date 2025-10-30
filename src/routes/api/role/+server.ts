import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const rows = await client`SELECT id, created_at::text AS created_at, role_name FROM simbatik.role ORDER BY created_at DESC`;
    return json(rows.map((r: any) => ({ id: r.id, createdAt: r.created_at, roleName: r.role_name })));
  } catch (err) {
    console.error('role GET error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const inserted = await client`INSERT INTO simbatik.role (role_name) VALUES (${data.roleName}) RETURNING id, created_at::text AS created_at, role_name`;
    const r = inserted[0];
    return json({ id: r.id, createdAt: r.created_at, roleName: r.role_name }, { status: 201 });
  } catch (err) {
    console.error('role POST error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
