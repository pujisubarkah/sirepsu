import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { masterDomain } from '$lib/db/schema';
import { desc } from 'drizzle-orm';

// GET /api/master-domain - Get all master domains
export const GET: RequestHandler = async () => {
	try {
		const masterDomains = await db
			.select()
			.from(masterDomain)
			.orderBy(desc(masterDomain.createdAt));

		return json(masterDomains);
	} catch (error) {
		console.error('Error fetching master domains:', error);
		return json({ error: 'Failed to fetch master domains' }, { status: 500 });
	}
};

// POST /api/master-domain - Create new master domain
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const newMasterDomain = await db
			.insert(masterDomain)
			.values({
				domainNama: typeof data.domainNama === 'string' ? data.domainNama : null,
				domainBobot: data.domainBobot ? Number(data.domainBobot) : null
			})
			.returning();

		return json(newMasterDomain[0], { status: 201 });
	} catch (error) {
		console.error('Error creating master domain:', error);
		return json({ error: 'Failed to create master domain' }, { status: 500 });
	}
};