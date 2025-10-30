import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { unitKerja } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/unit-kerja/[id] - Get unit kerja by ID
export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = Number(params.id);

		const [result] = await db
			.select()
			.from(unitKerja)
			.where(eq(unitKerja.id, id))
			.limit(1);

		if (!result) {
			throw error(404, 'Unit kerja not found');
		}

		return json(result);
	} catch (err) {
		console.error('Error fetching unit kerja:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to fetch unit kerja' }, { status: 500 });
	}
};

// PUT /api/unit-kerja/[id] - Update unit kerja
export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = Number(params.id);
		const data = await request.json();

		const [updatedUnitKerja] = await db
			.update(unitKerja)
			.set({
				unitKerja: data.unitKerja,
				alias: data.alias,
				userId: data.userId,
				roleId: data.roleId ? Number(data.roleId) : null,
				username: data.username
			})
			.where(eq(unitKerja.id, id))
			.returning();

		if (!updatedUnitKerja) {
			throw error(404, 'Unit kerja not found');
		}

		return json(updatedUnitKerja);
	} catch (err) {
		console.error('Error updating unit kerja:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to update unit kerja' }, { status: 500 });
	}
};

// DELETE /api/unit-kerja/[id] - Delete unit kerja
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = Number(params.id);

		const [deletedUnitKerja] = await db
			.delete(unitKerja)
			.where(eq(unitKerja.id, id))
			.returning();

		if (!deletedUnitKerja) {
			throw error(404, 'Unit kerja not found');
		}

		return json({ message: 'Unit kerja deleted successfully' });
	} catch (err) {
		console.error('Error deleting unit kerja:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to delete unit kerja' }, { status: 500 });
	}
};