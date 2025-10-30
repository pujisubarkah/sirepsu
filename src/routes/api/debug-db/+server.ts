import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { client } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const [{ current_schema }] = await client`SELECT current_schema()`;
    const [{ search_path }] = await client`SELECT current_setting('search_path') as search_path`;
    return json({ current_schema, search_path });
  } catch (err) {
    console.error('debug-db error', err);
    return json({ error: String(err) }, { status: 500 });
  }
};
