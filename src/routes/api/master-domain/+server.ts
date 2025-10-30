import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, client } from '$lib/db';
import { masterDomain } from '$lib/db/schema';
import { desc } from 'drizzle-orm';

// GET /api/master-domain - Get all master domains
export const GET: RequestHandler = async () => {
	try {
		// Use fully-qualified schema name to avoid relying on session search_path
		const rows = await client`SELECT id, created_at::text AS created_at, domain_nama, domain_bobot
			FROM simbatik.master_domain
			ORDER BY created_at DESC`;

		return json(rows.map((r: any) => ({
			id: r.id,
			createdAt: r.created_at,
			domainNama: r.domain_nama,
			domainBobot: r.domain_bobot
		})));
	} catch (error) {
		console.error('Error fetching master domains:', error);
		return json({ error: 'Failed to fetch master domains' }, { status: 500 });
	}
};

// POST /api/master-domain - Create new master domain
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const domainNama = typeof data.domainNama === 'string' ? data.domainNama : null;
		const domainBobot = data.domainBobot ? Number(data.domainBobot) : null;

		const inserted = await client`
			INSERT INTO simbatik.master_domain (domain_nama, domain_bobot)
			VALUES (${domainNama}, ${domainBobot})
			RETURNING id, created_at::text AS created_at, domain_nama, domain_bobot
		`;

		const row = inserted[0];
		return json({ id: row.id, createdAt: row.created_at, domainNama: row.domain_nama, domainBobot: row.domain_bobot }, { status: 201 });
	} catch (error) {
		console.error('Error creating master domain:', error);
		return json({ error: 'Failed to create master domain' }, { status: 500 });
	}
};