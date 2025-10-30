import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { masterDomain } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/master-domain/[id] - Get master domain by ID
export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = Number(params.id);

		const [result] = await db
			.select()
			.from(masterDomain)
			.where(eq(masterDomain.id, id))
			.limit(1);

		if (!result) {
			throw error(404, 'Master domain not found');
		}

		return json(result);
	} catch (err) {
		console.error('Error fetching master domain:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to fetch master domain' }, { status: 500 });
	}
};

// PUT /api/master-domain/[id] - Update master domain
export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = Number(params.id);
		const data = await request.json();

		const [updatedMasterDomain] = await db
			.update(masterDomain)
			.set({
				domainNama: data.domainNama,
				domainBobot: data.domainBobot ? Number(data.domainBobot) : null
			})
			.where(eq(masterDomain.id, id))
			.returning();

		if (!updatedMasterDomain) {
			throw error(404, 'Master domain not found');
		}

		return json(updatedMasterDomain);
	} catch (err) {
		console.error('Error updating master domain:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to update master domain' }, { status: 500 });
	}
};

// DELETE /api/master-domain/[id] - Delete master domain
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = Number(params.id);

		const [deletedMasterDomain] = await db
			.delete(masterDomain)
			.where(eq(masterDomain.id, id))
			.returning();

		if (!deletedMasterDomain) {
			throw error(404, 'Master domain not found');
		}

		return json({ message: 'Master domain deleted successfully' });
	} catch (err) {
		console.error('Error deleting master domain:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		return json({ error: 'Failed to delete master domain' }, { status: 500 });
	}
};