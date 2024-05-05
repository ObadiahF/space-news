import "$lib/supabase"
import { getSupabase } from "@supabase/auth-helpers-sveltekit"
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, test } from '$env/static/private';


export const handle = async ({ event, resolve }) => {
    const { session, supabaseClient } = await getSupabase(event)

    event.locals.sb = supabaseClient
    event.locals.session = session

    return resolve(event)
}