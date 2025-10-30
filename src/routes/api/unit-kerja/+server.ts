import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { unitKerja } from '$lib/db/schema';
import { desc } from 'drizzle-orm';

// GET /api/unit-kerja - Get all unit kerja
export const GET: RequestHandler = async () => {
	try {
		const unitKerjaList = await db
			.select()
			.from(unitKerja)
			.orderBy(desc(unitKerja.createdAt));

		return json(unitKerjaList);
	} catch (error) {
		console.error('Error fetching unit kerja:', error);
		return json({ error: 'Failed to fetch unit kerja' }, { status: 500 });
	}
};

// POST /api/unit-kerja - Create new unit kerja
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const newUnitKerja = await db
			.insert(unitKerja)
			.values({
				unitKerja: typeof data.unitKerja === 'string' ? data.unitKerja : null,
				alias: typeof data.alias === 'string' ? data.alias : null,
				userId: String(data.userId),
				roleId: data.roleId ? Number(data.roleId) : null,
				username: typeof data.username === 'string' ? data.username : null
			})
			.returning();

		return json(newUnitKerja[0], { status: 201 });
	} catch (error) {
		console.error('Error creating unit kerja:', error);
		return json({ error: 'Failed to create unit kerja' }, { status: 500 });
	}
};