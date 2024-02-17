import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async event => {
  const body = await readBody(event);

  const supabaseInstance = (await serverSupabaseClient<Database>(event)).schema('messages');
  const { data, error } = await supabaseInstance.from('items').insert([body]);
  return { data, error };
});
