import { getServerSession } from "@supabase/auth-helpers-sveltekit"
import { supabaseClient as supabase } from '../lib/supabase'


export const load = async (event) => {
  const session = await getServerSession(event);
  const uid = session.user.id;
  let userInfo = null;

  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid);
    
    userInfo = data[0]
  }

  return {
    session,
    userInfo
  }
}