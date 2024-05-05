import { getServerSession } from "@supabase/auth-helpers-sveltekit"
import { supabaseClient as supabase } from '../lib/supabase'


export const load = async (event) => {
  const session = await getServerSession(event);
  const uid = session.user.id;

  let displayName = "";
  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid);
    
    displayName = data[0]?.display_name;
  }

  return {
    session,
    displayName
  }
}